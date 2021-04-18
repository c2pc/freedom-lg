const DELAY = 4000;
let sliderVisible = false;
let interC2;
let timeoutC2 = 10;
let scaleXFromC2;
let scaleXToC2;
let xC2;

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
        renderProgressbar: function (progressbarFillClass) {
            return '<span class="swiper-pagination-progressbar-fill-mine"></span>';
        },
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

            scaleXFromC2 = realIndex / slidesLength
            scaleXToC2 = (realIndex + 1) / slidesLength
            xC2 = (scaleXToC2 - scaleXFromC2) / (DELAY / timeoutC2)
            InterC2()
        },
    }
});

function InterC2() {
    clearInterval(interC2)
    interC2 = setInterval(() => {
        scaleXFromC2 += xC2
        if (scaleXFromC2 < scaleXToC2)
            $(".swiper-pagination-progressbar-fill-mine").css('transform', `translate3d(0px, 0px, 0px) scaleX(${scaleXFromC2}) scaleY(1)`)
        else
            clearInterval(interC2)
    }, timeoutC2)
}

// При наведении мыши остановить autoplay
$(".transactions__slider").mouseenter(function () {
    transactionsSlider.autoplay.stop();
    clearInterval(interC2)
});

// Запустить autoplay
$(".transactions__slider").mouseleave(function () {
    transactionsSlider.autoplay.start();
    InterC2()
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
        if (!sliderVisible) {
            transactionsSlider.autoplay.start()
            sliderVisible = true
        }
    } else {
        if (sliderVisible) sliderVisible = false
        transactionsSlider.autoplay.stop()
        transactionsSlider.slideToLoop(0);
    }
};

// Запускаем функцию при прокрутке страницы
window.addEventListener('scroll', function () {
    Visible(transactions);
});