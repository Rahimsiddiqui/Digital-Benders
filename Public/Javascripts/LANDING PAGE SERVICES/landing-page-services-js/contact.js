const form = document.querySelector(".form");
const submitBtn = document.querySelector(".submit-btn");
const spinner = document.querySelector(".spinner");

const isFormFilled = (form) => {
  return Array.from(form.querySelectorAll("input")).every(
    (field) => field.value.trim() !== ""
  );
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // ✅ First check if form is filled
  if (!isFormFilled(form)) {
    Swal.fire({
      title: "Error!",
      text: "Please fill all the fields before submitting.",
      timer: 3000,
      icon: "error",
    });
    return;
  }

  // ✅ Disable button and show spinner
  submitBtn.disabled = true;
  submitBtn.classList.add("disabled");
  spinner.style.display = "inline-block";

  setTimeout(() => {
    spinner.style.display = "none";

    Swal.fire({
      title: "Message Sent Successfully!",
      text: "We will contact you within the next 24-48hrs.",
      timer: 3000,
      icon: "success",
    });

    // ✅ Re-enable button and reset form
    submitBtn.disabled = false;
    submitBtn.classList.remove("disabled");
    form.reset();
  }, 3000);
});
