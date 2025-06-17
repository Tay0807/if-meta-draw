document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = document.documentElement;
  const fonteSalva = localStorage.getItem("fonte");
  const temaSalvo = localStorage.getItem("tema");
  const temaSalvoPrincipal = localStorage.getItem("temaPrincipal");

  // ✅ Trocar a variável de cor principal
  if (temaSalvo === "escuro") {
    console.log("entrou aqi");

    root.style.setProperty(
      "--color-verdePrincipal",
      "var(--color-pretoPrincipal)"
    );
    root.style.setProperty("--color-texto-principal", "white");
  } else {
    root.style.setProperty("--color-verdePrincipal", "#28a745");
    root.style.setProperty("--color-bg-principal", "white");
    root.style.setProperty("--color-texto-principal", "#1a1a1a"); // seu verde padrão
  }

  if (temaSalvoPrincipal === "escuro") {
    console.log("entrou aqi");

    root.style.setProperty("--color-bg-principal", "var(--color-bg-cinza)");
    root.style.setProperty("--color-texto", "white");
  } else {
    root.style.setProperty("--color-bg-principal", "white");
    root.style.setProperty("--color-texto", "#8f8f8f"); // seu verde padrão
  }

  // ✅ Aplicar tamanho da fonte salvo
  if (fonteSalva === "normal") {
    root.style.fontSize = "16px";
  } else if (fonteSalva === "grande") {
    root.style.fontSize = "18px";
  } else if (fonteSalva === "extra") {
    root.style.fontSize = "20px";
  }
});
