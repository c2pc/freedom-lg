document.addEventListener("DOMContentLoaded", () => {

  // При открытии моб. меню добавить CSS класс к body
  const headerNavbarToggler = document.getElementById('headerNavbarToggler');
  const body = document.querySelector('body');
  const navLinks = document.querySelectorAll('.nav-link');

  if(headerNavbarToggler && body) {
    headerNavbarToggler.addEventListener('click', () => {
      body.classList.toggle('menuActive')
    })
  }

  if(navLinks) {
    navLinks.forEach(item => {
      item.addEventListener('click', () => {
        body.classList.remove('menuActive')
      })
    })
  }


  // слайдер - приоритетеные сектора
  new Swiper('.sectorBlock__slider', {
    slidesPerView: 'auto',
    grabCursor: true,
    loop: true,
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
  const transactionsSlider = new Swiper('.transactions__slider', {
    speed: 500,
    loop: true,
    pagination: {
      el: '.transactions__slider_pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.transactions__slider_next',
      prevEl: '.transactions__slider_prev',
    },
  })

  // слайдер - сделки - номер активного слайда и общее кол-во
  transactionsSlider.on('slideChange', function () {
    $(".activeslide").html(transactionsSlider.realIndex + 1);
    $(".totalslide").html(transactionsSlider.slides.length - 2);
  });

  // слайдер - аналитики
  new Swiper('.analytics__slider', {
    slidesPerView: 'auto',
    grabCursor: true,
    loop: true,
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
    loop: true,
    breakpoints: {
      500: {
        spaceBetween: 40,
      },
      320: {
        spaceBetween: 24,
      },
    }
  })


  // При клике по кнопке "отправить" открыть модальное окно (для примера). В дальнейшем переделать так чтобы окно открывалось после успешной отправки письма
  $("#formSubmitBtn").click(function(e) {
    e.preventDefault();
    //открыть модальное окно с id="emailSentModal"
    $("#emailSentModal").modal('show');
  });

  // Плавный скролл по якорю
  $('a').on('click', function(e) {
    e.preventDefault();
    const hash = this.hash;

    if ($(hash).length) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500);
    }
  });

  // Открыть боковое модальное окно
  const topbarBack = document.getElementById('topbarBack');
  const sideModalCloseBtn = document.querySelectorAll('.sideModal__close-btn'); // кнопка закрыть  в мобильной версии
  const sideModalMdClose = document.getElementById('sideModalMdClose'); // кнопка закрыть  в десктопной версии
  let sideModal = null;

  // скрыть боковое модальное окно
  function hideSideMenu() {
    topbarBack.classList.remove('topbar__back--active');
    body.className = '';
    sideModal.classList.remove('sideModal__wrap--open')
  }

  // показать боковое модальное окно
  function showSideModal(modal) {
    topbarBack.classList.toggle('topbar__back--active')
    body.classList.toggle('sideModalActive')
    modal.classList.toggle('sideModal__wrap--open')
  }

  // Закрыть боковое модальное окно при нажатии на пустую область
  topbarBack.addEventListener('click', hideSideMenu)
  // Закрыть боковое модальное окно при нажатии на кнопку "X"
  sideModalCloseBtn.forEach(item => item.addEventListener('click', hideSideMenu)) // закрыть модальное окно в мобильной версии
  sideModalMdClose.addEventListener('click', hideSideMenu) // // закрыть модальное окно в десктопной версии

  // Елементы при клике по которым необходимо открыть боковое модальное окно. То есть елементы для которых задан дата атрибут "data-sidemodal"
  const sideModalItems = document.querySelectorAll('[data-sidemodal]')

  // Получаем значение дата атрибута "data-sidemodal" (значением является id модального окна, которое необходимо показать)
  // по значению дата атрибута "data-sidemodal" находим соответствующее модальное окно и запускаем
  sideModalItems.forEach(item => {
    item.addEventListener('click', () => {
      sideModal = document.getElementById(item.dataset.sidemodal);
      showSideModal(sideModal)
    })
  })

  // Форма "Свяжитесь с нами"
  // Если не выбран первый checkbox сделать не активной кнопку "Отправить"
  const privacyPolicy = document.getElementById('privacy-policy');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if(privacyPolicy && formSubmitBtn) {
    privacyPolicy.addEventListener('change', () => {
      formSubmitBtn.disabled = !privacyPolicy.checked // Если не выбран первый checkbox делаем кнопку не активной
    })
  }


});