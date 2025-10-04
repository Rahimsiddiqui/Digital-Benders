document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".trustpilot__swiper", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 17,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    speed: 1000,
    loop: true,
    breakpoints: {
      1260: { slidesPerView: 2, centeredSlides: false },
      1450: { slidesPerView: 3 },
    },
  });
});
