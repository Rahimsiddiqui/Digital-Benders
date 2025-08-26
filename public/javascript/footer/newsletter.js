// Needed Elements
const form = document.querySelector(".newsletter__form");
const subscribeInput = document.querySelector(".form__input");
const telegramIcon = document.querySelector(".form__tele-icon");
const spinner = document.querySelector(".spinner");

// Function To Check If Form Is Filled
const isFormFilled = (form) => {
  return Array.from(form.querySelectorAll("input, textarea, select")).every(
    (field) => field.value.trim() !== ""
  );
};

// Function To Handle Form Submit
function handleSubmit(e) {
  e.preventDefault();

  // Storing Input Value So It Is Safe
  const val = subscribeInput.value;

  // First Check If Form Is Filled
  if (!isFormFilled(form)) {
    Swal.fire({
      title: "Error!",
      text: "Newsletter Could Not Be Subscribed!",
      timer: 3500,
      icon: "error",
    });
    return;
  }

  // Disable Button & Show Spinner
  telegramIcon.disabled = true;
  telegramIcon.classList.add("disabled");
  spinner.style.display = "inline-block";

  setTimeout(() => {
    spinner.style.display = "none";

    Swal.fire({
      title: "Thank You!",
      text: `"${val}" Newsletter Subscribed Successfully!`,
      timer: 3000,
      icon: "success",
    });

    // Re-enable Button And Reset Form
    telegramIcon.disabled = false;
    telegramIcon.classList.remove("disabled");
    form.reset();
  }, 3000);
}
