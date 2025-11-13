# Demonstração do RSA em Python

Projeto acadêmico que ilustra o funcionamento do algoritmo RSA por meio de duas interfaces:

- **CLI**: conversa interativa entre Fernanda e Frank diretamente no terminal.
- **Web**: front-end responsivo em Flask que exibe cada passo (mensagem original, ciphertext e texto decifrado) de forma visual.

## Requisitos

- Python 3.10+
- Pacotes `pycryptodome` e `flask`

Instalação rápida:

```bash
pip install -r requirements.txt
```

Caso não utilize um arquivo de requisitos, instale manualmente:

```bash
pip install pycryptodome flask
```

## Estrutura principal

- `rsa_utils.py`: funções de geração de chaves, criptografia e descriptografia.
- `conversa_cli.py`: implementação original em linha de comando.
- `conversa_rsa.py`: aplicação Flask que expõe a versão web.
- `templates/` e `static/`: arquivos HTML, CSS e JavaScript utilizados no front-end.

## Execução

### Modo CLI

```bash
python conversa_cli.py
```

Digite as mensagens alternadamente. Para encerrar, use `sair`.

### Modo Web

```bash
python conversa_rsa.py
```

Abra o navegador em `http://127.0.0.1:5000/` e utilize os formulários de Fernanda e Frank. O botão **Nova conversa** reinicia o estado e gera novas chaves.

## Observações

- As chaves são regeneradas a cada reinício (CLI ou Web) para facilitar a demonstração.
- O ciphertext é exibido em hexadecimal para visualização amigável.
- O projeto foi pensado para fins educacionais; não utilize esse código em produção.
