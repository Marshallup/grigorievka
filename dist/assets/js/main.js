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
}; // $(document).ready(function () {
//   $('a[href^="#"]').click(function () {
//     var el = $(this).attr("href");
//     $("body").animate(
//       {
//         scrollTop: $(el).offset().top,
//       },
//       2000
//     );
//     return false;
//   });
// });


$("body").on("click", '[href*="#"]', function (e) {
  var fixed_offset = 100;
  $("html,body").stop().animate({
    scrollTop: $(this.hash).offset().top - fixed_offset
  }, 1000);
  e.preventDefault();
});