window.onload = async function () {

  get_instituicoes();


  let userLogado = localStorage.getItem("userLogado");
  const response = await fetch('http://127.0.0.1:8080/api/users/' + userLogado, {
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'GET',
    credentials: 'include'
});
  const logado = await response.json();
  console.log(logado);


  const botaoRegistar = document.getElementById("botaoRegistar");
  botaoRegistar.addEventListener("click", registar);


  async function registar() {
    event.preventDefault();
    var data = {};


    data.name = document.getElementById("Rname").value.trim();
    data.nationality = document.getElementById("nacionalidade").value.trim();
    data.birthDate = document.getElementById("dataNascimento").value.trim();
    data.identifierId = document.getElementById("Identification").value.trim();
    data.contact = document.getElementById("contact").value.trim();
    data.alternativeContact = document.getElementById("contactAlt").value.trim();
    data.photo = pic;
    data.prison = { prisonId: document.getElementById("instituicao").value };
    data.threatLevel = document.getElementById("nivel").value.trim();
    data.cell = document.getElementById("cela").value.trim();
    data.braceletId = document.getElementById("idpulseira").value.trim();
    data.MinHB = document.getElementById("pulsacaomin").value.trim();
    data.MaxHB = document.getElementById("pulsacaomax").value.trim();

    data.createdBy = { userId: userLogado };





    if (Rname.value == "" || nacionalidade.value == "" || dataNascimento.value == "" ||
      Identification.value == "" || contact.value == "" || contactAlt.value == "" ||
      cela.value == "" || idpulseira.value == "" || pulsacaomin.value == "" || pulsacaomax.value == "" ||
      contact.value.length != 9 || contactAlt.value.length != 9) {
      Swal.fire(
        'Preencha todos os campos!',
        '',
        'warning'
      )
    } else {
      if (pic == "") {
        Swal.fire(
          'É obrigatória uma fotografia!',
          '',
          'warning'
        )
      } else {
        if(parseInt(document.getElementById("pulsacaomax").value) > parseInt(document.getElementById("pulsacaomin").value)){




        console.log(data);




        await fetch('http://127.0.0.1:8080/api/prisoner', {
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          method: 'POST',
          credentials: 'include',
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
              "Registou um novo Recluso com sucesso!",
              "success");
          }
        }).catch(function (err) {
          swal("Erro!", "Erro!", "error");
        })







        }else{
          Swal.fire(
            'Pulsação máxima tem de ser maior que a pulsação minima!',
            '',
            'warning'
          )
        }




      }


    }







  }





  function get_instituicoes() {
    async function fetchAsync() {

      const response = await fetch('http://127.0.0.1:8080/api/prison', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    });
      const instituicoes = await response.json();
      var show_inst = "";



      for (var inst of instituicoes) {
        show_inst += "<option value='" + inst.prisonId + "'>" + inst.name + "</option>";
      }

      document.getElementById("instituicao").innerHTML = show_inst;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

  }


};

//-------------------------------------------------------------------------------------------------------


function valida_nome(elemento) {
  var filter_nome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
  if (!filter_nome.test(elemento)) {
    return false;
  } else {
    return true;
  }
}

//----------Só um espaço----------------
$('.space1').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú']/g, ' '));
  $th.val($th.val().replace(/^\s*/, ''));
})
//----------Sem espaços e numeros----------------
$('.nspace1').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})
//----------Sem espaços com numeros----------------
$('.nspace').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú\d']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})
//----------Só numeros----------------
$('.snum').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^\d']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})

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




//---------------------------------------------------------------------------------------------------

var continf = document.getElementById("contact");
var contalinf = document.getElementById("contactAlt");


continf.onkeyup = function () {
  if (document.getElementById("contact").value.length == 9 || document.getElementById("contact").value.length == 0) {
    document.getElementById("continf").style.display = "none";
  } else {
    document.getElementById("continf").style.display = "block"
  }
}

contalinf.onkeyup = function () {
  if (document.getElementById("contactAlt").value.length == 9 || document.getElementById("contactAlt").value.length == 0) {
    document.getElementById("contalinf").style.display = "none";
  } else {
    document.getElementById("contalinf").style.display = "block";
  }
}



//--------------------------------------Acept image---------------------------------------------------
var pic = "";
var loadFile = function (event) {
  pic = "";
  pic = URL.createObjectURL(event.target.files[0]);
};
