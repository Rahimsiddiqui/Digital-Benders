const slider = document.querySelector(".core-slider");
const slides = document.querySelectorAll(".slide");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;
const slidesToShow = 2;
const gap = 20;
const slideWidth = slider.querySelector(".slide").offsetWidth;
const maxIndex = slides.length - slidesToShow;

next.addEventListener("click", () => {
  if (index < maxIndex) {
    index++;
    updateSlider();
  }
});

prev.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

function updateSlider() {
  const moveAmount = index * (slideWidth + gap);
  slider.style.transform = `translateX(-${moveAmount}px)`;
  prev.disabled = index === 0;
  next.disabled = index === maxIndex;
}

updateSlider();
