# 🔐 Sistema Didático de Criptografia Assimétrica RSA

## 📚 Descrição

Sistema educacional interativo para ensino e aprendizagem de **Criptografia Assimétrica** e **Assinatura Digital**. Esta ferramenta foi desenvolvida com foco na usabilidade e visualização clara dos conceitos fundamentais de segurança da informação.

## 🎯 Objetivos Educacionais

Este sistema demonstra de forma visual e interativa:

### 1. Criptografia Assimétrica (RSA)
- **Chaves Públicas e Privadas**: Cada usuário possui um par de chaves
- **Criptografia**: Mensagens são criptografadas com a chave pública do destinatário
- **Descriptografia**: Apenas a chave privada correspondente pode descriptografar

### 2. Assinatura Digital
- **Autenticidade**: Confirma a identidade do remetente
- **Integridade**: Garante que a mensagem não foi alterada
- **Não-repúdio**: O remetente não pode negar o envio da mensagem

## ✨ Funcionalidades

- ✅ Chat interativo entre 2 usuários (Fernanda e Frank)
- ✅ Visualização em tempo real do processo de criptografia
- ✅ Sistema de assinatura digital ativável/desativável
- ✅ Verificação de integridade com hash SHA-256
- ✅ Interface didática com explicações em cada etapa
- ✅ Painéis coloridos para facilitar o entendimento
- ✅ Demonstração completa do fluxo: Original → Cifrado → Descriptografado

## 🔐 Conceitos Demonstrados

### Confidencialidade
Mensagens são criptografadas com RSA-2048 bits usando PKCS1_OAEP, garantindo que apenas o destinatário possa ler.

