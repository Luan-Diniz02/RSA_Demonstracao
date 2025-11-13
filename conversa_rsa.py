import binascii
from flask import Flask, render_template, request, jsonify
from rsa_utils import gerar_par_chaves, criptografar, descriptografar


app = Flask(__name__)


estado = {}


def reset_estado():
    estado["chave_frank"] = gerar_par_chaves()
    estado["chave_fernanda"] = gerar_par_chaves()
    estado["chave_publica_frank"] = estado["chave_frank"].publickey()
    estado["chave_publica_fernanda"] = estado["chave_fernanda"].publickey()
    estado["mensagens"] = []
    estado["encerrada"] = False


reset_estado()


def estado_publico():
    return {
        "mensagens": estado["mensagens"],
        "encerrada": estado["encerrada"],
    }


def registrar_saida(remetente):
    estado["encerrada"] = True
    estado["mensagens"].append({
        "remetente": remetente,
        "evento": "sair",
    })
    return {"encerrada": True}


def registrar_envio(remetente, mensagem):
    destinatario = "frank" if remetente == "fernanda" else "fernanda"

    if remetente == "fernanda":
        chave_publica_destino = estado["chave_publica_frank"]
        chave_privada_destino = estado["chave_frank"]
    else:
        chave_publica_destino = estado["chave_publica_fernanda"]
        chave_privada_destino = estado["chave_fernanda"]

    ciphertext = criptografar(mensagem, chave_publica_destino)
    plaintext_destino = descriptografar(ciphertext, chave_privada_destino)

    registro = {
        "remetente": remetente,
        "destinatario": destinatario,
        "plaintext": mensagem,
        "ciphertext": binascii.hexlify(ciphertext).decode(),
        "decrypted": plaintext_destino,
    }
    estado["mensagens"].append(registro)
    return {"mensagem": registro, "encerrada": False}


def processar_mensagem(remetente, mensagem):
    if estado["encerrada"]:
        return {"erro": "Conversa encerrada."}

    if mensagem.strip().lower() == "sair":
        return registrar_saida(remetente)

    return registrar_envio(remetente, mensagem)


@app.route("/")
def index():
    return render_template("index.html", estado=estado_publico())


@app.route("/mensagem", methods=["POST"])
def nova_mensagem():
    data = request.get_json(force=True) or {}
    remetente = (data.get("remetente") or "").lower()
    mensagem = data.get("mensagem") or ""

    if remetente not in {"fernanda", "frank"}:
        resposta = {"erro": "Remetente invalido.", "estado": estado_publico()}
        return jsonify(resposta), 400

    resultado = processar_mensagem(remetente, mensagem)
    resultado["estado"] = estado_publico()

    status = 200 if "erro" not in resultado else 400
    return jsonify(resultado), status


@app.route("/reset", methods=["POST"])
def resetar():
    reset_estado()
    return jsonify({"estado": estado_publico()})


@app.route("/estado", methods=["GET"])
def obter_estado():
    return jsonify({"estado": estado_publico()})


if __name__ == "__main__":
    app.run(debug=True)