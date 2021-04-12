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


  // При клике по форме открыть модальное окно. В дальнейшем переделать так чтобы окно открывалось после успешной отправки письма
  $("#submitApplication").click(function() {
    //открыть модальное окно с id="myModal"
    $("#emailSentModal").modal('show');
  });

  // Открыть боковое модальное окно
  const topbarBack = document.getElementById('topbarBack');
  const sideModalCloseBtn = document.querySelectorAll('.sideModal__close-btn');
  const sideModalMdClose = document.getElementById('sideModalMdClose');
  let sideModal = null;

  function hideSideMenu() {
    topbarBack.classList.remove('topbar__back--active');
    body.className = '';
    sideModal.classList.remove('sideModal__wrap--open')
  }

  function showSideModal(modal) {
    topbarBack.classList.toggle('topbar__back--active')
    body.classList.toggle('sideModalActive')
    modal.classList.toggle('sideModal__wrap--open')
  }

  // Закрыть бокавую модалку при нажатии на пустую область
  topbarBack.addEventListener('click', hideSideMenu)
  // Закрыть бокавую модалку при нажатии на кнопку
  sideModalCloseBtn.forEach(item => item.addEventListener('click', hideSideMenu))
  sideModalMdClose.addEventListener('click', hideSideMenu)

  // Елементы у которых есть модалки
  const sideModalItems = document.querySelectorAll('[data-sidemodal]')

  sideModalItems.forEach(item => {
    item.addEventListener('click', e => {
      sideModal = document.getElementById(item.dataset.sidemodal);
      showSideModal(sideModal)
    })
  })

  // Плавный скролл по якорю
  $('a').on('click', function(e) {
    // prevent default anchor click behavior
    e.preventDefault();
    // store hash
    var hash = this.hash;

    if ($(hash).length) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function() {
        // Do something fun if you want!
      });
    }
  });

});