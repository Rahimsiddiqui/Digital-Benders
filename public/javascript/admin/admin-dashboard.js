// Needed Elements
const settingsIcon = document.getElementById("settings-icon");
const footerRows = document.querySelectorAll(".footer__row");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebar = document.querySelector(".sidebar");
const linksContainer = document.querySelector(".links");
const navLinks = document.querySelectorAll(".link");

// --- STATE ---
let sidebarOpen = false;
let settingsIconRotated = false;

// --- FUNCTION ---
const initSidebar = function (
  sidebarState,
  afterSidebarClosed,
  beforeSidebarClosed
) {
  return sidebarState ? afterSidebarClosed : beforeSidebarClosed;
};

// --- SIDEBAR LINK ACTIVE HANDLER ---
navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".link.active")?.classList.remove("active");
    item.classList.add("active");
  });
});

document.querySelectorAll(".link__row").forEach((row) => {
  row.addEventListener("click", () => {
    document.querySelector(".link__row.active")?.classList.remove("active");
    row.classList.add("active");
  });
});

//  --- FOOTER ROWS ---
footerRows.forEach((row, i) => {
  switch (i) {
    case 0:
      row.addEventListener("click", () => {
        settingsIcon.style.transform = settingsIconRotated
          ? "rotate(0deg)"
          : "rotate(45deg)";
        settingsIconRotated = !settingsIconRotated;
      });
      break;

    case 1:
      row.addEventListener("click", () => {
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
      break;
  }
});

// --- SIDEBAR TOGGLE ---
sidebarLogo.addEventListener("click", () => {
  sidebarOpen = !sidebarOpen;
  sidebar.classList.toggle("open", sidebarOpen);
});
