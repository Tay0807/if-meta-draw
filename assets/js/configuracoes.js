document.addEventListener("DOMContentLoaded", () => {
  const temaSwitch = document.getElementById("temaSwitch");
  const temaSwitchPrincipal = document.getElementById("temaSwitchEscuro");
  const tamanhoFonte = document.getElementById("tamanhoFonte");
  const root = document.documentElement;

  // Carrega valores salvos
  if (localStorage.getItem("tema") === "escuro") {
    temaSwitch.checked = true;
    root.style.setProperty(
      "--color-verdePrincipal",
      "var(--color-pretoPrincipal)"
    );
    root.style.setProperty("--color-texto-principal", "#8f8f8f");
    root.style.setProperty("--color-texto", "#8f8f8f");
  }

  // Carrega valores salvos
  if (localStorage.getItem("temaPrincipal") === "escuro") {
    temaSwitchPrincipal.checked = true;
    root.style.setProperty("--color-bg-principal", "var(--color-bg-cinza)");
    root.style.setProperty("--color-texto", "white");
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
      root.style.setProperty("--color-texto-principal", "#8f8f8f");
      root.style.setProperty("--color-texto", "#8f8f8f");
    } else {
      localStorage.setItem("tema", "claro");
      root.style.setProperty("--color-verdePrincipal", "#28a745"); // verde padrão
      // root.style.setProperty("--color-bg-principal", "white");
      root.style.setProperty("--color-texto-principal", "#1a1a1a");
    }
  });

  // Alterar tema e salvar
  temaSwitchPrincipal.addEventListener("change", () => {
    if (temaSwitchPrincipal.checked) {
      localStorage.setItem("temaPrincipal", "escuro");
      root.style.setProperty("--color-bg-principal", "var(--color-bg-cinza)");
      root.style.setProperty("--color-texto", "white");
    } else {
      localStorage.setItem("temaPrincipal", "claro");
      root.style.setProperty("--color-bg-principal", "white");
      root.style.setProperty("--color-texto", "#8f8f8f");
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
