window.addEventListener(`DOMContentLoaded`, () => {
  const cards = document.querySelectorAll(`.qualities-card`);

  cards.forEach((card) => {
    const normalContent = card.querySelector(".card-default-content");
    const hoverContent = card.querySelector(".card-hover-content");
    const aTag = card.querySelector(".learn-more");

    if (aTag && normalContent && hoverContent) {
      aTag.addEventListener(`mouseenter`, () => {
        normalContent.style.display = "none";
        hoverContent.style.display = "block";
      });

      card.addEventListener(`mouseleave`, () => {
        normalContent.style.display = "flex";
        hoverContent.style.display = "none";
      });
    }
  });
});
