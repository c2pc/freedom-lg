const DELAY = 4000;
let sliderVisible = false;

const transactionsSlider = new Swiper('.transactions__slider', {
  speed: 500,
  loop: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: '.transactions__slider_pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.transactions__slider_next',
    prevEl: '.transactions__slider_prev',
  },
  autoplay: {
    delay: DELAY,
    disableOnInteraction: false,
    stopOnLastSlide: true
  },
  on: {
    slideChange: function ({realIndex, slides}) {
      const slidesLength = slides.length - 2;
      // выводим номер активного слайда и общее кол-во
      $(".activeslide").html(realIndex + 1);
      $(".totalslide").html(slidesLength);
    },
  }
});

// При наведении мыши остановить autoplay
$(".transactions__slider").mouseenter(function() {
  transactionsSlider.autoplay.stop();
});

// Запустить autoplay
$(".transactions__slider").mouseleave(function() {
  transactionsSlider.autoplay.start();
});


// отследить появление элемента в области видимости браузера
var Visible = function (target) {
  // Все позиции элемента
  var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

  if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {
    // Если элемент полностью виден
    if(!sliderVisible) {
      transactionsSlider.autoplay.start()
      sliderVisible = true
    }
  } else {
    if(sliderVisible) sliderVisible = false
    transactionsSlider.autoplay.stop()
    transactionsSlider.slideToLoop(0);
  }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
  Visible(transactions);
});