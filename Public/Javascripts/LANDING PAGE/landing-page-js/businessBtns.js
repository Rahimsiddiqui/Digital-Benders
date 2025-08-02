window.addEventListener(`DOMContentLoaded`, () => {
  const btns = document.querySelectorAll(`.business-btn`);
  const foundContainers = document.querySelectorAll(`.container-of-info`);

  let currentBusinessIndex = null;

  function hideAllBusinessContainers() {
    foundContainers.forEach((container) => {
      container.style.display = "none";
    });
    currentBusinessIndex = null;
    document.removeEventListener("click", outsideClickListenerBusiness);
  }

  function outsideClickListenerBusiness(e) {
    const activeBtn = btns[currentBusinessIndex];
    const activeContainer = document.getElementById(
      `btn${currentBusinessIndex + 1}`
    );

    if (
      activeBtn &&
      (activeBtn.contains(e.target) ||
        (activeContainer && activeContainer.contains(e.target)))
    ) {
      return;
    }

    hideAllBusinessContainers();
  }

  btns.forEach((btn, i) => {
    btn.addEventListener(`click`, (e) => {
      e.stopPropagation();
      foundContainers.forEach((container) => {
        container.style.display = "none";
      });

      const containerToShow = document.getElementById(`btn${i + 1}`);
      if (containerToShow) {
        containerToShow.style.display = "flex";
        currentBusinessIndex = i;
        document.addEventListener("click", outsideClickListenerBusiness);
      }
    });
  });
});
