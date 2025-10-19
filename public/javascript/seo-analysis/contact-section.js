const customNumberInput = document.querySelector(".customNumberInput");
const allInputs = document.querySelectorAll(".contact-section__input");
const seoAnalysisSpinner = document.querySelector(".seo-analysis-spinner");
const formSubmitBtn = document.querySelector(".submit__form");
const seoAnalysisForm = document.querySelector("#contact__form");

customNumberInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9()+\- ]/g, "");
});

function handleSubmitContact(e) {
  e.preventDefault();

  seoAnalysisSpinner.style.display = "inline-block";
  formSubmitBtn.disabled = true;
  formSubmitBtn.classList.add("disabled");

  setTimeout(() => {
    allInputs.forEach((input) => (input.value = ""));
    seoAnalysisSpinner.style.display = "none";
    formSubmitBtn.disabled = false;
    formSubmitBtn.classList.remove("disabled");

    Swal.fire({
      title: "Thank You!",
      text: "We Will Contact in 3-4 Business Days!",
      timer: 3000,
      icon: "success",
    });
  }, 3000);
}

seoAnalysisForm.addEventListener("submit", handleSubmitContact);
