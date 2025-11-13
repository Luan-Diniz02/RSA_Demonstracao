from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP


def gerar_par_chaves(bits=2048):
    """Gera um par de chaves RSA com o tamanho informado."""
    return RSA.generate(bits)


def criptografar(mensagem, chave_publica):
    """Criptografa a mensagem usando a chave pública fornecida."""
    cipher = PKCS1_OAEP.new(chave_publica)
    return cipher.encrypt(mensagem.encode("utf-8"))


def descriptografar(ciphertext, chave_privada):
    """Descriptografa o ciphertext com a chave privada correspondente."""
    cipher = PKCS1_OAEP.new(chave_privada)
    return cipher.decrypt(ciphertext).decode("utf-8")
