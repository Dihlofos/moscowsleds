"use strict";
(function () {
  const slider = document.querySelector(".js-main-slider-container");
  const vw = window.innerWidth;
  //const wrapper = slider.querySelector(".swiper-wrapper");

  // new Swiper(`.js-main-slider-concert`, {
  //   // Optional parameters
  //   slidesPerView: vw > 767 ? 3 : 1,
  //   spaceBetween: 40,
  //   initialSlide: 0,
  //   draggable: false,
  //   pagination: false,
  //   loop: true,
  //   navigation: {
  //     nextEl: ".js-main-next-concert",
  //     prevEl: ".js-main-prev-concert",
  //   },
  // });

  new Swiper(`.js-actions-slider-concert`, {
    // Optional parameters
    slidesPerView: vw > 767 ? 3 : 1,
    spaceBetween: 40,
    initialSlide: 0,
    draggable: false,
    pagination: false,
    loop: true,
    navigation: {
      nextEl: ".js-actions-next-concert",
      prevEl: ".js-actions-prev-concert",
    },
  });
})();
