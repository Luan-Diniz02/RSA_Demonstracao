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
    wrapper.className = "registro shadow-sm border rounded p-3 bg-white";

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

    wrapper.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-2">
            <div class="d-flex align-items-center gap-2">
                <span class="badge text-bg-primary">${capitalizar(registro.remetente)}</span>
                <span class="text-muted small">destino: ${capitalizar(registro.destinatario)}</span>
            </div>
        </div>
        <div class="mb-2">
            <h2 class="h6 mb-1">Mensagem original</h2>
            <p class="mb-0">${formatarMensagem(registro.plaintext)}</p>
        </div>
        <div class="mb-2">
            <h2 class="h6 mb-1">Ciphertext (hex)</h2>
            <code class="texto-cifrado">${registro.ciphertext}</code>
        </div>
        <div>
            <h2 class="h6 mb-1">Mensagem apos descriptografia</h2>
            <p class="mb-0">${formatarMensagem(registro.decrypted)}</p>
        </div>
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
            mostrarAlerta("primary", "Nova conversa iniciada. Chaves foram regeneradas.");
        })
        .catch((erro) => {
            mostrarAlerta("danger", erro.message);
        })
        .finally(() => {
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

renderizarMensagens();
bloquearInterface(estadoAtual.encerrada);
