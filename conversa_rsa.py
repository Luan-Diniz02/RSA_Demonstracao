import binascii
from flask import Flask, render_template, request, jsonify
from rsa_utils import (
    gerar_par_chaves, criptografar, descriptografar,
    assinar_mensagem, verificar_assinatura, calcular_hash
)


app = Flask(__name__)


estado = {}


def reset_estado():
    estado["chave_frank"] = gerar_par_chaves()
    estado["chave_fernanda"] = gerar_par_chaves()
    estado["chave_publica_frank"] = estado["chave_frank"].publickey()
    estado["chave_publica_fernanda"] = estado["chave_fernanda"].publickey()
    estado["mensagens"] = []
    estado["encerrada"] = False
    estado["modo_assinatura"] = True  # Assinatura digital ativada por padrão


reset_estado()


def estado_publico():
    return {
        "mensagens": estado["mensagens"],
        "encerrada": estado["encerrada"],
        "modo_assinatura": estado.get("modo_assinatura", True),
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
        chave_privada_remetente = estado["chave_fernanda"]
        chave_publica_remetente = estado["chave_publica_fernanda"]
    else:
        chave_publica_destino = estado["chave_publica_fernanda"]
        chave_privada_destino = estado["chave_fernanda"]
        chave_privada_remetente = estado["chave_frank"]
        chave_publica_remetente = estado["chave_publica_frank"]

    # Criptografar mensagem
    ciphertext = criptografar(mensagem, chave_publica_destino)
    plaintext_destino = descriptografar(ciphertext, chave_privada_destino)

    registro = {
        "remetente": remetente,
        "destinatario": destinatario,
        "plaintext": mensagem,
        "ciphertext": binascii.hexlify(ciphertext).decode(),
        "decrypted": plaintext_destino,
        "hash_original": calcular_hash(mensagem),
    }

    # Adicionar assinatura digital se o modo estiver ativado
    if estado.get("modo_assinatura", True):
        assinatura = assinar_mensagem(mensagem, chave_privada_remetente)
        registro["assinatura"] = binascii.hexlify(assinatura).decode()
        
        # Verificar assinatura
        assinatura_valida = verificar_assinatura(mensagem, assinatura, chave_publica_remetente)
        registro["assinatura_valida"] = assinatura_valida
        
        # Verificar integridade comparando hash
        hash_recebido = calcular_hash(plaintext_destino)
        registro["hash_recebido"] = hash_recebido
        registro["integridade"] = registro["hash_original"] == hash_recebido
    
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


@app.route("/toggle-assinatura", methods=["POST"])
def toggle_assinatura():
    estado["modo_assinatura"] = not estado.get("modo_assinatura", True)
    return jsonify({"estado": estado_publico()})


@app.route("/info-chaves", methods=["GET"])
def info_chaves():
    """Retorna informações educacionais sobre as chaves públicas"""
    return jsonify({
        "frank": {
            "modulo": str(estado["chave_publica_frank"].n)[:50] + "...",
            "expoente": str(estado["chave_publica_frank"].e),
            "tamanho_bits": estado["chave_publica_frank"].size_in_bits()
        },
        "fernanda": {
            "modulo": str(estado["chave_publica_fernanda"].n)[:50] + "...",
            "expoente": str(estado["chave_publica_fernanda"].e),
            "tamanho_bits": estado["chave_publica_fernanda"].size_in_bits()
        }
    })


@app.route("/estado", methods=["GET"])
def obter_estado():
    return jsonify({"estado": estado_publico()})


if __name__ == "__main__":
    app.run(debug=True)