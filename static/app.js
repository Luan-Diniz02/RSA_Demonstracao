const estadoScript = document.getElementById("estado-inicial");
let estadoAtual = { mensagens: [], encerrada: false };

if (estadoScript?.textContent) {
    try {
        estadoAtual = JSON.parse(estadoScript.textContent);
    } catch (erro) {
        console.error("Nao foi possivel ler o estado inicial", erro);
    }
}

const mensagensContainer = document.getElementById("mensagens");
const alerta = document.getElementById("alerta");
const resetButton = document.getElementById("btn-reset");
const toggleAssinaturaButton = document.getElementById("btn-toggle-assinatura");
const statusAssinatura = document.getElementById("status-assinatura");
const formularios = document.querySelectorAll("form[data-remetente]");

function escaparHtml(texto) {
    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatarMensagem(texto) {
    return escaparHtml(texto).replace(/\n/g, "<br>");
}

function capitalizar(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function mostrarAlerta(tipo, mensagem) {
    alerta.textContent = "";
    alerta.className = "alert d-none";

    if (!mensagem) {
        return;
    }

    alerta.classList.remove("d-none");
    alerta.classList.add(`alert-${tipo}`);
    alerta.textContent = mensagem;
}

function criarRegistroHTML(registro) {
    const wrapper = document.createElement("div");
    wrapper.className = "registro shadow border rounded p-3 bg-white";

    if (registro.evento === "sair") {
        wrapper.innerHTML = `
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2">
                <span class="badge text-bg-secondary">${capitalizar(registro.remetente)}</span>
                <span class="text-muted small">Conversa encerrada</span>
            </div>
            <p class="mb-0 mt-2">${capitalizar(registro.remetente)} digitou <code>sair</code>.</p>
        `;
        return wrapper;
    }

    const corRemetente = registro.remetente === "fernanda" ? "primary" : "success";
    const iconeRemetente = '<i class="bi bi-person-circle"></i>';
    const iconeDestino = '<i class="bi bi-person-fill"></i>';
    
    let htmlAssinatura = '';
    if (registro.assinatura) {
        const iconeAssinatura = registro.assinatura_valida 
            ? '<i class="bi bi-check-circle-fill text-success"></i>' 
            : '<i class="bi bi-x-circle-fill text-danger"></i>';
        const statusAssinatura = registro.assinatura_valida 
            ? '<span class="badge bg-success">Válida</span>' 
            : '<span class="badge bg-danger">Inválida</span>';
        
        const iconeIntegridade = registro.integridade 
            ? '<i class="bi bi-shield-check text-success"></i>' 
            : '<i class="bi bi-shield-x text-danger"></i>';
        const statusIntegridade = registro.integridade 
            ? '<span class="badge bg-success">Preservada</span>' 
            : '<span class="badge bg-danger">Comprometida</span>';

        htmlAssinatura = `
            <div class="row mt-3 pt-3 border-top">
                <div class="col-md-6 mb-3 mb-md-0">
                    <div class="card border-success">
                        <div class="card-header bg-success bg-opacity-10">
                            <i class="bi bi-pen-fill"></i> <strong>Assinatura Digital</strong>
                        </div>
                        <div class="card-body">
                            <p class="small mb-2">
                                ${iconeAssinatura} <strong>Status:</strong> ${statusAssinatura}
                            </p>
                            <p class="small mb-2">
                                <strong>Garantias:</strong>
                            </p>
                            <ul class="small mb-2">
                                <li><strong>Autenticidade:</strong> Confirma que ${capitalizar(registro.remetente)} enviou a mensagem</li>
                                <li><strong>Não-repúdio:</strong> ${capitalizar(registro.remetente)} não pode negar o envio</li>
                            </ul>
                            <details>
                                <summary class="text-muted small" style="cursor: pointer;">Ver assinatura (hex)</summary>
                                <code class="texto-cifrado d-block mt-2">${registro.assinatura}</code>
                            </details>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card border-warning">
                        <div class="card-header bg-warning bg-opacity-10">
                            <i class="bi bi-check2-circle"></i> <strong>Verificação de Integridade</strong>
                        </div>
                        <div class="card-body">
                            <p class="small mb-2">
                                ${iconeIntegridade} <strong>Status:</strong> ${statusIntegridade}
                            </p>
                            <p class="small mb-2">
                                <strong>Hash SHA-256 Original:</strong><br>
                                <code class="hash-display">${registro.hash_original}</code>
                            </p>
                            <p class="small mb-0">
                                <strong>Hash SHA-256 Recebido:</strong><br>
                                <code class="hash-display">${registro.hash_recebido}</code>
                            </p>
                            ${registro.integridade ? 
                                '<p class="small text-success mt-2 mb-0"><i class="bi bi-check-lg"></i> Hashes idênticos = mensagem não foi alterada</p>' : 
                                '<p class="small text-danger mt-2 mb-0"><i class="bi bi-x-lg"></i> Hashes diferentes = mensagem foi modificada</p>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    wrapper.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-3">
            <div class="d-flex align-items-center gap-2">
                <span class="badge text-bg-${corRemetente}">${iconeRemetente} ${capitalizar(registro.remetente)}</span>
                <i class="bi bi-arrow-right"></i>
                <span class="text-muted small">${iconeDestino} ${capitalizar(registro.destinatario)}</span>
            </div>
            <span class="badge bg-secondary"><i class="bi bi-clock"></i> ${new Date().toLocaleTimeString('pt-BR')}</span>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card h-100 border-info">
                    <div class="card-header bg-info bg-opacity-10">
                        <i class="bi bi-file-text"></i> <strong>1. Mensagem Original</strong>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">${formatarMensagem(registro.plaintext)}</p>
                        <small class="text-muted d-block mt-2">
                            <i class="bi bi-info-circle"></i> Texto em claro antes da criptografia
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
                <div class="card h-100 border-danger">
                    <div class="card-header bg-danger bg-opacity-10">
                        <i class="bi bi-lock-fill"></i> <strong>2. Texto Cifrado</strong>
                    </div>
                    <div class="card-body">
                        <code class="texto-cifrado d-block">${registro.ciphertext}</code>
                        <small class="text-muted d-block mt-2">
                            <i class="bi bi-shield-lock"></i> Criptografado com a chave pública de ${capitalizar(registro.destinatario)}
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 border-success">
                    <div class="card-header bg-success bg-opacity-10">
                        <i class="bi bi-unlock-fill"></i> <strong>3. Mensagem Descriptografada</strong>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">${formatarMensagem(registro.decrypted)}</p>
                        <small class="text-muted d-block mt-2">
                            <i class="bi bi-key"></i> Descriptografado com a chave privada de ${capitalizar(registro.destinatario)}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        ${htmlAssinatura}
    `;

    return wrapper;
}

function renderizarMensagens() {
    mensagensContainer.innerHTML = "";

    if (!estadoAtual.mensagens.length) {
        const vazio = document.createElement("p");
        vazio.className = "text-muted mb-0";
        vazio.textContent = "Nenhuma mensagem enviada ainda.";
        mensagensContainer.appendChild(vazio);
        return;
    }

    estadoAtual.mensagens.forEach((registro) => {
        mensagensContainer.appendChild(criarRegistroHTML(registro));
    });
}

function bloquearInterface(bloquear) {
    formularios.forEach((form) => {
        const textarea = form.querySelector("textarea");
        const botao = form.querySelector("button[type='submit']");

        textarea.disabled = bloquear;
        botao.disabled = bloquear;
    });
}

function atualizarEstado(estado) {
    estadoAtual = estado;
    
    // Atualizar status da assinatura digital
    if (statusAssinatura) {
        statusAssinatura.textContent = estadoAtual.modo_assinatura ? "ON" : "OFF";
        toggleAssinaturaButton.className = estadoAtual.modo_assinatura 
            ? "btn btn-outline-success" 
            : "btn btn-outline-secondary";
    }
    renderizarMensagens();
    bloquearInterface(estadoAtual.encerrada);
}

function enviarMensagem(remetente, mensagem, formulario) {
    const botao = formulario.querySelector("button[type='submit']");
    const textarea = formulario.querySelector("textarea");

    botao.disabled = true;
    textarea.disabled = true;

    fetch("/mensagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remetente, mensagem }),
    })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error(dados.erro || "Erro ao enviar mensagem.");
            }
            return dados;
        })
        .then((dados) => {
            atualizarEstado(dados.estado);
            textarea.value = "";

            if (dados.encerrada) {
                mostrarAlerta("info", "Conversa encerrada. Use Nova conversa para reiniciar.");
            } else {
                mostrarAlerta("success", "Mensagem registrada com sucesso.");
            }
        })
        .catch((erro) => {
            mostrarAlerta("danger", erro.message);
        })
        .finally(() => {
            if (!estadoAtual.encerrada) {
                botao.disabled = false;
                textarea.disabled = false;
                textarea.focus();
            }
        });
}

