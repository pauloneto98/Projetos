const display = document.getElementById("display");

function adicionar(valor) {
  display.value += valor;
}

function limpar() {
  display.value = "";
}

function calcular() {
  const expressao = display.value;

  // Permite apenas números, operadores, parênteses e ponto
  if (!/^[0-9+\-*/.() ]+$/.test(expressao)) {
    display.value = "Erro";
    return;
  }

  try {
    // Avalia com segurança
    const resultado = new Function("return " + expressao)();
    display.value = resultado;
  } catch (e) {
    display.value = "Erro";
  }
}

function alternarTema() {
  const body = document.body;
  const botao = document.getElementById("toggle-tema");

  body.classList.toggle("dark");

  const temaAtual = body.classList.contains("dark") ? "escuro" : "claro";
  botao.textContent = temaAtual === "escuro" ? "☀️ Tema Claro" : "🌙 Tema Escuro";

  localStorage.setItem("tema", temaAtual);
}

// Aplica tema salvo
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "escuro") {
    document.body.classList.add("dark");
    document.getElementById("toggle-tema").textContent = "☀️ Tema Claro";
  }
});

// Suporte ao teclado
document.addEventListener("keydown", function(event) {
  const tecla = event.key;

  if (!isNaN(tecla) || "+-*/.()".includes(tecla)) {
    adicionar(tecla);
  } else if (tecla === "Enter") {
    calcular();
  } else if (tecla === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (tecla === "Escape") {
    limpar();
  }
});