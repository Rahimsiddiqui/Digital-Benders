document.addEventListener("DOMContentLoaded", function () {
  // Styles For Case Studies Swiper
  new Swiper(".case-studies-swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
      delay: 1750,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    speed: 500,
    loop: true,
    breakpoints: {},
  });
});
