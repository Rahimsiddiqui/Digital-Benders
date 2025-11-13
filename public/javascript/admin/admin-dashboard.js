// Elements
const settingsIcon = document.getElementById("settings-icon");
const footerRows = document.querySelectorAll(".footer__row");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebar = document.querySelector(".sidebar");
const linksContainer = document.querySelector(".links");

// STATE
let settingsIconRotated = false;

// --- SET DEFAULT ACTIVE ROW ---
const firstRow = linksContainer.querySelector(".link__row");
firstRow?.classList.add("active");

// --- SIDEBAR LINK ACTIVE HANDLER  ---
linksContainer.addEventListener("click", (e) => {
  const row = e.target.closest(".link__row");
  const link = e.target.closest(".link");

  if (!row || !link) return;

  document.querySelector(".link__row.active")?.classList.remove("active");
  row.classList.add("active");

  const containers = document.querySelectorAll(".container-link");
  const containerId = `${link.id}-container`;

  containers.forEach((container) => {
    container.id === containerId
      ? (container.style.display = "block")
      : (container.style.display = "none");
  });
});

// --- FOOTER ICON & LOGOUT HANDLERS ---
footerRows[0].addEventListener("click", () => {
  settingsIconRotated = !settingsIconRotated;
  settingsIcon.style.transform = `rotate(${settingsIconRotated ? 45 : 0}deg)`;
});

footerRows[1].addEventListener("click", () => {
  Swal.fire({
    title: "Logout",
    text: "Are you sure you want to logout?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    customClass: {
      confirmButton: "btn-red",
      cancelButton: "btn-green",
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

// --- SIDEBAR TOGGLE ---
sidebarLogo.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
