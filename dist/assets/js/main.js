"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var browser = get_name_browser(); // ПОДКЛЮЧЕНИЕ МАСКИ ДЛЯ ФОРМЫ ТЕЛЕФОНА

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/

!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (a) {
  var b,
      c = navigator.userAgent,
      d = /iphone/i.test(c),
      e = /chrome/i.test(c),
      f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function caret(a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      });
    },
    unmask: function unmask() {
      return this.trigger("unmask");
    },
    mask: function mask(c, g) {
      var h, i, j, k, l, m, n, o;

      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0;
      }

      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++) {
              if (j[a] && C[a] === p(a)) return;
            }

            g.completed.call(B);
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
        }

        function q(a) {
          for (; ++a < n && !j[a];) {
            ;
          }

          return a;
        }

        function r(a) {
          for (; --a >= 0 && !j[a];) {
            ;
          }

          return a;
        }

        function s(a, b) {
          var c, d;

          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++) {
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d);
              }
            }

            z(), B.caret(Math.max(l, a));
          }
        }

        function t(a) {
          var b, c, d, e;

          for (b = a, c = p(a); n > b; b++) {
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e;
            }
          }
        }

        function u() {
          var a = B.val(),
              b = B.caret();

          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) {
              b.begin--;
            }

            if (0 === b.begin) for (; b.begin < l && !j[b.begin];) {
              b.begin++;
            }
            B.caret(b.begin, b.begin);
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) {
              b.begin++;
            }

            B.caret(b.begin, b.begin);
          }

          h();
        }

        function v() {
          A(), B.val() != E && B.change();
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b,
                c,
                e,
                f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c,
                d,
                e,
                g = b.which || b.keyCode,
                i = B.caret();

            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function k() {
                    a.proxy(a.fn.caret, B, e)();
                  };

                  setTimeout(k, 0);
                } else B.caret(e);

                i.begin <= m && h();
              }

              b.preventDefault();
            }
          }
        }

        function y(a, b) {
          var c;

          for (c = a; b > c && n > c; c++) {
            j[c] && (C[c] = p(c));
          }
        }

        function z() {
          B.val(C.join(""));
        }

        function A(a) {
          var b,
              c,
              d,
              e = B.val(),
              f = -1;

          for (b = 0, d = 0; n > b; b++) {
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;) {
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break;
                }
              }

              if (d > e.length) {
                y(b + 1, n);
                break;
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          }

          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
        }

        var B = a(this),
            C = a.map(c.split(""), function (a, b) {
          return "?" != a ? i[a] ? p(b) : a : void 0;
        }),
            D = C.join(""),
            E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null;
          }).join("");
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName);
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
            }, 10);
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h();
          }, 0);
        }), e && f && B.off("input.mask").on("input.mask", u), A();
      });
    }
  });
}); // НАСТРОЙКА МАСКИ ДЛЯ ТЕЛЕФОНА, ВАЛИДАЦИЯ ФОРМЫ, AJAX ОБРАБОТКА ФОРМЫ

$(document).ready(function () {
  $("#gr-form").validate({
    submitHandler: function submitHandler(form) {
      //Change
      $(".contacts__right_button").prop("disabled", true);
      $(".modal").addClass("modal-flex");
      setTimeout(function () {
        $(".modal").addClass("modal-visible");
      }, 100);
      var th = $(form);
      $.ajax({
        type: "POST",
        url: "mail.php",
        //Change
        data: th.serialize()
      }).done(function () {
        setTimeout(function () {
          // Done Functions
          $(".modal").removeClass("modal-visible");
          setTimeout(function () {
            $(".modal").removeClass("modal-flex");
          }, 700);
          th.trigger("reset");
        }, 2000);
      });
      return false;
    },
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      message: {
        required: true,
        minlength: 4
      }
    },
    messages: {
      name: {
        required: "Поле 'Имя' обязательно к заполнению",
        minlength: "Введите не менее 2-х символов в поле 'Имя'"
      },
      email: {
        required: "Поле 'Email' обязательно к заполнению",
        email: "Необходим формат адреса email"
      },
      phone: "Поле 'Телефон' обязательно к заполнению",
      message: {
        required: "Поле 'Сообщение' обязательно к заполнению",
        minlength: "Введите не менее 4-х символов в поле 'Сообщение'"
      }
    }
  });
  $("#phone-form").mask("+7(999) 999-99-99");
}); // ЛИПКОЕ МЕНЮ
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