from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256


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


def assinar_mensagem(mensagem, chave_privada):
    """
    Assina uma mensagem usando a chave privada do remetente.
    Retorna a assinatura digital.
    """
    hash_msg = SHA256.new(mensagem.encode("utf-8"))
    assinatura = pkcs1_15.new(chave_privada).sign(hash_msg)
    return assinatura


def verificar_assinatura(mensagem, assinatura, chave_publica):
    """
    Verifica a assinatura de uma mensagem usando a chave pública do remetente.
    Retorna True se a assinatura for válida, False caso contrário.
    """
    try:
        hash_msg = SHA256.new(mensagem.encode("utf-8"))
        pkcs1_15.new(chave_publica).verify(hash_msg, assinatura)
        return True
    except (ValueError, TypeError):
        return False


def calcular_hash(mensagem):
    """Calcula o hash SHA-256 de uma mensagem."""
    return SHA256.new(mensagem.encode("utf-8")).hexdigest()
