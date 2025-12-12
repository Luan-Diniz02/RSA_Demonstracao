# 🎓 Exemplos Educacionais - Roteiros de Demonstração

## Roteiro 1: Conceitos Básicos de Criptografia Assimétrica

### Objetivo
Demonstrar como funciona a criptografia RSA com chaves públicas e privadas.

### Passos

1. **Explique o conceito**:
   - "Cada usuário possui 2 chaves: uma pública (pode compartilhar) e uma privada (secreta)"
   - "Para enviar mensagem segura para Frank, Fernanda usa a chave PÚBLICA de Frank"
   - "Só Frank pode ler, usando sua chave PRIVADA"

2. **Demonstração prática**:
   - Fernanda envia: "Esta mensagem é confidencial"
   - Mostre o texto cifrado (incompreensível)
   - Mostre que Frank consegue ler (descriptografado)

3. **Perguntas para reflexão**:
   - "E se alguém interceptar a mensagem cifrada?"
   - "Por que só Frank consegue ler?"
   - "Qual a vantagem sobre criptografia simétrica?"

---

## Roteiro 2: Autenticidade e Assinatura Digital

### Objetivo
Demonstrar como a assinatura digital prova a identidade do remetente.

### Passos

1. **Configure o cenário**:
   - Ative "Assinatura Digital: ON"
   - Explique: "Agora vamos adicionar uma assinatura"

2. **Explique o conceito**:
   - "Fernanda assina com sua chave PRIVADA"
   - "Frank verifica com a chave PÚBLICA de Fernanda"
   - "Se a assinatura for válida, Frank tem certeza que foi Fernanda quem enviou"

3. **Demonstração**:
   - Fernanda envia: "Confirmo a compra de R$ 1.000"
   - Mostre o painel "Assinatura Digital"
   - Destaque: Status "Válida" com ícone verde
   - Explique: "Fernanda NÃO pode negar que enviou (não-repúdio)"

4. **Discussão**:
   - "Por que isso é importante em transações financeiras?"
   - "Como isso resolve problemas de autenticidade?"

---

## Roteiro 3: Integridade da Mensagem

### Objetivo
Demonstrar como o hash garante que a mensagem não foi alterada.

### Passos

1. **Explique o conceito**:
   - "Hash é uma 'impressão digital' da mensagem"
   - "Qualquer alteração mínima muda completamente o hash"
   - "SHA-256 gera um hash de 64 caracteres hexadecimais"

2. **Demonstração**:
   - Frank envia: "Transfira R$ 100 para conta 12345"
   - Mostre o painel "Verificação de Integridade"
   - Destaque os dois hashes idênticos
   - Explique: "Se alguém mudasse para R$ 1000, os hashes seriam diferentes"

3. **Exemplo hipotético**:
   - "Imagine se a mensagem fosse alterada durante a transmissão"
   - "O hash recebido seria diferente do original"
   - "Sistema detectaria a adulteração"

---

## Roteiro 4: Os 4 Pilares da Segurança

### Objetivo
Demonstrar como o sistema garante os 4 pilares: Confidencialidade, Autenticidade, Integridade e Não-repúdio.

### Passos

1. **Confidencialidade** (Criptografia RSA):
   ```
   Fernanda envia: "Senha do sistema: Admin123"
   Mostre: Texto cifrado ilegível
   Destaque: Apenas Frank pode descriptografar
   ```

2. **Autenticidade** (Assinatura Digital):
   ```
   Mostre: Status "Válida" no painel de assinatura
   Explique: "Temos certeza que foi Fernanda quem enviou"
   ```

3. **Integridade** (Hash SHA-256):
   ```
   Mostre: Hashes idênticos
   Explique: "Mensagem não foi alterada"
   ```

4. **Não-repúdio** (Assinatura com chave privada):
   ```
   Explique: "Fernanda não pode negar que enviou"
   Motivo: "Só ela tem a chave privada para assinar"
   ```

---

## Roteiro 5: Comparação Com e Sem Assinatura

### Objetivo
Mostrar a diferença e o valor agregado da assinatura digital.

### Passos

1. **Sem assinatura**:
   - Desative: Clique em "Assinatura Digital: ON" → OFF
   - Envie mensagem: "Teste sem assinatura"
   - Observe: Apenas 3 painéis (Original, Cifrado, Descriptografado)
   - Problema: "Como Frank sabe que foi realmente Fernanda?"

2. **Com assinatura**:
   - Ative novamente: ON
   - Envie mensagem: "Teste com assinatura"
   - Observe: 5 painéis (+ Assinatura + Integridade)
   - Solução: "Agora temos garantia de autenticidade!"

3. **Conclusão**:
   - Assinatura digital adiciona duas camadas cruciais
   - Essencial para transações importantes
   - Padrão em certificados digitais, documentos legais, etc.

---

## Roteiro 6: Simulação de Ataque (Teórico)

