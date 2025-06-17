(function () {
  const tema = localStorage.getItem("tema");
  const temaPrincipal = localStorage.getItem("temaPrincipal");
  const fonte = localStorage.getItem("fonte");
  const root = document.documentElement;
  if (tema === "escuro") {
    root.style.setProperty(
      "--color-verdePrincipal",
      getComputedStyle(root).getPropertyValue("--color-pretoPrincipal") ||
        "#1a1a1a"
    );
    root.style.setProperty("--color-bg-principal", "rgb(80, 80, 80)");
      root.style.setProperty("--color-texto-principal", "white");
  } else {
    root.style.setProperty("--color-verdePrincipal", "#28a745");
    root.style.setProperty("--color-bg-principal", "white");
      root.style.setProperty("--color-texto-principal", "#1a1a1a"); // ou seu verde padrão
  }

  if (temaPrincipal === "escuro") {
    console.log("entrou aqui");

    root.style.setProperty("--color-bg-principal", "var(--color-bg-cinza)");
    root.style.setProperty("--color-texto", "white");
  } else {
    root.style.setProperty("--color-bg-principal", "white");
    root.style.setProperty("--color-texto", "#8f8f8f"); // seu verde padrão
  }

  // Fonte antes do CSS carregar
  if (fonte === "normal") {
    root.style.fontSize = "16px";
  } else if (fonte === "grande") {
    root.style.fontSize = "18px";
  } else if (fonte === "extra") {
    root.style.fontSize = "20px";
  }
})();

