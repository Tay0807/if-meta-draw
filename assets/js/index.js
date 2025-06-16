document.addEventListener("DOMContentLoaded", function () {
  const botaoAdicionar = document.getElementById("bnt");
  const campoBusca = document.getElementById("busca");

  if (botaoAdicionar) {
    botaoAdicionar.disabled = false;

    botaoAdicionar.addEventListener("click", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const materia = document.getElementById("materia").value;
      const data = document.getElementById("data").value;
      const tipo_atividade = document.getElementById("tipo_atividade").value;
      const anotacoes = document.getElementById("anotacoes").value;
      const descricao = document.getElementById("descricao").value;
      const lembrete = document.getElementById("lembreteSwitch").checked;

      if (!nome || !data) {
        alert("Preencha os campos obrigatórios!");
        return;
      }

      const novaMeta = {
        nome,
        materia,
        data,
        tipo_atividade,
        anotacoes,
        descricao,
        lembrete,
        concluido: false,
        lixeira: false,
      };

      const metas = JSON.parse(localStorage.getItem("lista")) || [];
      metas.push(novaMeta);
      localStorage.setItem("lista", JSON.stringify(metas));

      if (lembrete) {
        solicitarPermissaoNotificacao();
      }

      limparFormulario();
      renderizarMetas();
      $.notify("Meta adicionada com sucesso!", "success");
    });

    campoBusca.addEventListener("input", () => {
      renderizarMetas(campoBusca.value.trim().toLowerCase());
    });

    function limparFormulario() {
      document.getElementById("nome").value = "";
      document.getElementById("materia").value = "";
      document.getElementById("data").value = "";
      document.getElementById("tipo_atividade").value = "";
      document.getElementById("anotacoes").value = "";
      document.getElementById("descricao").value = "";
      document.getElementById("lembreteSwitch").checked = false;
    }

    function getCorTipo(tipo) {
      const cores = {
        estudo: "border-primary",
        prova: "border-danger",
        tarefa: "border-warning",
        apresentação: "border-success",
      };
      const chave = tipo?.toLowerCase();
      return cores[chave] || "border-secondary";
    }

    function solicitarPermissaoNotificacao() {
      if ("Notification" in window) {
        Notification.requestPermission().then((permissao) => {
          if (permissao === "granted") {
            new Notification("Lembrete ativado!", {
              body: "Sua meta foi salva com lembrete!",
            });
          }
        });
      }
    }

    function renderizarMetas(filtroBusca = "") {
      const container = document.getElementById("suas_metas");
      let metas = JSON.parse(localStorage.getItem("lista")) || [];

      container.innerHTML = "";

      metas = metas
        .filter((m) => !m.lixeira)
        .sort((a, b) => new Date(a.data) - new Date(b.data));

      if (filtroBusca) {
        metas = metas.filter((meta) =>
          [meta.nome, meta.materia, meta.tipo_atividade]
            .join(" ")
            .toLowerCase()
            .includes(filtroBusca)
        );
      }

      metas.forEach((meta, index) => {
        const col = document.createElement("div");
        col.className = "col";

        const tipoCor = getCorTipo(meta.tipo_atividade);
        const estiloConcluido = meta.concluido
          ? "border-success border-2 bg-white"
          : "bg-light";

        const card = document.createElement("div");
        card.className = `card h-100 shadow-sm border-start ${tipoCor} border-4 ${estiloConcluido} border-1 p-3 mb-3`;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body fw-light";

        const titulo = document.createElement("h6");
        titulo.className = "card-title fs-6";
        titulo.innerHTML = meta.concluido ? `<s>${meta.nome}</s>` : meta.nome;

        const conteudo = `
          <p class="card-text mb-1"><strong>Matéria:</strong> ${meta.materia || "-"}</p>
          <p class="card-text mb-1"><strong>Prazo:</strong> ${meta.data}</p>
          <p class="card-text mb-1"><strong>Tipo:</strong> ${meta.tipo_atividade || "-"}</p>
          <p class="card-text mb-1"><strong>Anotações:</strong> ${meta.anotacoes || "-"}</p>
          <p class="card-text mb-2"><strong>Descrição:</strong> ${meta.descricao || "-"}</p>
        `;

        const switchBox = document.createElement("div");
        switchBox.className = "form-check form-switch d-flex align-items-center justify-content-between mb-2";

        const switchInput = document.createElement("input");
        switchInput.type = "checkbox";
        switchInput.className = "form-check-input";
        switchInput.id = `check${index}`;
        switchInput.checked = meta.concluido;

        const switchLabel = document.createElement("label");
        switchLabel.className = "form-check-label ms-2";
        switchLabel.innerText = "Concluída";

        switchInput.addEventListener("change", () => {
          metas[index].concluido = switchInput.checked;
          localStorage.setItem("lista", JSON.stringify(metas));
          renderizarMetas(filtroBusca);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn btn-outline-danger btn-sm mt-2";
        btnExcluir.innerHTML = '<i class="bi bi-trash"></i> Excluir';

        btnExcluir.addEventListener("click", () => {
          if (confirm("Tem certeza que deseja excluir esta meta?")) {
            metas[index].lixeira = true;
            localStorage.setItem("lista", JSON.stringify(metas));
            renderizarMetas(filtroBusca);
            $.notify("Meta excluída", "success");
          }
        });

        cardBody.appendChild(titulo);
        cardBody.innerHTML += conteudo;
        switchBox.appendChild(switchInput);
        switchBox.appendChild(switchLabel);
        cardBody.appendChild(switchBox);
        cardBody.appendChild(btnExcluir);
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
      });

      if (metas.length === 0) {
        container.innerHTML = `<div class="text-center text-muted">Nenhuma meta encontrada.</div>`;
      }
    }

    renderizarMetas();
  }
});


