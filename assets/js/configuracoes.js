document.addEventListener("DOMContentLoaded", () => {
  const temaSwitch = document.getElementById("temaSwitch");
  const tamanhoFonte = document.getElementById("tamanhoFonte");
  const root = document.documentElement;

  // Carrega valores salvos
  if (localStorage.getItem("tema") === "escuro") {
    temaSwitch.checked = true;
    root.style.setProperty(
      "--color-verdePrincipal",
      "var(--color-pretoPrincipal)"
    );
  }

  if (localStorage.getItem("fonte")) {
    aplicarFonte(localStorage.getItem("fonte"));
    tamanhoFonte.value = localStorage.getItem("fonte");
  }

  // Alterar tema e salvar
  temaSwitch.addEventListener("change", () => {
    if (temaSwitch.checked) {
      localStorage.setItem("tema", "escuro");
      root.style.setProperty(
        "--color-verdePrincipal",
        "var(--color-pretoPrincipal)"
      );
    } else {
      localStorage.setItem("tema", "claro");
      root.style.setProperty("--color-verdePrincipal", "#04fc21"); // verde padrão
    }
  });

  // Alterar fonte
  tamanhoFonte.addEventListener("change", () => {
    const valor = tamanhoFonte.value;
    aplicarFonte(valor);
    localStorage.setItem("fonte", valor);
  });

  function aplicarFonte(valor) {
    if (valor === "normal") {
      root.style.fontSize = "16px";
    } else if (valor === "grande") {
      root.style.fontSize = "18px";
    } else if (valor === "extra") {
      root.style.fontSize = "20px";
    }
  }
});
