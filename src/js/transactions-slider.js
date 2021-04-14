// слайдер - сделки
let scaleX = 0;
let timerId = null;
const delay = 4000; // Время активности одного слайда
const swiperPaginationProgressbarFill = document.querySelector('.swiper-pagination-progressbar-fill');
const transactionsSliderContainer = document.getElementById('transactionsSliderContainer');
const transactions = document.getElementById('transactions');

// При наведении курсора на слайдер остановить автовоспроизведение и таймер (слайдер - сделки)
transactionsSliderContainer.onmouseover = transactionsSliderContainer.onmouseout = function (event) {
  if (event.type === 'mouseover') {
    clearInterval(timerId);
    transactionsSlider.autoplay.stop();
  }
  if (event.type === 'mouseout') {
    sliderTimerProgress()
    transactionsSlider.autoplay.start();
  }
}

// Заполнение строки прогресса (зеленая строка)
function sliderTimerProgress() {
  if(timerId) clearInterval(timerId);
  timerId = setInterval(frame, 50);
  function frame() {
    if (scaleX >= 1) {
      clearInterval(timerId);
    } else {
      const step = 1 / ((transactionsSlider.slides.length * delay) / 50)
      scaleX += step;
      swiperPaginationProgressbarFill.style.transform = `translate3d(0px, 0px, 0px) scaleX(${scaleX}) scaleY(1)`;
    }
  }
}

// Инициализация слайдера "сделки"
const transactionsSlider = new Swiper('.transactions__slider', {
  speed: 500,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: delay,
    disableOnInteraction: false,
    stopOnLastSlide: true
  },
  navigation: {
    nextEl: '.transactions__slider_next',
    prevEl: '.transactions__slider_prev',
  },
  on: {
    afterInit: sliderTimerProgress,
    slideChange: function ({previousIndex, realIndex}) {
      const step = 1 / transactionsSlider.slides.length;

      if(previousIndex < realIndex) {
        if(scaleX < transactionsSlider.realIndex * step) {
          scaleX = transactionsSlider.realIndex * step;
        }
      } else {
        scaleX = transactionsSlider.realIndex * step;
      }
      sliderTimerProgress()
    }
  }
})

// выводим номер активного слайда и общее кол-во
transactionsSlider.on('slideChange', function () {
  $(".activeslide").html(transactionsSlider.realIndex + 1);
  $(".totalslide").html(transactionsSlider.slides.length);
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
    // Если элемент полностью видно
    scaleX = 0
    transactionsSlider.autoplay.start()
  } else {
    scaleX = 0
    transactionsSlider.autoplay.stop()
  }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function() {
  Visible(transactions);
});

// А также запустим функцию сразу. А то вдруг, элемент изначально видно
Visible(transactions);