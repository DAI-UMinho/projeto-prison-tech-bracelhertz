window.onload = async function () {
  var instituicoes = [];
  var thisis = "";
  get_instituicoes()

  const botaoRegistar = document.getElementById("botaoRegistar");
  botaoRegistar.addEventListener("click", registar);


  async function registar() {
    event.preventDefault();
    //var data = {};


    for (var inst of instituicoes) {
      if (document.getElementById("local").value == inst.idInstituicao) {
        thisis = inst.idInstituicao;
      }
    }




    /*
        data.nome = document.getElementById("Fname").value;
        data.email = document.getElementById("email").value;
        data.dataNascimento = document.getElementById("dataNascimento").value;
        data.username = document.getElementById("usermane").value;
        data.contacto = document.getElementById("contact").value;
    
        // data.foto = document.getElementById("foto").value;
        data.foto = "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg"
    
        data.nacionalidade = document.getElementById("nacionalidade").value;
        data.localidade = document.getElementById("localidade").value;
        data.morada = document.getElementById("morada").value;
        data.roles = [{id: parseInt(document.getElementById("type").value)}];
        data.password = document.getElementById("password").value;
        data.instituicao = {idInstituicao: thisis};*/

    var data = {
      nome: "Joao Teixeira",
      email: "joao07um@gmail.com",
      dataNascimento: "2000-01-07",
      username: "a89218",
      contacto: "919326817",
      foto: "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg",
      nacionalidade: "Portuguêsa",
      localidade: "Fafe",
      morada: "Rua da Giesta",
      //roles: [{id: 1}],
      password: "12345aA"
      //instituicao: { idInstituicao: 1 }
    }



    if (Fname.value.trim() == "" || email.value == "" || dataNascimento.value == "" ||
      username.value == "" || contact.value == "" || nacionalidade.value == "" ||
      localidade.value == "" || morada.value == "" || password.value == "" || contact.value.length != 9) {
      Swal.fire(
        'Preencha todos os campos!',
        '',
        'warning'
      )
    } else {
      if (validacaoEmail(document.getElementById("email"))) {
        if (valida_nome(Fname.value) || valida_nome(document.getElementById("nacionalidade"))
          || valida_nome(document.getElementById("localidade"))) {
          if (valida()) {
            Swal.fire(
              'Palavras-passe diferentes!',
              '',
              'warning'
            )
          } else {
            console.log(data);
          }




          /*
              await fetch('http://127.0.0.1:8080/api/utilizador', {
                headers: {
                  'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)
          
              }).then(function (response) {
                if (!response.ok) {
                  alert(response);
                  throw new Error("ERRO");
                }
                console.log(response);
                return response.json();
              }).then(async function (result) {
                console.log(result);
                if (result) {
                  swal("Sucesso!", 
                  "Registou um novo Utilizador com sucesso!", 
                  "success");
                }
              }).catch(function (err) {
                swal("Erro!", "Erro!", "error");
              })
              */



        } else {
          Swal.fire(
            'Nome, Localidade e Nacionalidade apenas podem ter letras!',
            '',
            'warning'
          )
        }
      } else {
        Swal.fire(
          'Este email não é válido!',
          '',
          'warning'
        )
      }
    }







  }





  function get_instituicoes() {
    async function fetchAsync() {

      //const response = await fetch('http://127.0.0.1:8080/api/instituicao');
      //const instituicoes = await response.json();
      var show_inst = "";

      instituicoes = [
        {
          idInstituicao: 1,
          nome: "Uminho-Gualtar",
          descricao: "balasdfasdfsadfd",
          morada: "Gualtar",
          localidade: "Braga",
          foto: "img/gualtar.jfif",
          email: "uminho@gmail.com",
          contacto: "123456789"
        },
        {
          idInstituicao: 2,
          nome: "Uminho-Azurém",
          descricao: "hmjnbvcxz",
          morada: "Azurém",
          localidade: "Guimarães",
          foto: "img/azurem.jpg",
          email: "uminho@hotmail.com",
          contacto: "123456789"
        }
      ];


      for (var inst of instituicoes) {
        show_inst += "<option value='" + inst.idInstituicao + "'>" + inst.nome + "</option>";
      }

      document.getElementById("local").innerHTML = show_inst;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

  }









};

//-------------------------------------------------------------------------------------------------------
function validacaoEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {

    return true;
  }
  else {

    return false;
  }
}

