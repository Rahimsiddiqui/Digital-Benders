// Needed Elements
const hamburger = document.querySelector(".nav__hamburger");
const hamburgerImg = hamburger.querySelector("img");
const mobileSidebar = document.querySelector(".sidebar__mobile");

// Function to close sidebar
function closeSidebar() {
  mobileSidebar.classList.remove("show");
  hamburgerImg.src = "/assets/images/hamburger.svg";
  hamburger.setAttribute("aria-expanded", "false");
}

// Toggle on click
hamburger.addEventListener("click", () => {
  const isOpen = mobileSidebar.classList.toggle("show");

  // Swap icon
  hamburgerImg.src = isOpen
    ? "/assets/images/cross.svg"
    : "/assets/images/hamburger.svg";

  // Accessibility
  hamburger.setAttribute("aria-expanded", isOpen);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1260) {
    closeSidebar();
  }
});
