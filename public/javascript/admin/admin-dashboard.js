const dangerBtn = document.querySelector(".logoutBtn");

dangerBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Logout",
    text: "Are you sure you want to logout?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    customClass: {
      confirmButton: "btn-red", // first button
      cancelButton: "btn-green", // second button
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/admin/logout";
      document.body.appendChild(form);
      form.submit();
    }
  });
});
