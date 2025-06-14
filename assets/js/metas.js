function toggleAnotacao(button) {
  const textarea = button
    .closest(".box-materia")
    .querySelector(".campo-anotacao");
  if (textarea.style.display === "none") {
    textarea.style.display = "block";
    button.textContent = "−"; // símbolo de menos
  } else {
    textarea.style.display = "none";
    button.textContent = "+"; // símbolo de mais
  }
}
