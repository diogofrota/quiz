let perguntas = [
  { texto: "O que deve ser feito em caso de terremoto?", alternativas: ["Correr para a rua", "Ficar sob uma mesa", "Subir no elevador", "Ir para a sacada"], correta: 1 },
  { texto: "Número da Defesa Civil no Brasil?", alternativas: ["100", "180", "199", "190"], correta: 2 },
  { texto: "Kit de emergência ideal inclui:", alternativas: ["Só enlatados", "Água, lanterna, documentos", "Apenas medicamentos", "Dinheiro e roupas"], correta: 1 },
  { texto: "O que NÃO deve fazer em enchente?", alternativas: ["Evitar contato", "Andar descalço", "Desligar energia", "Buscar abrigo"], correta: 1 },
  { texto: "Quem acionar em deslizamento?", alternativas: ["Defesa Civil", "Amigos", "Polícia Federal", "Prefeitura"], correta: 0 }
];

let usuarios = [];
let nome = "";
let email = "";
let indice = 0;
let pontos = 0;

function mostrarTela(tela) {
  document.getElementById("menu").style.display = tela === 'menu' ? 'block' : 'none';
  document.getElementById("formulario").style.display = tela === 'formulario' ? 'block' : 'none';
  document.getElementById("quiz").style.display = 'none';
  document.getElementById("resultado").style.display = 'none';
  document.getElementById("ranking").style.display = 'none';
}

function iniciarQuiz() {
  nome = document.getElementById("nome").value.trim();
  email = document.getElementById("email").value.trim();

  if (nome === "" || email === "") {
    alert("Preencha todos os campos.");
    return;
  }

  document.getElementById("formulario").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  indice = 0;
  pontos = 0;
  mostrarPergunta();

  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
}

function mostrarPergunta() {
  let p = perguntas[indice];
  document.getElementById("pergunta").innerHTML = `<h3>${p.texto}</h3>`;
  let html = "";
  // p.alternativas.forEach((alt, i) => {
  //   html += `<label><input type='radio' name='resposta' value='${i}'> ${alt}</label>`;
  // });

  p.alternativas.forEach((alt, i) => {
  html += `
    <div class="alternativa">
      <input type='radio' name='resposta' id='alt${i}' value='${i}'>
      <label for='alt${i}'>${alt}</label>
    </div>
  `;
});
  document.getElementById("alternativas").innerHTML = html;
}

function proximaPergunta() {
  let resposta = document.querySelector("input[name='resposta']:checked");
  if (!resposta) {
    alert("Selecione uma resposta.");
    return;
  }
  if (parseInt(resposta.value) === perguntas[indice].correta) pontos++;
  indice++;

  if (indice < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarQuiz();
  }
}

function finalizarQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";
  usuarios.push({ nome, pontos });
  document.getElementById("resultado").innerHTML =
    `<h2>Parabéns, ${nome}!</h2><p>Você acertou ${pontos} de ${perguntas.length} perguntas.</p>`;
}

function mostrarClassificacao() {
  usuarios.sort((a, b) => b.pontos - a.pontos);
  let html = '<h2>Classificação</h2><ol>';
  usuarios.forEach(u => {
    html += `<li>${u.nome} - ${u.pontos} ponto(s)</li>`;
  });
  html += '</ol>';

  document.getElementById("ranking").innerHTML = html;
  document.getElementById("ranking").style.display = "block";
  document.getElementById("menu").style.display = "none";
  document.getElementById("formulario").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "none";
}

function paginainicial() {
  window.location.href = "index.html";
}