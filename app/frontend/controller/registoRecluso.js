window.onload = async function () {


    
}


//------------------------------------------------------------------------------------------------------------------------
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var shi;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (shi = 0; shi < slides.length; shi++) {
    slides[shi].style.display = "none";
  }
  for (shi = 0; shi < dots.length; shi++) {
    dots[shi].className = dots[shi].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


function valida() {
  if (document.getElementById("password").validity.patternMismatch) {

      return true;
  } else {

      return false;
  }

}//-------------------------------------------------------------------------------------------------------------------