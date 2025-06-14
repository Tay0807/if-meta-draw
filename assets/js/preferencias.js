document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = document.documentElement;
  const fonteSalva = localStorage.getItem("fonte");
  const temaSalvo = localStorage.getItem("tema");

  // ✅ Trocar a variável de cor principal
  if (temaSalvo === "escuro") {
    console.log("entrou aqi");

    root.style.setProperty(
      "--color-verdePrincipal",
      "var(--color-pretoPrincipal)"
    );
  } else {
    root.style.setProperty("--color-verdePrincipal", "#04fc21"); // seu verde padrão
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
