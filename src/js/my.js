document.addEventListener("DOMContentLoaded", () => {

  // При открытии моб. меню добавить CSS класс к body
  const headerNavbarToggler = document.getElementById('headerNavbarToggler');
  const body = document.querySelector('body');

  if(headerNavbarToggler && body) {
    headerNavbarToggler.addEventListener('click', () => {
      body.classList.toggle('menuActive')
    })
  }

  // слайдер - приоритетеные сектора
  new Swiper('.sectorBlock__slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    grabCursor: true,
    navigation: {
      nextEl: '.sectorBlock__slider_next',
      prevEl: '.sectorBlock__slider_prev',
    },
    breakpoints: {
      500: {
        spaceBetween: 40,
      },

      320: {
        spaceBetween: 24,
      },
    }
  })

  // слайдер - сделки
  new Swiper('.transactions__slider', {
    speed: 500,
    renderProgressbar: function (progressbarFillClass) {
      return '<span className="' + progressbarFillClass + '"></span>';
    },
    pagination: {
      el: '.transactions__slider_pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.transactions__slider_next',
      prevEl: '.transactions__slider_prev',
    },
  })

  // слайдер - аналитики
  new Swiper('.analytics__slider', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    grabCursor: true,
    navigation: {
      nextEl: '.analytics__slider_next',
      prevEl: '.analytics__slider_prev',
    },
    breakpoints: {
      500: {
        spaceBetween: 40,
      },

      320: {
        spaceBetween: 24,
      },
    }
  })

  // слайдер - команда (моб)
  new Swiper('.team__mobile_slider', {
    slidesPerView: 'auto',
    grabCursor: true,
    breakpoints: {
      500: {
        spaceBetween: 40,
      },

      320: {
        spaceBetween: 24,
      },
    }
  })

});