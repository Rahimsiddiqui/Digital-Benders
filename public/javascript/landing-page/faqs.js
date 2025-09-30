const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const toggleBtn = faq.querySelector(".faq__toggle");
  const icon = toggleBtn.querySelector("img");
  const question = faq.querySelector(".faq__question");
  const answer = faq.querySelector(".faq__answer");

  // Reusable toggle function
  const toggleFaq = () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    faq.classList.toggle("open", !isExpanded);

    if (!isExpanded) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.marginTop = "var(--size-md)";
      icon.src = "https://www.creativesquad.ca/images/faqs_minus.svg";
    } else {
      answer.style.maxHeight = "0";
      setTimeout(() => {
        answer.style.marginTop = "0";
      }, 400); // match CSS transition time
      icon.src = "https://www.creativesquad.ca/images/faqs_plus.svg";
    }
  };

  // Click both the question text *and* the button
  toggleBtn.addEventListener("click", toggleFaq);
  question.addEventListener("click", (e) => {
    // Prevent double trigger if button is clicked
    if (!e.target.closest(".faq__toggle")) {
      toggleFaq();
    }
  });
});
