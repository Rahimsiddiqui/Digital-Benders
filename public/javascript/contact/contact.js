const numberInput = document.getElementById("customNumberInput");
const inputs = document.querySelectorAll(".form__input");
const contactSpinner = document.querySelector(".company-contact-spinner");
const submitButton = document.querySelector(".submit__form");
const contactForm = document.querySelector(".contact__form");

numberInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9()+\- ]/g, "");
});

function handleSubmitContact(e) {
  e.preventDefault();

  contactSpinner.style.display = "inline-block";
  submitButton.disabled = true;
  submitButton.classList.add("disabled");

  setTimeout(() => {
    inputs.forEach((input) => (input.value = ""));
    contactSpinner.style.display = "none";
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");

    Swal.fire({
      title: "Thank You!",
      text: "We Will Contact in 3-4 Business Days!",
      timer: 3000,
      icon: "success",
    });
  }, 3000);
}

contactForm.addEventListener("submit", handleSubmitContact);
