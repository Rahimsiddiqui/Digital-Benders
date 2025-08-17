const form = document.querySelector(`#submit-form`);
const spinner = document.querySelector(`.spinner`);

const isFormedFilled = (form) => {
  return Array.from(form.querySelectorAll("input, textarea, select")).every(
    (field) => field.value.trim() !== ""
  );
};

form.addEventListener(`submit`, (e) => {
  e.preventDefault();

  if (spinner) {
    spinner.style.display = "inline-block";
    setTimeout(() => {
      spinner.style.display = "none";
      if (!isFormedFilled(form)) {
        Swal.fire({
          title: "Error!",
          text: "Please fill all the fields before submitting.",
          timer: 3000,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Thank You!",
        text: `Thank you for submitting your information, we'll get back to you in the
        next 24-48hrs.`,
        timer: 3000,
        icon: "success",
      });
      form.reset();
    }, 3000);
  }
});
