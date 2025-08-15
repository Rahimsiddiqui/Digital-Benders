const form = document.querySelector(`.form`);
const spinner = document.querySelector(`.spinner`);

const isFormFilled = (form) => {
  return Array.from(form.querySelectorAll("input")).every(
    (field) => field.value.trim() !== ""
  );
};

form.addEventListener(`submit`, (e) => {
  e.preventDefault();

  if (spinner) {
    spinner.style.display = "inline-block";
    setTimeout(() => {
      spinner.style.display = "none";
      if (!isFormFilled(form)) {
        Swal.fire({
          title: "Error!",
          text: "Please fill all the fields before submitting.",
          timer: 3000,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Message Sent Successfully!",
        text: "We will contact you within the next 24-48hrs.",
        timer: 3000,
        icon: "success",
      });
      form.reset();
    }, 3000);
  }
});
