# 🚀 Guia Rápido de Uso

## Como Iniciar o Sistema

1. **Instalar dependências** (se ainda não instalou):
   ```bash
   pip install -r requirements.txt
   ```

2. **Executar o servidor**:
   ```bash
   python conversa_rsa.py
   ```

3. **Abrir no navegador**:
   - http://localhost:5000 ou http://127.0.0.1:5000

## 📝 Guia Passo a Passo para Teste

### Teste Básico - Criptografia RSA

1. **Digite uma mensagem** no campo de Fernanda
   - Exemplo: "Olá Frank, esta é uma mensagem secreta!"

2. **Clique em "Enviar e Criptografar"**

3. **Observe a linha do tempo**:
   - ✅ Painel 1 (Azul): Sua mensagem original
   - ✅ Painel 2 (Vermelho): Texto cifrado em hexadecimal
   - ✅ Painel 3 (Verde): Mensagem descriptografada por Frank

4. **Frank responde**: Digite no campo de Frank e envie

### Teste Avançado - Assinatura Digital

1. **Certifique-se** que "Assinatura Digital: ON" está ativado (botão verde)

2. **Envie uma mensagem** de qualquer usuário

3. **Observe os painéis extras**:
   
   **Painel de Assinatura Digital:**
   - ✅ Status: Válida (com ícone verde)
   - ✅ Autenticidade confirmada
   - ✅ Não-repúdio garantido
   - Ver assinatura em hexadecimal (clique em "Ver assinatura")
   
   **Painel de Integridade:**
   - ✅ Status: Preservada
   - ✅ Hash SHA-256 Original
   - ✅ Hash SHA-256 Recebido
   - ✅ Confirmação: "Hashes idênticos = mensagem não foi alterada"

### Teste - Desativar Assinatura

1. **Clique no botão** "Assinatura Digital: ON"
   - O botão ficará cinza com "OFF"

2. **Envie uma mensagem**
   - Os painéis de assinatura e integridade não aparecerão
   - Apenas a criptografia RSA será demonstrada

3. **Reative clicando novamente** no botão

### Teste - Nova Conversa

1. **Clique em "Nova conversa"**
   - Novas chaves RSA são geradas
   - Histórico de mensagens é limpo
   - Sistema reiniciado

## 🎯 Conceitos para Observar

### Durante o Uso, Note:

1. **Criptografia Assimétrica**:
   - Mensagem cifrada com chave pública do DESTINATÁRIO
   - Descriptografada com chave privada do DESTINATÁRIO
   - Texto cifrado é ilegível (hexadecimal)

2. **Assinatura Digital**:
   - Assinada com chave privada do REMETENTE
   - Verificada com chave pública do REMETENTE
   - Prova autenticidade e não-repúdio

3. **Integridade**:
   - Hash calculado antes e depois
   - Se hashes são iguais = mensagem íntegra
   - Qualquer alteração = hashes diferentes

## 💡 Dicas Educacionais

### Experimente:

1. **Mensagens diferentes**:
   - Curtas: "Oi!"
   - Longas: Vários parágrafos
   - Observe o tamanho do texto cifrado

2. **Múltiplas mensagens**:
   - Crie uma conversa completa
   - Observe a linha do tempo
   - Veja o histórico visual

3. **Alternar usuários**:
   - Fernanda → Frank → Fernanda → Frank
   - Veja as cores diferentes
   - Entenda o fluxo bidirecional

4. **Toggle assinatura**:
   - Compare com e sem assinatura
   - Entenda o valor agregado da assinatura digital

## 🎓 Para Apresentações

### Roteiro Sugerido:

1. **Introdução** (2 min):
   - Apresente a interface
   - Mostre os dois usuários
   - Explique o painel informativo superior

2. **Demo Criptografia RSA** (3 min):
   - Envie uma mensagem
   - Explique cada painel (Original → Cifrado → Descriptografado)
   - Mostre o texto cifrado ilegível

3. **Demo Assinatura Digital** (3 min):
   - Ative assinatura (se não estiver)
   - Envie mensagem
   - Explique autenticidade e não-repúdio
   - Mostre a assinatura

4. **Demo Integridade** (2 min):
   - Mostre os hashes
   - Explique comparação
   - Destaque "hashes idênticos"

5. **Nova Conversa** (1 min):
   - Clique em "Nova conversa"
   - Explique regeneração de chaves
   - Mostre que é uma nova sessão

## ⚠️ Solução de Problemas

### Servidor não inicia:
```bash
pip install flask pycryptodome
python conversa_rsa.py
```

### Página não carrega:
- Verifique se o servidor está rodando
- Acesse http://127.0.0.1:5000
- Verifique porta 5000 disponível

### Mensagem não aparece:
- Verifique console do navegador (F12)
- Recarregue a página
- Clique em "Nova conversa"

## 📚 Próximos Passos

Após dominar o básico:

1. Leia o [README_COMPLETO.md](README_COMPLETO.md) para detalhes técnicos
2. Examine o código-fonte:
   - `rsa_utils.py`: Funções de criptografia
   - `conversa_rsa.py`: Lógica do servidor
   - `static/app.js`: Interface interativa
3. Experimente modificar mensagens e observar comportamento

---

**Bom estudo! 🎓🔐**
