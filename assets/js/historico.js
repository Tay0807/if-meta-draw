document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("graficoMetas").getContext("2d");
  let grafico;

  // Pega as metas do localStorage e organiza os dados
  function obterDados() {
    const metas = JSON.parse(localStorage.getItem("lista")) || [];
    const filtradas = metas.filter((m) => !m.lixeira);
    const concluidas = filtradas.filter((m) => m.concluido).length;
    const pendentes = filtradas.filter((m) => !m.concluido).length;

    return {
      concluidas,
      pendentes,
      metas: filtradas,
    };
  }

  // Atualiza o resumo acima do gráfico
  function atualizarResumo() {
    const { concluidas, metas } = obterDados();
    const resumoEl = document.getElementById("resumoMetas");

    if (resumoEl) {
      if (metas.length === 0) {
        resumoEl.innerText = "Nenhuma meta registrada.";
        resumoEl.className = "text-center text-muted fw-semibold mb-3";
      } else {
        resumoEl.innerText = `Você concluiu ${concluidas} de ${metas.length} metas`;
        resumoEl.className = "text-center fw-semibold mb-3";
      }
    }
  }

  function atualizarGrafico(tipo = "pie", btn = null) {
    const { concluidas, pendentes } = obterDados();

    if (grafico) grafico.destroy();

    const cores = ["#28a745", "#B22222"]; // verde e vermelho escuro

    grafico = new Chart(ctx, {
      type: tipo,
      data: {
        labels: ["Concluídas", "Pendentes"],
        datasets: [
          {
            data: [concluidas, pendentes],
            backgroundColor: cores,
            label: "Metas concluídas",
            borderWidth: 0,
            hoverOffset: tipo === "pie" ? 30 : 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: tipo === "pie" ? "bottom" : "top",
            labels: {
              boxWidth: 5,
              padding: 10,
              color: "#343a40",
              font: {
                size: 14,
                weight: "600",
              },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "#343a40",
            titleColor: "#fff",
            bodyColor: "#fff",
            cornerRadius: 4,
            padding: 8,
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value =
                  context.parsed.y !== undefined
                    ? context.parsed.y
                    : context.parsed;
                return `${label}: ${value}`;
              },
            },
          },
        },
        responsive: true,
        scales:
          tipo === "bar"
            ? {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    color: "#495057",
                    font: {
                      size: 13,
                    },
                  },
                  grid: {
                    color: "#dee2e6",
                  },
                },
                x: {
                  ticks: {
                    color: "#495057",
                    font: {
                      size: 13,
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
              }
            : {},
      },
    });

    if (btn) {
      document
        .querySelectorAll(".btn-opcao")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    atualizarResumo();
  }

  function atualizarTabela() {
    const { metas } = obterDados();
    const tbody = document.querySelector(".tabela-metas tbody");
    tbody.innerHTML = "";

    if (metas.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Nenhuma meta encontrada.</td></tr>`;
      return;
    }

    metas.forEach((meta) => {
      const statusIcon = meta.concluido
        ? '<i class="bi bi-check-circle-fill text-success" title="Concluída"></i>'
        : '<i class="bi bi-hourglass-split text-danger" title="Pendente"></i>'; // ajustei para text-danger (vermelho)
      const statusTexto = meta.concluido ? "Concluída" : "Pendente";
      const statusClasse = meta.concluido
        ? "text-success fw-semibold"
        : "text-danger fw-semibold";

      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${meta.nome}</td>
      <td class="${statusClasse}">${statusIcon} ${statusTexto}</td>
      <td>${meta.data}</td>
      <td>${meta.materia || "-"}</td>
    `;

      tbody.appendChild(tr);
    });

    atualizarResumo();
  }

  // Botões de troca de gráfico
  document.querySelectorAll(".btn-opcao").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tipo = btn.getAttribute("data-tipo");
      atualizarGrafico(tipo, btn);
    });
  });

  // Inicializa tudo
  atualizarGrafico("pie");
  atualizarTabela();
});
