"use strict";
(function () {
  const map = document.querySelector(".js-map");
  const container = map.querySelector(".js-map-tabs");
  const tabs = container.querySelectorAll(".js-tab");
  const contents = map.querySelectorAll(".js-tab-content");
  const route = document.querySelector(".js-route");
  const mapScrollers = document.querySelectorAll(".js-map-scroll");

  const links = {
    luzhniki: "https://yandex.ru/maps/-/CLtxFHk7",
    krilatskoe: "https://yandex.ru/maps/-/CLtxF47U",
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (el) => {
      resetTabs();
      el.currentTarget.classList.add("is-active");
      const tabTarget = el.currentTarget.dataset.tab;
      const targetContent = map.querySelector(
        `[data-tab-content=${tabTarget}]`,
      );
      targetContent.classList.add("is-active");
      route.href = links[tabTarget];

      doScroll();
    });
  });

  function resetTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });

    contents.forEach((content) => {
      content.classList.remove("is-active");
    });
  }

  function doScroll() {
    mapScrollers.forEach((scroller) => {
      //scroller.scroll({ left: 100 });
    });
  }
})();