formularios.forEach((formulario) => {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const remetente = formulario.dataset.remetente;
        const textarea = formulario.querySelector("textarea");
        const mensagem = textarea.value.trim();

        if (!mensagem) {
            mostrarAlerta("warning", "Digite uma mensagem antes de enviar.");
            return;
        }

        enviarMensagem(remetente, mensagem, formulario);
    });
});

resetButton?.addEventListener("click", () => {
    // Desabilitar botão e mostrar feedback
    resetButton.disabled = true;
    resetButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gerando chaves RSA...';
    mostrarAlerta("info", "Gerando novas chaves RSA de 2048 bits. Isso pode levar alguns segundos...");
    
    fetch("/reset", { method: "POST" })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error("Nao foi possivel reiniciar a conversa.");
            }
            return dados;
        })
        .then((dados) => {
            atualizarEstado(dados.estado);
            mostrarAlerta("success", "Nova conversa iniciada! Chaves RSA de 2048 bits foram regeneradas para ambos os usuários.");
        })
        .catch((erro) => {
            mostrarAlerta("danger", erro.message);
        })
        .finally(() => {
            // Restaurar botão
            resetButton.disabled = false;
            resetButton.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Nova conversa';
            
            if (!estadoAtual.encerrada) {
                formularios.forEach((formulario) => {
                    const textarea = formulario.querySelector("textarea");
                    const botao = formulario.querySelector("button[type='submit']");
                    textarea.disabled = false;
                    botao.disabled = false;
                });
            }
        });
});

toggleAssinaturaButton?.addEventListener("click", () => {
    fetch("/toggle-assinatura", { method: "POST" })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error("Nao foi possivel alterar o modo de assinatura.");
            }
            return dados;
        })
        .then((dados) => {
            atualizarEstado(dados.estado);
            const status = dados.estado.modo_assinatura ? "ativada" : "desativada";
            mostrarAlerta("info", `Assinatura digital ${status}. ${dados.estado.modo_assinatura ? 'As mensagens incluirão assinatura e verificação de integridade.' : 'As mensagens não incluirão assinatura.'}`);
        })
        .catch((erro) => {
            mostrarAlerta("danger", erro.message);
        });
});

renderizarMensagens();
bloquearInterface(estadoAtual.encerrada);
atualizarEstado(estadoAtual);
