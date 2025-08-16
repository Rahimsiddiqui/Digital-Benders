window.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper:not(.custom-swiper)", {
    slidesPerView: 4,
    spaceBetween: 10, // gap between images
    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 1,
    },
    grabCursor: true,
    autoplay: {
      delay: 2000, // 2 seconds per slide
      disableOnInteraction: false, // keep autoplay after dragging
    },
    speed: 500, // smooth transition speed
    loop: true, // infinite loop
  });

  new Swiper(".custom-swiper", {
    slidesPerView: 3,
    spaceBetween: 20, // gap between slides
    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 1,
    },
    grabCursor: true,
    autoplay: {
      delay: 2000, // 2 seconds per slide
      disableOnInteraction: false, // keep autoplay after dragging
    },
    speed: 500, // smooth transition speed
    loop: true,
  });
});
