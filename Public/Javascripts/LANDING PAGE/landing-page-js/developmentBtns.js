window.addEventListener(`DOMContentLoaded`, () => {
  const allBtns = document.querySelectorAll(`.development-btn`);
  const allContainers = document.querySelectorAll(`.whole-card`);

  let activeDevIndex = null;

  function hideAllDevelopmentContainers() {
    allContainers.forEach((container) => {
      container.style.display = "none";
    });
    activeDevIndex = null;
    document.removeEventListener("click", outsideClickListenerDevelopment);
  }

  function outsideClickListenerDevelopment(e) {
    const activeBtn = allBtns[activeDevIndex];
    const activeContainer = document.querySelector(
      `#card-${activeDevIndex + 1}`
    );

    if (
      activeBtn &&
      (activeBtn.contains(e.target) ||
        (activeContainer && activeContainer.contains(e.target)))
    ) {
      return;
    }

    hideAllDevelopmentContainers();
  }

  allBtns.forEach((btn, i) => {
    btn.addEventListener(`click`, (e) => {
      e.stopPropagation();

      allContainers.forEach((container) => {
        container.style.display = "none";
      });

      const foundContainer = document.querySelector(`#card-${i + 1}`);
      if (foundContainer) {
        foundContainer.style.display = "flex";
        activeDevIndex = i;
        document.addEventListener("click", outsideClickListenerDevelopment);
      }
    });
  });
});
