(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict


$(".myFilter").keyup(function () {
  val = $.trim(this.value);
  if (val == "") {
    $('.myfilter').show();
  } else {
    $('.myfilter').hide();
    $(".myfilter:contains(" + val + ")").show();
  }
});

$(function () {

  $(".myFilter").keyup(function () {

    var searchText = $(this).val().toUpperCase();

    $('.myfilter').each(function () {

      var currentLiText = $(this).text().toUpperCase(),
        showCurrentLi = currentLiText.indexOf(searchText) !== -1;

      $(this).toggle(showCurrentLi);

    });

  });

});

let fechado = localStorage.getItem("fechado");
console.log(fechado)
$(window).on("load", fazIsto)



function fazIsto() {

  if (document.getElementById("rec12") !== null && document.getElementById("ajustarDm") !== null) {
    if (fechado == 0 || fechado == null) {

      document.getElementById("opendoor").checked = true;
      document.getElementById("opendoor2").style.backgroundColor = "transparent";
      document.getElementById("ajustarDm").style.transition = "0.5s";
      document.getElementById("rec12").style.transition = "none";
      document.getElementById("rec12").style.width = "0%";
      document.getElementById("ajustarDm").style.maxWidth = "100%";
      document.getElementById("openPuls").style.filter = "grayscale(100%)";

    } else {

      document.getElementById("opendoor2").style.backgroundColor = "transparent";
      document.getElementById("rec12").style.transition = "0.5s";
      document.getElementById("ajustarDm").style.transition = "none";
      document.getElementById("rec12").style.width = "100%";
      document.getElementById("ajustarDm").style.maxWidth = "83.33333%";
      document.getElementById("openPuls").style.filter = "none";

    }
  }

}




document.getElementById("opendoor").addEventListener("change", testar)

function testar() {

  if (document.getElementById("opendoor").checked) {
    document.getElementById("opendoor2").style.backgroundColor = "transparent";
    document.getElementById("ajustarDm").style.transition = "0.5s";
    document.getElementById("rec12").style.transition = "none";
    document.getElementById("rec12").style.width = "0%";
    document.getElementById("ajustarDm").style.maxWidth = "100%";
    document.getElementById("openPuls").style.filter = "grayscale(100%)";
    localStorage.setItem("fechado", 0);
  } else {

    document.getElementById("opendoor2").style.backgroundColor = "transparent";
    document.getElementById("rec12").style.transition = "0.5s";
    document.getElementById("ajustarDm").style.transition = "none";
    document.getElementById("rec12").style.width = "100%";
    document.getElementById("ajustarDm").style.maxWidth = "83.33333%";
    document.getElementById("openPuls").style.filter = "none";
    localStorage.setItem("fechado", 1);
  }
}

//------------------------------------------------------Novo Codigo ---------------------------------------------------------------

