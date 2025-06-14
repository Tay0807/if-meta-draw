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

function sortearFrase() {
  const novaFrase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase").textContent = novaFrase;
  localStorage.setItem("fraseMotivacional", novaFrase);
}

// Exibir frase salva (ou aleatória se não houver)
const fraseSalva =
  localStorage.getItem("fraseMotivacional") ||
  frases[Math.floor(Math.random() * frases.length)];
document.getElementById("frase").textContent = fraseSalva;
