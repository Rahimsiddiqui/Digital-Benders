const cards = document.querySelectorAll(".services__card");

cards.forEach((card) => {
  const cardChanger = card.querySelector(".card__changer");

  if (!cardChanger) return;

  // MOBILE / CLICK
  cardChanger.addEventListener("click", (e) => {
    e.preventDefault();
    card.classList.toggle("active");
  });

  // DESKTOP / HOVER
  cardChanger.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    card.classList.add("active");
  });
  card.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    card.classList.remove("active");
  });
});

// CLICK OUTSIDE TO CLOSE ON MOBILE
document.addEventListener("click", (e) => {
  cards.forEach((card) => {
    if (!card.contains(e.target)) {
      card.classList.remove("active");
    }
  });
});
