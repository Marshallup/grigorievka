$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 465,
        settings: "unslick",
      },
    ],
  });
});

// ЗАПРЕТ СКРОЛЛА ПРИ МОБИЛЬНОМ МЕНЮ
let burger = document.getElementsByClassName("burger")[0];
let menu = document.getElementsByClassName("main__menu")[0];

burger.onclick = function () {
  this.classList.toggle("burger-active");
  menu.classList.toggle("main__menu-active");
  document.body.classList.toggle("no-scroll");
};

menu.onclick = function () {
  if (burger.classList.contains("burger-active")) {
    this.classList.toggle("main__menu-active");
    burger.classList.toggle("burger-active");
    document.body.classList.toggle("no-scroll");
  }
};

// ПЛАВНЫЙ ПЕРЕХОД ПО ССЫЛКАМ

$("body").on("click", '[href*="#"]', function (e) {
  // 79 - ВЫСОТА ЛИПКОГО МЕНЮ
  var fixed_offset = 79;
  $("html,body")
    .stop()
    .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});
$(".gr__button_main").on("click", function (e) {
  $("html,body")
    .stop()
    .animate({ scrollTop: $("#about").offset().top }, 1000);
});

// ПРЕЛОАДЕР

let seconds = 0;

let timer = setInterval(function () {
  seconds++;
}, 10);

let img = document.querySelector(".preloader__wrap").querySelectorAll("img");
for (let i = 0; i < img.length; i++) {
  let k = new Image();
  k.src = img[i].src;
  k.onload = () => {
    img[i].classList.add("preloader__img_show");
  };
}

window.onload = () => {
  if (seconds <= 500) {
    setTimeout(animPreloader, 3000);
  } else {
    animPreloader();
  }
};

function animPreloader() {
  clearInterval(timer);
  document.querySelector(".preloader__wrap").classList.add("preloader__hide");
  document.body.classList.remove("no-scroll");
  setTimeout(function () {
    document.querySelector(".preloader__wrap").remove();

    //  АНИМАЦИИ ПРИ СКРОЛЛЕ

    let animItems = document.querySelectorAll(".anim-items");

    if (animItems.length > 0) {
      window.addEventListener("scroll", animOnScroll);
      function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
          const animItem = animItems[i];
          const animItemHeight = animItem.offsetHeight;
          const animItemOffset = offset(animItem).top;
          const animStart = 4;

          let animItemPoint = window.innerHeight - animItemHeight / animStart;
          if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
          }

          if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
          ) {
            animItem.classList.add("anim-active");
          } else {
            animItem.classList.remove("anim-active");
          }
        }
      }

      animOnScroll();
    }
  }, 800);
}

// ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ ЗНАЧЕНИЯ ВЕРХ И ЛЕВО ЭЛЕМЕНТА ДЛЯ ВСЕХ БРАУЗЕРОВ
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

// ЛИПКОЕ МЕНЮ
const header = document.querySelector(".main__header");
const sectionAboutTitle = document.getElementById("about__title");

window.addEventListener("scroll", function () {
  if (pageYOffset >= offset(sectionAboutTitle).top) {
    header.classList.add("main__header-sticky");
  } else {
    header.classList.remove("main__header-sticky");
  }
});

// let numbers = document.querySelectorAll(".numbers__wrap_numeric");
// let number = 0;
// let text = numbers[0].textContent;

// setTimeout(function dd() {
//   if (number < text) {
//     number++;
//     numbers[0].innerHTML = number;
//     setTimeout(dd, 500);
//   } else {
//     clearTimeout(dd);
//   }
// }, 500);

// window.addEventListener("scroll");

// function animCount(elem, delay) {
//   let text = document.querySelector(".numbers__wrap_numeric").textContent;
//   let number = 0;

//   const animCountHeight = document.querySelector(".numbers__wrap_numeric")
//     .offsetHeight;
//   const animCountOffset = offset(
//     document.querySelector(".numbers__wrap_numeric")
//   ).top;
//   const animCountStart = 4;

//   let animCountPoint = window.innerHeight - animCountHeight / animCountStart;
//   if (animCountHeight > window.innerHeight) {
//     animCountPoint = window.innerHeight - window.innerHeight / animCountStart;
//   }

//   if (
//     pageYOffset > animCountOffset - animCountPoint &&
//     pageYOffset < animCountOffset + animCountHeight
//   ) {
//     setTimeout(function countTimer() {
//       if (number < text) {
//         number++;
//         document.querySelector(".numbers__wrap_numeric").innerHTML = number;
//         setTimeout(countTimer, 500);
//       } else {
//         clearTimeout(countTimer);
//       }
//     }, 500);
//   }
// }

// ПАРАЛАКС ЭФФЕКТ ДЛЯ ЛОГОТИПА НА ГЛАВНОМ ЭКРАНЕ

// $(document).ready(function () {
//   var banner = $(".banner");
//   var imgs = $(".img");
//   // /////////////////////////////////////////////////////////////
//   function showAllObjects(object) {
//     object.fadeIn(900);
//   }
//   // /////////////////////////////////////////////////////////////
//   function moving(object, speed) {
//     banner.on("mousemove", function (event) {
//       var X = Math.floor(event.pageX / speed - 20) + "px";
//       var Y = Math.floor(event.pageY / speed) + "px";
//       object.css("transform", "translate(" + X + " , " + Y + ")");
//     });
//   }
//   // /////////////////////////////////////////////////////////////
//   function moveAll(object) {
//     moving($(object[0]), 110);
//     moving($(object[1]), 22);
//     // moving($(object[2]), 8);
//     // moving($(object[3]), 10);
//     // moving($(object[4]), 20);
//   }
//   // /////////////////////////////////////////////////////////////
//   showAllObjects(imgs);
//   moveAll(imgs);
//   // /////////////////////////////////////////////////////////////
// });
