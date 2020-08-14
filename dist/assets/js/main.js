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
});
var burger = document.getElementsByClassName("burger")[0];
var menu = document.getElementsByClassName("main__menu")[0];

burger.onclick = function (e) {
  this.classList.toggle("burger-active");
  menu.classList.toggle("main__menu-active");
  document.body.classList.toggle("no-scroll");
  document.html.classList.toggle("no-scroll");
};

menu.onclick = function (e) {
  if (burger.classList.contains("burger-active")) {
    this.classList.toggle("main__menu-active");
    burger.classList.toggle("burger-active");
    document.body.classList.toggle("no-scroll");
    document.html.classList.toggle("no-scroll");
  }
};

$("body").on("click", '[href*="#"]', function (e) {
  var fixed_offset = 0;
  $("html,body").stop().animate({
    scrollTop: $(this.hash).offset().top - fixed_offset
  }, 1000);
  e.preventDefault();
});

window.onload = function () {
  document.body.classList.add("body_visible");
};