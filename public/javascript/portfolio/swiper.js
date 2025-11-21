document.addEventListener("DOMContentLoaded", function () {
  // Styles For Case Studies Swiper
  new Swiper(".case-studies-swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 100,
    grabCursor: true,
    autoplay: {
      delay: 1750,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 750,
    loop: true,
    breakpoints: {
      1400: { spaceBetween: 250 },
      1900: { spaceBetween: 450 },
      2300: { spaceBetween: 750 },
    },
  });
});