### Autenticidade
A assinatura digital (PKCS#1 v1.5 com SHA-256) prova que a mensagem foi enviada pelo remetente declarado.

### Integridade
O hash SHA-256 da mensagem é calculado antes e depois da transmissão. Se os hashes coincidirem, a mensagem não foi alterada.

### Não-repúdio
Como a assinatura só pode ser criada com a chave privada do remetente, ele não pode negar ter enviado a mensagem.

## 🚀 Como Usar

### 1. Instalação das Dependências

```bash
pip install -r requirements.txt
```

### 2. Executar o Servidor

```bash
python conversa_rsa.py
```

### 3. Acessar a Interface

Abra seu navegador em: `http://localhost:5000`

## 📖 Guia de Uso

1. **Enviar Mensagem**: Digite no campo de texto do usuário e clique em "Enviar e Criptografar"

2. **Visualizar Processo**: Observe os 3 painéis que mostram:
   - Mensagem Original (texto claro)
   - Texto Cifrado (hexadecimal)
   - Mensagem Descriptografada (recuperada)

3. **Assinatura Digital**: Com o modo ativado, veja:
   - Status da assinatura (válida/inválida)
   - Verificação de autenticidade
   - Confirmação de integridade com hashes
   - Garantia de não-repúdio

4. **Toggle Assinatura**: Clique no botão "Assinatura Digital" para ativar/desativar

5. **Nova Conversa**: Clique em "Nova conversa" para gerar novas chaves RSA

## 🗂️ Estrutura do Projeto

```
RSA/
│
├── conversa_rsa.py       # Backend Flask com rotas e lógica
├── conversa_cli.py       # Versão CLI do chat
├── rsa_utils.py          # Funções de criptografia e assinatura
├── requirements.txt      # Dependências Python
├── README.md            # Documentação original
├── README_COMPLETO.md   # Esta documentação
│
├── templates/
│   └── index.html       # Interface HTML principal
│
└── static/
    ├── app.js           # Lógica JavaScript do frontend
    └── styles.css       # Estilos CSS customizados
```

## 🛠️ Tecnologias Utilizadas

- **Backend**: Python 3.x + Flask
- **Criptografia**: PyCryptodome (RSA, PKCS1_OAEP, PKCS#1 v1.5, SHA-256)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3 + Bootstrap Icons

## 📚 Conceitos Técnicos

### Algoritmos Implementados

- **RSA-2048**: Criptografia assimétrica
- **PKCS1_OAEP**: Padding para criptografia RSA
- **PKCS#1 v1.5**: Esquema de assinatura RSA
- **SHA-256**: Função hash criptográfica

### Fluxo de Comunicação

```
[Remetente]
    ↓
1. Escreve mensagem
2. Calcula hash SHA-256
3. Assina com chave privada
4. Criptografa com chave pública do destinatário
    ↓
[Transmissão]
    ↓
[Destinatário]
5. Descriptografa com chave privada
6. Verifica assinatura com chave pública do remetente
7. Calcula hash da mensagem recebida
8. Compara hashes (integridade)
```

## 🎓 Uso Educacional

Este sistema é ideal para:

- Aulas de Segurança da Informação
- Demonstrações de criptografia assimétrica
- Workshops sobre assinatura digital
- Laboratórios práticos de criptografia
- Estudo autodirigido de conceitos de segurança

## 👥 Usuários do Sistema

- **Fernanda** (usuário 1): Cor azul
- **Frank** (usuário 2): Cor verde

Cada usuário possui seu próprio par de chaves RSA gerado automaticamente.

## 🔒 Segurança

- Chaves RSA de 2048 bits
- Implementação usando biblioteca PyCryptodome (padrão da indústria)
- Hash SHA-256 para integridade
- Padding OAEP para proteção contra ataques

## 🎨 Interface Didática

A interface foi projetada especificamente para fins educacionais:

### Cores e Ícones
- **Azul (Fernanda)**: Usuário 1
- **Verde (Frank)**: Usuário 2
- **Vermelho**: Texto cifrado (confidencial)
- **Amarelo**: Hash e integridade
- **Verde Claro**: Assinatura digital válida

### Painéis Informativos
- **Painel Superior**: Explicação dos conceitos
- **Cards de Usuário**: Formulários para envio
- **Timeline**: Histórico completo das mensagens
- **Cards de Mensagem**: 
  - Etapa 1: Mensagem Original
  - Etapa 2: Texto Cifrado
  - Etapa 3: Mensagem Descriptografada
  - Seção de Assinatura Digital
  - Seção de Verificação de Integridade

## 📊 Demonstração dos Pilares da Segurança

### Confidencialidade ✅
- Mensagem só pode ser lida pelo destinatário
- Usa chave pública para cifrar
- Usa chave privada para decifrar

### Autenticidade ✅
- Assinatura digital confirma identidade do remetente
- Verificação com chave pública do remetente

### Integridade ✅
- Hash SHA-256 detecta qualquer alteração
- Comparação de hashes antes e depois

### Não-repúdio ✅
- Assinatura só pode ser criada com chave privada
- Remetente não pode negar o envio

## 🚨 Importante para Fins Educacionais

Este sistema foi desenvolvido para fins didáticos. Características:

✅ **O que demonstra:**
- Conceitos fundamentais de criptografia assimétrica
- Processo de assinatura digital
- Verificação de integridade
- Fluxo completo de comunicação segura

⚠️ **Limitações (por ser educacional):**
- Simula comunicação local (não há rede real)
- Chaves armazenadas em memória (não há persistência)
- Não implementa todos os protocolos de uma aplicação de produção
- Interface simplificada para foco nos conceitos

## 📝 Licença

Projeto educacional desenvolvido para fins acadêmicos.

## 👨‍💻 Desenvolvimento

Sistema desenvolvido como ferramenta de ensino-aprendizagem para a disciplina de Segurança de Sistemas Computacionais.

---

**Nota**: Este é um sistema didático. Para uso em produção, considere implementações adicionais de segurança, gerenciamento de chaves, certificados digitais, protocolos TLS/SSL, e melhores práticas de desenvolvimento web.
