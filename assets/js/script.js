document.addEventListener("DOMContentLoaded", () => {
  const motivacao = document.getElementById("frases");

  const frases = [
    "A persistência é o caminho do êxito.",
    "Desafios nos tornam mais fortes e resilientes, não desista!",
    "É em meio à dificuldade que se encontra a oportunidade.",
    "As pessoas costumam dizer que a motivação não dura sempre. Bem, nem o efeito do banho, por isso recomenda-se diariamente.",
    "Nada acontece a menos que sonhemos antes.",
    "O insucesso é apenas uma oportunidade para recomeçar com mais inteligência.",
    "O êxito é ir de frustração a frustração sem perder a animação.",
    "Você precisa fazer aquilo que pensa que não é capaz de fazer.",
    "Mesmo que algo pareça difícil, nunca desista antes de tentar.",
  ];

  if (motivacao) {
    motivacao.addEventListener("click", (event) => {
      event.preventDefault();

      const fraseSorteada = frases[Math.floor(Math.random() * frases.length)];

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Salvar frase no localStorage e redirecionar
        localStorage.setItem("fraseMotivacional", fraseSorteada);
        window.location.href = "motivacao.html";
      } else {
        // Mostrar com SweetAlert no desktop
        Swal.fire({
          title: fraseSorteada,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    });
  }
});
