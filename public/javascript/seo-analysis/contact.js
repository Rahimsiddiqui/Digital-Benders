const numberInput = document.getElementById("customNumberInput");
const inputs = document.querySelectorAll(".seo-analysis__input");
const analysisSpinner = document.querySelector(".analysis-spinner");
const submitButton = document.querySelector(".submit__form");
const analysisForm = document.querySelector(".seo-analysis__form");

this.value = this.value.replace(/[^0-9()+\- ]/g, "");

numberInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9()+\- ]/g, "");
});

function handleSubmitContact(e) {
  e.preventDefault();

  analysisSpinner.style.display = "inline-block";
  submitButton.disabled = true;
  submitButton.classList.add("disabled");

  setTimeout(() => {
    inputs.forEach((input) => (input.value = ""));
    analysisSpinner.style.display = "none";
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");

    Swal.fire({
      title: "Thank You!",
      text: "You will receive your free SEO Analysis in next 3-4 business days.",
      timer: 3000,
      icon: "success",
    });
  }, 3000);
}

analysisForm.addEventListener("submit", handleSubmitContact);
