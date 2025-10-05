document.addEventListener("DOMContentLoaded", function () {
  // Styles For Hero Swiper
  new Swiper(".hero__swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
      delay: 1750,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    breakpoints: {
      480: { slidesPerView: 2 },
      778: { slidesPerView: 3 },
      1200: { slidesPerView: 5 },
    },
  });

  // Style For Case Studes Swiper
  new Swiper(".case-studies__swiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 17,
    grabCursor: true,
    autoplay: {
      delay: 1750,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    breakpoints: {
      768: {
        centeredSlides: false,
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  // Style For Recent Articles Swiper
  new Swiper(".recent-articles__swiper", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 17,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    speed: 1000,
    loop: true,
  });
});
