const ctx = document.getElementById("graficoMetas").getContext("2d");
let tipoAtual = "pie";

const dadosGrafico = {
  labels: ["Concluídas", "Pendentes"],
  datasets: [
    {
      data: [2, 2],
      backgroundColor: ["#2e7d32", "#e74c3c"],
      borderWidth: 1,
    },
  ],
};

let grafico = new Chart(ctx, {
  type: tipoAtual,
  data: dadosGrafico,
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

function atualizarGrafico(tipo, btn) {
  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: tipo,
    data: dadosGrafico,
    options: {
      plugins: {
        legend: {
          position: tipo === "pie" ? "bottom" : "top",
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
                },
              },
            }
          : {},
    },
  });

  // Botão ativo
  document
    .querySelectorAll(".btn-opcao")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}
