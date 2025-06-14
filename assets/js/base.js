(function () {
  const tema = localStorage.getItem("tema");
  const fonte = localStorage.getItem("fonte");
  const root = document.documentElement;
  if (tema === "escuro") {
    root.style.setProperty(
      "--color-verdePrincipal",
      getComputedStyle(root).getPropertyValue("--color-pretoPrincipal") ||
        "#1a1a1a"
    );
  } else {
    root.style.setProperty("--color-verdePrincipal", "#04fc21"); // ou seu verde padrão
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