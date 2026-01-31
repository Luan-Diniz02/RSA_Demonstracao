# 🔐 RSA Demonstração

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Cryptography](https://img.shields.io/badge/Cryptography-00599C?style=for-the-badge&logo=letsencrypt&logoColor=white)

**Demonstração Interativa do Algoritmo de Criptografia RSA**

[Sobre](#-sobre) • [Funcionalidades](#-funcionalidades) • [Como Executar](#-como-executar) • [Tecnologias](#-tecnologias) • [Conceitos](#-conceitos)

</div>

---

## 📖 Sobre

Projeto educacional que demonstra o funcionamento do **algoritmo RSA** (Rivest-Shamir-Adleman), um dos sistemas de criptografia de chave pública mais utilizados no mundo para comunicações seguras na internet.

O projeto simula uma conversa criptografada entre **Fernanda** e **Frank**, mostrando em tempo real:
- 📝 Mensagem original (plaintext)
- 🔒 Texto criptografado (ciphertext em hexadecimal)
- 🔓 Texto decifrado (plaintext recuperado)

### 🎯 Objetivo

Ilustrar de forma prática e visual os conceitos de:
- **Criptografia de chave pública/privada**
- **Assinatura digital**
- **Comunicação segura**
- **Algoritmos matemáticos aplicados à segurança**

---

## ✨ Funcionalidades

### 🖥️ Interface CLI (Command Line)
- ✅ Conversa interativa no terminal
- ✅ Mensagens entre Fernanda e Frank
- ✅ Exibição de ciphertext em tempo real
- ✅ Geração automática de chaves RSA

### 🌐 Interface Web (Flask)
- ✅ Dashboard responsivo e moderno
- ✅ Visualização passo-a-passo da criptografia
- ✅ Formulários separados para cada participante
- ✅ Exibição visual do processo completo
- ✅ Botão para nova conversa (regenera chaves)

### 🔐 Segurança
- ✅ Geração de pares de chaves (pública/privada)
- ✅ Criptografia RSA com PyCryptodome
- ✅ Descriptografia automática
- ✅ Demonstração de integridade das mensagens

---

## 🛠 Tecnologias

### Core
- **Python 3.10+** - Linguagem principal
- **PyCryptodome** - Biblioteca criptográfica
- **Flask** - Framework web minimalista

### Algoritmo
- **RSA (Rivest-Shamir-Adleman)** - Criptografia assimétrica
- **Chaves de 2048 bits** - Padrão seguro

---

## 🚀 Como Executar

### Pré-requisitos

```bash
# Python 3.10 ou superior
python --version

# Instalar dependências
pip install -r requirements.txt
```

Ou manualmente:
```bash
pip install pycryptodome flask
```

---

### 1️⃣ **Modo CLI** (Linha de Comando)

```bash
python conversa_cli.py
```

**Uso:**
- Digite as mensagens alternadamente entre Fernanda e Frank
- Observe o ciphertext sendo gerado
- Digite `sair` para encerrar

**Exemplo de saída:**
```
🔐 Conversa Criptografada - RSA
Fernanda: Olá Frank!
  🔒 Ciphertext: 3a4f5b2c1d...
  🔓 Frank recebe: Olá Frank!

Frank: Olá Fernanda!
  🔒 Ciphertext: 7e8f9a0b2c...
  🔓 Fernanda recebe: Olá Fernanda!
```

---

### 2️⃣ **Modo Web** (Interface Visual)

```bash
python conversa_rsa.py
```

Acesse no navegador:
```
http://127.0.0.1:5000/
```

**Recursos da interface:**
- 📨 Formulários para Fernanda e Frank
- 🔍 Visualização detalhada do processo
- 🔄 Botão "Nova conversa" (regenera chaves)
- 📊 Exibição de estatísticas

---

## 📂 Estrutura do Projeto

```
RSA_Demonstracao/
├── rsa_utils.py              # Funções RSA (geração, criptografia, descriptografia)
├── conversa_cli.py           # Interface CLI
├── conversa_rsa.py           # Aplicação Flask (backend)
├── templates/                # Frontend HTML
│   └── index.html           # Interface web
├── static/                   # CSS e JavaScript
│   ├── style.css
│   └── script.js
├── requirements.txt          # Dependências
├── README.md                # Este arquivo
├── README_COMPLETO.md       # Documentação detalhada
├── GUIA_RAPIDO.md           # Tutorial rápido
└── EXEMPLOS_EDUCACIONAIS.md # Exemplos didáticos
```

---

## 🔐 Conceitos de Criptografia RSA

### Como Funciona?

1️⃣ **Geração de Chaves**
- Cada pessoa gera um **par de chaves** (pública + privada)
- Chave pública: compartilhada com todos
- Chave privada: mantida em segredo

2️⃣ **Criptografia**
- Remetente usa a **chave pública** do destinatário
- Mensagem é transformada em ciphertext

3️⃣ **Descriptografia**
- Destinatário usa sua **chave privada**
- Recupera a mensagem original

### 🧮 Matemática Simplificada

```
C = M^e mod n    (Criptografar)
M = C^d mod n    (Descriptografar)

Onde:
- M = mensagem
- C = ciphertext
- (e, n) = chave pública
- (d, n) = chave privada
```

---

## 💡 Aplicações Reais do RSA

### 🌐 Internet e Web
- **HTTPS/SSL/TLS** - Conexões seguras
- **Certificados digitais** - Autenticação de sites
- **VPNs** - Redes privadas virtuais

### 💳 Pagamentos e Finanças
- **Transações bancárias online**
- **Criptomoedas** - Assinaturas digitais
- **PIX e cartões** - Proteção de dados

### 📱 Plataformas de Delivery
- **Gaudium/Machine** - Proteção de dados de motoristas e clientes
- **Sistemas de pagamento** - Transações seguras
- **APIs** - Autenticação entre serviços

### ✉️ Comunicação
- **E-mail criptografado** (PGP/GPG)
- **Mensagens seguras**
- **Assinaturas digitais**

---

## 📊 Complexidade Computacional

| Operação | Complexidade |
|----------|-------------|
| Geração de chaves | O(k³) |
| Criptografia | O(k²) |
| Descriptografia | O(k³) |

*k = número de bits da chave (2048 bits neste projeto)*

---

## 🎓 Conceitos Educacionais

Este projeto demonstra:
- ✅ **Criptografia Assimétrica** vs Simétrica
- ✅ **Teoria dos Números** (primos, módulo)
- ✅ **Segurança da Informação**
- ✅ **APIs REST** (na versão web)
- ✅ **Visualização de Algoritmos**

---

## 🔄 Roadmap

- [ ] Adicionar benchmark de performance
- [ ] Implementar múltiplas conversas simultâneas
- [ ] Adicionar assinatura digital
- [ ] Implementar tamanhos de chave configuráveis
- [ ] Adicionar gráficos de visualização
- [ ] Criar modo de demonstração passo-a-passo
- [ ] Implementar comparação com outros algoritmos

---

## ⚠️ Observações Importantes

### ⚡ Uso Educacional
- Este projeto é para **fins didáticos**
- **NÃO use em produção** sem auditoria de segurança
- Para sistemas reais, use bibliotecas homologadas

### 🔑 Chaves
- Chaves são **regeneradas** a cada execução
- Demonstração usa chaves de 2048 bits
- Produção geralmente usa 2048-4096 bits

### 🎯 Propósito
- Visualizar o funcionamento do RSA
- Entender criptografia de chave pública
- Base para estudos de segurança

---

## 🤝 Contribuindo

Contribuições educacionais são bem-vindas:
1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MelhoriaEducacional`)
3. Commit suas mudanças (`git commit -m 'Adiciona exemplo de...'`)
4. Push para a branch (`git push origin feature/MelhoriaEducacional`)
5. Abra um Pull Request

---

## 📚 Referências

- [RSA Algorithm - Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
- [PyCryptodome Documentation](https://www.pycryptodome.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html)

---

## 👨‍💻 Autor

**Luan Diniz**

- GitHub: [@Luan-Diniz02](https://github.com/Luan-Diniz02)
- Projeto desenvolvido para **Estrutura de Dados e Segurança da Informação**

---

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

<div align="center">

**🔐 Segurança é fundamental em sistemas modernos!**

*Desenvolvido com foco em educação e boas práticas de criptografia*

</div>
