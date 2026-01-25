"use strict";
(function () {
  // let upButton = document.querySelector(".up");
  // if (upButton) {
  //   window.onscroll = function () {
  //     if (window.pageYOffset > 260) {
  //       upButton.classList.add("up--shown");
  //     } else {
  //       upButton.classList.remove("up--shown");
  //     }
  //   };
  // }
})();

"use strict";
(function () {
  const key = "shotgun-cookie-modal-shown";
  let modal = document.querySelector(".js-cookie");

  if (!modal) {
    return;
  }

  let closeButton = modal.querySelector(".js-cookie-close");

  if (!window.localStorage.getItem(key)) {
    modal.classList.remove("hidden");
  }

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.localStorage.setItem(key, true);
  });
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  const showMoreButton = document.querySelector(".js-faq-show-more");
  const moreContent = document.querySelector(".js-more");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.parentNode.classList.toggle("active");
    });
  });

  if (!showMoreButton) {
    return;
  }

  showMoreButton.addEventListener("click", () => {
    moreContent.classList.add("show");
    showMoreButton.classList.add("hidden");
  });
})();

"use strict";
(function () {
  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");
  const bullitItems = document.querySelectorAll(".js-bullit");
  const luzhnikiMap = document.querySelector(".js-map-luzh");
  const vw = window.innerWidth;

  const figures = map.querySelectorAll(".figure");

  const luzhnikiNumber = 160;

  const locations = {
    1: {
      title: "Соревнования",
      time: "13:30–16:30",
    },
    2: {
      title: "Сцена",
      time: "12:00–18:00",
    },
    3: {
      title: "Активности",
      time: "Время",
    },
    4: {
      title: "Полевая кухня",
      time: "Время",
    },
    5: {
      title: "Зона отдыха",
      time: "Время",
    },
    6: {
      title: "Блинная",
      time: "Время",
    },
  };

  setTimeout(() => {
    mapScroller?.scroll({ left: 135 });
  }, 500);

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure);
    });
  });

  modalGoTo.addEventListener("click", () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  });

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  init();

  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter("locationId");
    const artObjectLinks = document.querySelectorAll(".js-art-object-link");
    if (locationNumber) {
      setTimeout(() => {
        onGoToLocation(locationNumber);
      }, 0);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      });
    });

    bullitItems.forEach((item) => {
      item.addEventListener("click", (el) => {
        onGoToLocation(el.currentTarget.dataset.locationId);
      });
    });
  }

  function onFigureClick(figure, event) {
    modalGoTo.classList.remove("is-hidden");
    const locationNumber = figure.classList[1].split("_")[1];
    let idList = vw < 768 ? `legend-item-${locationNumber}` : "map-list";
    let mapOffset =
      document.getElementById(idList).getBoundingClientRect().top +
      document.documentElement.scrollTop -
      100;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`,
    );

    const clickOnJsScroll = event?.target?.classList.contains("js-scroll");

    if (!clickOnJsScroll) {
      window.scroll.animateScroll(mapOffset);
    }

    if (clickOnJsScroll) {
      resetFigures();
      resetLegends();
      return;
    }

    if (figure.classList.contains("is-active")) {
      resetFigures();
      resetLegends();
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add("is-active");
      if (legendItem) {
        legendItem.classList.add("is-active");
      }
      // if (Number(locationNumber) === luzhnikiNumber) {
      //   luzhnikiMap.querySelector(".content_1").classList.add("content-active");
      // }
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove("is-active");
    });
  }

  function resetLegends() {
    const legends = document.querySelectorAll(".js-legend-item");
    legends.forEach((legend) => {
      legend.classList.remove("is-active");
    });
    // luzhnikiMap.querySelector(".content_1").classList.remove("content-active");
  }

  function onGoToLocation() {
    //
  }

  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  function fillLegendList() {
    const container = document.querySelector(".js-legend-list");
    const locationsArray = Object.entries(locations);

    locationsArray.forEach(([index, value]) => {
      const { title, time, link } = value;
      const figure = document.querySelector(`.figure_${index}`);
      // не показываем локации, которых нет на карте.
      if (!figure) return;

      const itemLi = document.createElement("li");
      const itemSpan = document.createElement("span");
      const itemP = document.createElement("p");
      const itemTime = document.createElement("time");

      itemLi.classList.add("map__list-item");
      itemLi.classList.add("js-legend-item");
      itemLi.dataset["legendItemId"] = index;
      itemLi.id = `legend-item-${index}`;

      itemLi.addEventListener("click", function (event) {
        onFigureClick(figure, event);
      });

      itemSpan.textContent = `${index}`;
      itemP.textContent = title;
      itemTime.textContent = time;
      itemP.prepend(itemSpan);
      itemLi.append(itemP);
      itemLi.append(itemTime);
      container.append(itemLi);
    });
  }
})();

"use strict";
(function () {
  const map = document.querySelector(".js-map");
  const container = map.querySelector(".js-map-tabs");
  const tabs = container.querySelectorAll(".js-tab");
  const contents = map.querySelectorAll(".js-tab-content");
  const route = document.querySelector(".js-route");

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
})();

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButton.addEventListener('click', () => {
    closeNav();
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

"use strict";
(function () {
  const slider = document.querySelector(".js-main-slider-container");
  const vw = window.innerWidth;
  const wrapper = slider.querySelector(".swiper-wrapper");

  new Swiper(`.js-main-slider-concert`, {
    // Optional parameters
    slidesPerView: vw > 1024 ? 3 : 1,
    spaceBetween: 40,
    initialSlide: 0,
    draggable: false,
    pagination: false,
    loop: true,
    navigation: {
      nextEl: ".js-main-next-concert",
      prevEl: ".js-main-prev-concert",
    },
  });

  new Swiper(`.js-actions-slider-concert`, {
    // Optional parameters
    slidesPerView: vw > 1024 ? 3 : 1,
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

"use strict";
(function () {
  const vw = window.innerWidth;
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
    offset: vw < 767 ? 100 : 180,
  });
})();
