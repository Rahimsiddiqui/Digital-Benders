new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  freeMode: {
    enabled: true,
    momentum: true,
    momentumRatio: 1,
  },
  grabCursor: true,
  autoplay: {
    delay: 1750,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: { slidesPerView: 2 },
    778: { slidesPerView: 3 },
    1200: { slidesPerView: 5 },
  },
  speed: 500,
  loop: true,
});
