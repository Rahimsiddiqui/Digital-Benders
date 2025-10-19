document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll(".brand-growing__btn"));
  const cards = Array.from(document.querySelectorAll(".brand-growing__card"));

  if (!buttons.length || !cards.length) return;

  // Show first card by default (use class, not inline styles)
  cards.forEach((card, i) => card.classList.toggle("active", i === 0));
  buttons.forEach((btn, i) => btn.classList.toggle("active", i === 0));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-card");
      // toggle card active class
      cards.forEach((card) =>
        card.classList.toggle("active", card.id === targetId)
      );
      // toggle button active class
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
});
