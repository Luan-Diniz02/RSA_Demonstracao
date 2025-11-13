import binascii
from rsa_utils import gerar_par_chaves, criptografar, descriptografar


def conversar_cli():
    print("--- 1. Geracao do Par de Chaves (Fernanda e Frank) ---")

    chave_frank = gerar_par_chaves()
    chave_fernanda = gerar_par_chaves()

    chave_publica_frank = chave_frank.publickey()
    chave_publica_fernanda = chave_fernanda.publickey()

    print("Frank e Fernanda compartilham suas chaves publicas.\n")

    while True:
        mensagem_fernanda = input("Fernanda -> Frank: ")
        if mensagem_fernanda.strip().lower() == "sair":
            print("Fernanda encerrou a conversa.")
            break

        ciphertext = criptografar(mensagem_fernanda, chave_publica_frank)
        print("Mensagem criptografada por Fernanda:")
        print(binascii.hexlify(ciphertext).decode())

        try:
            mensagem_recebida = descriptografar(ciphertext, chave_frank)
            print(f"Frank leu: {mensagem_recebida}\n")
        except ValueError:
            print("Frank nao conseguiu descriptografar a mensagem.\n")
            continue

        mensagem_frank = input("Frank -> Fernanda: ")
        if mensagem_frank.strip().lower() == "sair":
            print("Frank encerrou a conversa.")
            break

        ciphertext = criptografar(mensagem_frank, chave_publica_fernanda)
        print("Mensagem criptografada por Frank:")
        print(binascii.hexlify(ciphertext).decode())

        try:
            mensagem_recebida = descriptografar(ciphertext, chave_fernanda)
            print(f"Fernanda leu: {mensagem_recebida}\n")
        except ValueError:
            print("Fernanda nao conseguiu descriptografar a mensagem.\n")


if __name__ == "__main__":
    conversar_cli()
