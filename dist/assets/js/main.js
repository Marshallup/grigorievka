"use strict";

$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    slidesToShow: 3,
    responsive: [{
      breakpoint: 1199,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 465,
      settings: "unslick"
    }]
  });
}); // ЗАПРЕТ СКРОЛЛА ПРИ МОБИЛЬНОМ МЕНЮ

var burger = document.getElementsByClassName("burger")[0];
var menu = document.getElementsByClassName("main__menu")[0];

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
}; // ПЛАВНЫЙ ПЕРЕХОД ПО ССЫЛКАМ


$("body").on("click", '[href*="#"]', function (e) {
  var fixed_offset = 0;
  $("html,body").stop().animate({
    scrollTop: $(this.hash).offset().top - fixed_offset
  }, 1000);
  e.preventDefault();
});
$(".gr__button_main").on("click", function (e) {
  $("html,body").stop().animate({
    scrollTop: $("#about").offset().top
  }, 1000);
}); // ПРЕЛОАДЕР

var seconds = 0;
var timer = setInterval(function () {
  seconds++;
}, 10);
var img = document.querySelector(".preloader__wrap").querySelectorAll("img");

var _loop = function _loop(i) {
  var k = new Image();
  k.src = img[i].src;

  k.onload = function () {
    img[i].classList.add("preloader__img_show");
  };
};

for (var i = 0; i < img.length; i++) {
  _loop(i);
}

window.onload = function () {
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
    if (browser == "Edge" || browser == "Internet Explorer") {
      document.body.removeChild(document.querySelector(".preloader__wrap"));
    } else {
      document.querySelector(".preloader__wrap").remove();
    } //  АНИМАЦИИ ПРИ СКРОЛЛЕ


    var animItems = document.querySelectorAll(".anim-items");

    if (animItems.length > 0) {
      var animOnScroll = function animOnScroll() {
        for (var _i = 0; _i < animItems.length; _i++) {
          var animItem = animItems[_i];
          var animItemHeight = animItem.offsetHeight;
          var animItemOffset = offset(animItem).top;
          var animStart = 4;
          var animItemPoint = window.innerHeight - animItemHeight / animStart;

          if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
          }

          if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
            animItem.classList.add("anim-active");
          } else {
            animItem.classList.remove("anim-active");
          }
        }
      };

      window.addEventListener("scroll", animOnScroll);
      animOnScroll();
    }
  }, 800);
} // ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ ЗНАЧЕНИЯ ВЕРХ И ЛЕВО ЭЛЕМЕНТА ДЛЯ ВСЕХ БРАУЗЕРОВ


function offset(el) {
  var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
} // ПОДКЛЮЧЕНИЕ ПЛАГИНА ДЛЯ АНИМИРОВАННОГО СЧЁТЧИКА


!function (t) {
  t.extend(t.easing, {
    spincrementEasing: function spincrementEasing(t, a, e, n, r) {
      return a === r ? e + n : n * (-Math.pow(2, -10 * a / r) + 1) + e;
    }
  }), t.fn.spincrement = function (a) {
    function e(t, a) {
      if (t = t.toFixed(a), a > 0 && "." !== r.decimalPoint && (t = t.replace(".", r.decimalPoint)), r.thousandSeparator) for (; o.test(t);) {
        t = t.replace(o, "$1" + r.thousandSeparator + "$2");
      }
      return t;
    }

    var n = {
      from: 0,
      to: null,
      decimalPlaces: null,
      decimalPoint: ".",
      thousandSeparator: ",",
      duration: 1e3,
      leeway: 50,
      easing: "spincrementEasing",
      fade: !0,
      complete: null
    },
        r = t.extend(n, a),
        o = new RegExp(/^(-?[0-9]+)([0-9]{3})/);
    return this.each(function () {
      var a = t(this),
          n = r.from;
      a.attr("data-from") && (n = parseFloat(a.attr("data-from")));
      var o;
      if (a.attr("data-to")) o = parseFloat(a.attr("data-to"));else if (null !== r.to) o = r.to;else {
        var i = t.inArray(r.thousandSeparator, ["\\", "^", "$", "*", "+", "?", "."]) > -1 ? "\\" + r.thousandSeparator : r.thousandSeparator,
            l = new RegExp(i, "g");
        o = parseFloat(a.text().replace(l, ""));
      }
      var c = r.duration;
      r.leeway && (c += Math.round(r.duration * (2 * Math.random() - 1) * r.leeway / 100));
      var s;
      if (a.attr("data-dp")) s = parseInt(a.attr("data-dp"), 10);else if (null !== r.decimalPlaces) s = r.decimalPlaces;else {
        var d = a.text().indexOf(r.decimalPoint);
        s = d > -1 ? a.text().length - (d + 1) : 0;
      }
      a.css("counter", n), r.fade && a.css("opacity", 0), a.animate({
        counter: o,
        opacity: 1
      }, {
        easing: r.easing,
        duration: c,
        step: function step(t) {
          a.html(e(t * o, s));
        },
        complete: function complete() {
          a.css("counter", null), a.html(e(o, s)), r.complete && r.complete(a);
        }
      });
    });
  };
}(jQuery); // АНИМАЦИЯ ЦИФР

$(document).ready(function () {
  $(window).on("scroll load resize", function () {
    screenPoint(".numbers__wrap_block", 100, true, function () {
      $(".numbers__wrap_numeric").spincrement({
        from: 0,
        to: null,
        thousandSeparator: " ",
        duration: 900,
        fade: true
      });
    });
  });
  var show = true;

  function screenPoint(elem, offseteder, infiniter, callback) {
    var infinit = infiniter;
    var countbox = elem;
    var offseted = offseteder;

    var func = callback || function () {};

    var w_top = $(window).scrollTop();
    var w_height = $(window).height();
    var e_top = $(countbox).offset().top;
    var e_height = $(countbox).outerHeight();

    if (infinit) {
      if (w_top + w_height < e_top && show == false || w_top > e_top + e_height && show == false) {
        show = true;
      }
    }

    if (!show) return false;

    if (w_top + w_height - offseted >= e_top && w_top + offseted < e_top + e_height) {
      func();
      show = false;
    }
  }
}); // ОПРЕДЕЛЕНИЕ БРАУЗЕРА

function get_name_browser() {
  var ua = navigator.userAgent;
  if (ua.search(/YaBrowser/) > 0) return "Яндекс Браузер";
  if (ua.search(/rv:11.0/) > 0) return "Internet Explorer";
  if (ua.search(/MSIE/) > 0) return "Internet Explorer";
  if (ua.search(/Edge/) > 0) return "Edge";
  if (ua.search(/Chrome/) > 0) return "Google Chrome";
  if (ua.search(/Firefox/) > 0) return "Firefox";
  if (ua.search(/Opera/) > 0) return "Opera";
  if (ua.search(/Safari/) > 0) return "Safari";
  return "Не определен";
}

var browser = get_name_browser(); // ЛИПКОЕ МЕНЮ
// const header = document.querySelector(".main__header");
// const sectionAboutTitle = document.getElementById("about__title");
// window.addEventListener("scroll", function () {
//   if (pageYOffset >= offset(sectionAboutTitle).top) {
//     header.classList.add("main__header-sticky");
//   } else {
//     header.classList.remove("main__header-sticky");
//   }
// });
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