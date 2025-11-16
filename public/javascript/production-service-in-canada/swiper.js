document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".production-service-swiper", {
    slidesPerView: 1,
    loop: true,
    allowTouchMove: true,
    speed: 500,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      475: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    },
  });

  new Swiper(".design-services__swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 800,
    spaceBetween: 30,
    autoplay: {
      delay: 3250,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });
});
