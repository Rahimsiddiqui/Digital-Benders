const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const toggleBtn = faq.querySelector(".faq__toggle");
  const icon = toggleBtn.querySelector("img");
  const question = faq.querySelector(".faq__question");
  const answer = faq.querySelector(".faq__answer");

  const openIcon = "/assets/images/faqs-minus-icon.svg";
  const closeIcon = "/assets/images/faqs-plus-icon.svg";

  const toggleFaq = () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    faq.classList.toggle("open", !isExpanded);

    if (!isExpanded) {
      // ↓ Open
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.marginTop = "var(--size-md)";
      icon.src = openIcon;
    } else {
      // ↓ Close
      answer.style.maxHeight = "0";
      answer.addEventListener(
        "transitionend",
        () => {
          answer.style.marginTop = "0";
        },
        { once: true }
      );
      icon.src = closeIcon;
    }
  };

  toggleBtn.addEventListener("click", toggleFaq);

  question.addEventListener("click", (e) => {
    if (!e.target.closest(".faq__toggle")) {
      toggleFaq();
    }
  });
});
