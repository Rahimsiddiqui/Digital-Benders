window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".FAQ-question").forEach((button, idx) => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      const icon = document.querySelector(`#icon-${idx + 1}`);
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".FAQ-item").forEach((faqItem, i) => {
        faqItem.classList.remove("open");
        const currentIcon = document.querySelector(`#icon-${i + 1}`);
        if (currentIcon) currentIcon.textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("open");
        icon.textContent = "–";
      }
    });
  });
});
