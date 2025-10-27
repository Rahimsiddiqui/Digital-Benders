// Needed Elements
const dangerBtn = document.querySelector(".logoutBtn");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebar = document.querySelector(".sidebar");
const settingsIcon = document.querySelector(".settings-icon");
const themeIcon = document.querySelector(".theme-icon");
const linksContainer = document.querySelector(".links");
const links = document.querySelectorAll(".underline");

// State
let sidebarOpen = false;
let settingsIconRotated = false;
let theme = "light";

// --- NAV LINK ACTIVE HANDLER ---
links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".underline.active")?.classList.remove("active");
    link.classList.add("active");
  });
});

// --- THEME TOGGLE ---
themeIcon.addEventListener("click", () => {
  themeIcon.classList.add("fade");

  setTimeout(() => {
    const isLight = theme === "light";

    themeIcon.src = isLight
      ? "/icons/darkmode - dark.png"
      : "/icons/lightmode - light.png";
    themeIcon.classList.toggle("change-margin");
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light"
    );
    theme = isLight ? "dark" : "light";

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

  linksContainer.style.opacity = sidebarOpen ? "1" : "0";
  linksContainer.style.pointerEvents = sidebarOpen ? "auto" : "none";
  sidebar.style.maxWidth = sidebarOpen ? "190px" : "57.4px";
  settingsIcon.style.left = sidebarOpen ? "83px" : "18px";
  themeIcon.style.left = sidebarOpen ? "58px" : "-8px";
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
