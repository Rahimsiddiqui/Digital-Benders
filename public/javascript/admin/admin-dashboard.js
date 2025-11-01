// Needed Elements
const dangerBtn = document.querySelector(".logout-icon");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebar = document.querySelector(".sidebar");
const settingsIcon = document.querySelector(".settings-icon");
const themeIcon = document.querySelector(".theme-icon");
const linksContainer = document.querySelector(".links");
const navLinks = document.querySelectorAll(".link");

// State
let sidebarOpen = false;
let settingsIconRotated = false;
let theme = "light";

// FUNCTIONS

const initSidebar = function (
  sidebarState,
  afterSidebarClosed,
  beforeSidebarClosed
) {
  return sidebarState ? afterSidebarClosed : beforeSidebarClosed;
};

// --- NAV LINK ACTIVE HANDLER ---
navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".link.active")?.classList.remove("active");
    item.classList.add("active");
  });
});

// --- THEME TOGGLE ---
themeIcon.addEventListener("click", () => {
  themeIcon.classList.add("fade");

  setTimeout(() => {
    const isLight = theme === "light";

    themeIcon.src = isLight
      ? "/icons/darkmode - dark.png"
      : "/icons/lightmode - dark.png";

    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light"
    );
    theme = isLight ? "dark" : "light";

    themeIcon.classList.toggle("changeMargin");

    themeIcon.classList.remove("fade");
  }, 200);
});

// --- SETTINGS ICON ROTATION ---
settingsIcon.addEventListener("click", () => {
  settingsIcon.style.transform = settingsIconRotated
    ? "rotate(0deg)"
    : "rotate(45deg)";
  settingsIconRotated = !settingsIconRotated;
});

// --- SIDEBAR TOGGLE ---
sidebarLogo.addEventListener("click", () => {
  sidebarOpen = !sidebarOpen;

  const linkRows = document.querySelectorAll(".link__row");

  linkRows.forEach((row) => {
    row.addEventListener("click", () => {
      // remove active from previous row
      document.querySelector(".link__row.active")?.classList.remove("active");
      // add active to clicked
      row.classList.add("active");
    });
  });

  sidebar.classList.toggle("open", sidebarOpen);
  sidebar.style.maxWidth = initSidebar(sidebarOpen, "190px", "57.4px");
  settingsIcon.style.left = initSidebar(sidebarOpen, "83px", "18px");
  themeIcon.style.left = initSidebar(sidebarOpen, "77px", "12px");
  dangerBtn.style.left = initSidebar(sidebarOpen, "78px", "13px");
});

// --- LOGOUT CONFIRMATION ---
dangerBtn.addEventListener("click", () => {
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