function valida_nome(elemento) {
  var filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
  if (!filter_nome.test(elemento)) {
    return false;
  } else {
    return true;
  }
}

/*$('.space1').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Z']/g, ' '));
  $th.val($th.val().replace(/^\s*/ // , ''));
//})

//--------------------------------------------------------------------------------------------------------
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

}


var myInput420 = document.getElementById("password");
var letter420 = document.getElementById("letter420");
var capital420 = document.getElementById("capital420");
var number420 = document.getElementById("number420");
var length420 = document.getElementById("length420");
var lengt420 = document.getElementById("lengt420");


myInput420.onfocus = function () {
    document.getElementById("message").style.display = "block";
}


myInput420.onblur = function () {
    document.getElementById("message").style.display = "none";
}

myInput420.onkeyup = function () {

    var lowerCaseLetters = /[a-z]/g;
    if (myInput420.value.match(lowerCaseLetters)) {
        letter420.classList.remove("invalid420");
        letter420.classList.add("valid420");
    } else {
        letter420.classList.remove("valid420");
        letter420.classList.add("invalid420");
    }

    var upperCaseLetters = /[A-Z]/g;
    if (myInput420.value.match(upperCaseLetters)) {
        capital420.classList.remove("invalid420");
        capital420.classList.add("valid420");
    } else {
        capital420.classList.remove("valid420");
        capital420.classList.add("invalid420");
    }

    var numbers = /[0-9]/g;
    if (myInput420.value.match(numbers)) {
        number420.classList.remove("invalid420");
        number420.classList.add("valid420");
    } else {
        number420.classList.remove("valid420");
        number420.classList.add("invalid420");
    }

    if (myInput420.value.length >= 6) {
        length420.classList.remove("invalid420");
        length420.classList.add("valid420");
        lengt420.classList.remove("invalid420");
        lengt420.classList.add("valid420");
    } else {
        length420.classList.remove("valid420");
        length420.classList.add("invalid420");
        lengt420.classList.remove("valid420");
        lengt420.classList.add("invalid420");
    }

    if (myInput420.value.length <= 24 && myInput420.value.length >= 6) {
        lengt420.classList.remove("invalid420");
        lengt420.classList.add("valid420");
    } else {
        lengt420.classList.remove("valid420");
        lengt420.classList.add("invalid420");
    }
}

//---------------------------------------------------------------------------------------------------

var continf = document.getElementById("contact");
var nomeinf = document.getElementById("Fname");
var mailinf = document.getElementById("email");
var nacinf = document.getElementById("nacionalidade")
var locinf = document.getElementById("localidade");

continf.onkeyup = function () {
  if (document.getElementById("contact").value.length == 9 || document.getElementById("contact").value.length == 0) {
    document.getElementById("continf").style.display = "none";
  } else {
    document.getElementById("continf").style.display = "block"
  }
}

nomeinf.onkeyup = function () {
  if ( valida_nome(document.getElementById("Fname")) || document.getElementById("Fname").value == "") {
    document.getElementById("nomeinf").style.display = "none";
  } else {
    document.getElementById("nomeinf").style.display = "block"
  }
}

mailinf.onkeyup = function () {
  if (validacaoEmail(document.getElementById("email")) || document.getElementById("email").value == "") {
    document.getElementById("mailinf").style.display = "none";
  } else {
    document.getElementById("mailinf").style.display = "block"
  }
}

nacinf.onkeyup = function () {
  if ( valida_nome(document.getElementById("nacionalidade")) || document.getElementById("nacionalidade").value == "") {
    document.getElementById("nacinf").style.display = "none";
  } else {
    document.getElementById("nacinf").style.display = "block"
  }
}

locinf.onkeyup = function () {
  if ( valida_nome(document.getElementById("localidade")) || document.getElementById("localidade").value == "") {
    document.getElementById("locinf").style.display = "none";
  } else {
    document.getElementById("locinf").style.display = "block"
  }
}

