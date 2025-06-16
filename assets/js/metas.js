// const { get } = require("http");

function toggleAnotacao(button) {
  const textarea = button
    .closest(".box-materia")
    .querySelector(".campo-anotacao");
  if (textarea.style.display === "none") {
    textarea.style.display = "block";
    button.textContent = "−"; // símbolo de menos
  } else {
    textarea.style.display = "none";
    button.textContent = "+"; // símbolo de mais
  }
}

function atualiza() {
  var itens = JSON.parse(localStorage.getItem("lista")) || [];
  var container_metas = document.getElementById("container_metas");

  var conteudo = "";

  for (var x of itens) {
    if (x.lixeira) continue; // 👉 pula itens na lixeira

    conteudo += `<div class="box-materia">
                    <div class="titulo-materia">
                        Curso: ${x.materia}
                        <button class="btn-toggle" onclick="toggleAnotacao(this)">−</button>
                    </div>
                    <div class="form-control campo-anotacao">
                        <p class="card-text mb-1"><strong>Prazo:</strong> ${x.data}</p>
                        <p class="card-text mb-1"><strong>Tipo:</strong> ${x.tipo_atividade || "-"}</p>
                        <p class="card-text mb-1"><strong>Anotações:</strong> ${x.anotacoes || "-"}</p>
                        <p class="card-text mb-2"><strong>Descrição:</strong> ${x.descricao || "-"}</p>
                    </div>
                </div>`;
  }

  container_metas.innerHTML = conteudo;
}


atualiza();