### Objetivo
Demonstrar como o sistema detectaria adulterações (discussão teórica).

### Cenário 1: Interceptação da Mensagem

**Situação**:
```
Fernanda envia: "Transfira R$ 100"
Atacante intercepta o texto cifrado
Atacante tenta ler
```

**Resultado**:
- ❌ Não consegue descriptografar (não tem chave privada de Frank)
- ✅ Confidencialidade mantida

### Cenário 2: Modificação da Mensagem

**Situação**:
```
Atacante tenta modificar mensagem cifrada
Tenta mudar "R$ 100" para "R$ 1000"
```

**Resultado**:
- ❌ Hash será diferente após descriptografia
- ❌ Integridade verificada: COMPROMETIDA
- ✅ Sistema detecta adulteração

### Cenário 3: Falsificação de Identidade

**Situação**:
```
Atacante tenta enviar mensagem fingindo ser Fernanda
Não tem a chave privada de Fernanda
```

**Resultado**:
- ❌ Não consegue criar assinatura válida
- ❌ Verificação de assinatura: INVÁLIDA
- ✅ Sistema detecta falsificação

---

## Roteiro 7: Casos de Uso Real

### Para tornar mais concreto para os alunos:

### Caso 1: E-mail Seguro (S/MIME)
```
Aplicação: Profissional envia e-mail confidencial
Como funciona: Igual ao nosso sistema!
- Mensagem criptografada com chave pública do destinatário
- Assinada com chave privada do remetente
- Hash garante integridade
```

### Caso 2: Certificado Digital (e-CPF)
```
Aplicação: Assinar documentos digitalmente
Como funciona:
- Seu e-CPF contém sua chave privada (em cartão/token)
- Certificadora fornece sua chave pública
- Ao assinar documento, usa mesma lógica do nosso sistema
```

### Caso 3: HTTPS/SSL
```
Aplicação: Navegação segura na web
Como funciona:
- Servidor tem certificado digital (chave pública)
- Browser verifica certificado
- Comunicação criptografada
- Similar ao que demonstramos!
```

### Caso 4: Bitcoin e Blockchain
```
Aplicação: Transações de criptomoedas
Como funciona:
- Cada carteira tem par de chaves
- Transação assinada com chave privada
- Rede verifica com chave pública
- Não-repúdio garante validade da transação
```

---

## Atividades Práticas para Alunos

### Atividade 1: Experimente e Observe
1. Envie 3 mensagens diferentes
2. Compare os tamanhos dos textos cifrados
3. Pergunta: "Por que todos têm o mesmo tamanho?"

### Atividade 2: Fluxo de Comunicação
1. Desenhe um diagrama do fluxo
2. Identifique onde cada chave é usada
3. Marque onde ocorre cada verificação de segurança

### Atividade 3: Análise de Segurança
1. Liste as 4 garantias do sistema
2. Para cada uma, explique como é implementada
3. Dê um exemplo real de aplicação

### Atividade 4: Comparação
1. Use o sistema SEM assinatura
2. Use o sistema COM assinatura
3. Liste 3 diferenças práticas

---

## Perguntas Frequentes para Discussão

### Q1: "Por que não usar a mesma chave para criptografar e descriptografar?"
**R**: Isso seria criptografia simétrica. O problema é: como compartilhar a chave de forma segura? Com assimétrica, só a chave PÚBLICA precisa ser compartilhada.

### Q2: "Se alguém tem minha chave pública, não pode me atacar?"
**R**: Não! A chave pública só serve para CRIPTOGRAFAR mensagens para você e VERIFICAR suas assinaturas. Não permite descriptografar nem criar assinaturas falsas.

### Q3: "Por que o texto cifrado é tão grande?"
**R**: RSA-2048 gera blocos de 256 bytes (2048 bits). O padding OAEP adiciona segurança extra. Para mensagens longas, na prática usa-se criptografia híbrida.

### Q4: "Posso trocar as chaves?"
**R**: Sim! Clique em "Nova conversa" para gerar novas chaves RSA. Em sistemas reais, chaves são trocadas periodicamente por segurança.

### Q5: "Isso é realmente seguro?"
**R**: Sim! RSA-2048 é padrão da indústria. Levaria milhares de anos para quebrar com computadores atuais. Computadores quânticos futuros são uma preocupação, mas ainda não são realidade prática.

---

## Avaliação de Aprendizado

### Perguntas para verificar compreensão:

1. ✅ Qual chave é usada para criptografar? (R: Pública do destinatário)
2. ✅ Qual chave é usada para assinar? (R: Privada do remetente)
3. ✅ O que garante integridade? (R: Hash SHA-256)
4. ✅ O que é não-repúdio? (R: Impossibilidade de negar autoria)
5. ✅ Por que o texto cifrado é ilegível? (R: Proteção criptográfica RSA)

---

**Use estes roteiros para tornar suas aulas mais interativas e práticas! 🎓**
