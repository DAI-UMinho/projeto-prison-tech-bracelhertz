$(window).on("load", function () {
  let RoleLogado = localStorage.getItem("RoleLogado");
  display_perfil();
  get_instituicoes();

  function display_perfil() {
    async function fetchAsync() {
      let id_user_clicked = localStorage.getItem("id_user_clicked");
      const response = await fetch('http://127.0.0.1:8080/api/users/' + id_user_clicked, {
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      });
      const perfil = await response.json();
      console.log(perfil);


      //envia a para a pagina
      document.getElementById("funcaoF").value = perfil.roles[0].name;
      document.getElementById("nFuncionario").value = perfil.username;
      document.getElementById("id_instituicao").value = perfil.prison.prisonId;
      document.getElementById("dn_funcionario").value = perfil.birthDate;
      document.getElementById("nacF").value = perfil.nationality;
      document.getElementById("moradaF").value = perfil.address;
      document.getElementById("localF").value = perfil.location;
      document.getElementById("nomeF").value = perfil.name;
      document.getElementById("imagemPerfil").src = perfil.photo;
      document.getElementById("contactoF").value = perfil.contact;
      document.getElementById("emailF").value = perfil.email;

      document.getElementById("last_login").innerHTML = "Último login: " + getDate(perfil.lastLogin);


      if (!(RoleLogado == "ROLE_NETWORKMAN" && perfil.roles[0].name !== "ROLE_NETWORKMAN" || RoleLogado == "ROLE_MANAGER" && perfil.roles[0].name == "ROLE_GUARD")) {
        document.getElementById("perfil_alterar_2").style.display = "none";
        document.getElementById("editPassoutro").style.display = "none";
      }

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
  }


  function get_instituicoes() {
    async function fetchAsync() {

      const response = await fetch('http://127.0.0.1:8080/api/prisons', {
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

      document.getElementById("id_instituicao").innerHTML = show_inst;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

  }


})


//-------------------------------------------------------------------------------------------------------

let RoleLogado = localStorage.getItem("RoleLogado");
let id_user_clicked = localStorage.getItem("id_user_clicked");



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

//----------Só aceita letras e um espaço----------------
$('.space1').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú']/g, ' '));
  $th.val($th.val().replace(/^\s*/, ''));
})
//----------Não aceita espaços nem aceita números----------------
$('.nspace1').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})
//----------Não aceita espaços mas aceita números----------------
$('.nspace').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú\d']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})
//----------Só aceita numeros----------------
$('.snum').keyup(function () {
  var $th = $(this);
  $th.val($th.val().replace(/(\s{2,})|[^\d']/g, ' '));
  $th.val($th.val().replace(/[' ']/g, ''));
})







//--------------------------------------------EDITAR FUNCIONARIO-------------------------------------------

document.getElementById("perfil_save_2").addEventListener("click", async function () {

  var data = {};

  data.userId = id_user_clicked;
  data.birthDate = document.getElementById("dn_funcionario").value.trim();
  data.nationality = document.getElementById("nacF").value.trim();
  data.address = document.getElementById("moradaF").value.trim();
  data.location = document.getElementById("localF").value.trim();
  data.name = document.getElementById("nomeF").value.trim();
  data.contact = document.getElementById("contactoF").value.trim();
  data.email = document.getElementById("emailF").value.trim();
  data.prisonId = document.getElementById("id_instituicao").value;
  

  if (data.birthDate == "" || data.nationality == "" || data.address == "" || data.location == "" || data.name == "" ||
    data.contact == "" || data.contact.length !== 9 || data.email == "") {

      Swal.fire(
        'Preencha todos os campos!',
        '',
        'warning'
      )

  } else {
    if (validacaoEmail(document.getElementById("emailF"))) {




      console.log(data)
  
    fetch('http://127.0.0.1:8080/api/users/managers', {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(function (response) {
        //console.log(response.headers.get('Set-Cookie'));
        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (err) {
        //swal.showValidationError('Pedido falhado: ' + err);
        console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
      })
      .then(async function (result) {
        console.log(result);
        if (result) {
  
  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: 'Dados alterados com sucesso'
          }).then(() => {
            Myfunction425()
          })
  
  
        }
        else {
          Swal.fire(
            'Ocorreu um erro!',
            '',
            'error'
          ).then(() => {
            location.reload();
          })
          console.log(result);
          //swal({ title: `${result.value.userMessage.message.pt}` });
        }
      });

    }else{
      Swal.fire(
        'Este email não é válido!',
        '',
        'warning'
      )
    }

  }



})










//---------------------------------------------DATAS-------------------------------------------------

function getDate(date) {
  var today = new Date(date);
  var d = today.getDate();
  var mo = today.getMonth() + 1;
  var a = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  d = checkTime(d);
  mo = checkTime(mo);

  m = checkTime(m);
  s = checkTime(s);
  return d + "/" + mo + "/" + a + " " + h + ":" + m;
}
function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

//-----------------------------------------------------------------------------------------------------

document.getElementById("perfil_alterar_2").addEventListener("click", function () {

  if (RoleLogado == "ROLE_NETWORKMAN") {
    document.getElementById("id_instituicao").disabled = false;
    document.getElementById("icon_id_instituicao").style.display = "block";
  }
  Myfunction424();

})

function Myfunction424() {
  document.getElementById("perfil_alterar_2").style.display = "none";
  document.getElementById("perfil_save_2").style.display = "block";

  document.getElementById("nomeF").readOnly = false;
  document.getElementById("icon_nomeF").style.display = "block";
  document.getElementById("dn_funcionario").readOnly = false;
  document.getElementById("icon_dn_funcionario").style.display = "block";
  document.getElementById("emailF").readOnly = false;
  document.getElementById("icon_emailF").style.display = "block";
  document.getElementById("contactoF").readOnly = false;
  document.getElementById("icon_contactoF").style.display = "block";
  document.getElementById("nacF").readOnly = false;
  document.getElementById("icon_nacF").style.display = "block";
  document.getElementById("moradaF").readOnly = false;
  document.getElementById("icon_moradaF").style.display = "block";
  document.getElementById("localF").readOnly = false;
  document.getElementById("icon_localF").style.display = "block";
}

function Myfunction425() {
  document.getElementById("perfil_save_2").style.display = "none";
  document.getElementById("perfil_alterar_2").style.display = "block";

  document.getElementById("id_instituicao").disabled = true;
  document.getElementById("icon_id_instituicao").style.display = "none";
  document.getElementById("nomeF").readOnly = true;
  document.getElementById("icon_nomeF").style.display = "none";
  document.getElementById("dn_funcionario").readOnly = true;
  document.getElementById("icon_dn_funcionario").style.display = "none";
  document.getElementById("emailF").readOnly = true;
  document.getElementById("icon_emailF").style.display = "none";
  document.getElementById("contactoF").readOnly = true;
  document.getElementById("icon_contactoF").style.display = "none";
  document.getElementById("nacF").readOnly = true;
  document.getElementById("icon_nacF").style.display = "none";
  document.getElementById("morada").readOnly = true;
  document.getElementById("icon_moradaF").style.display = "none";
  document.getElementById("localF").readOnly = true;
  document.getElementById("icon_localF").style.display = "none";
}





























//------------------------------------------ANOTAÇÃO--------------------------------------------------------


const enviar_novo = document.getElementById("enviar_novo");
enviar_novo.addEventListener("click", novaNota);

async function novaNota() {
  event.preventDefault();
  var data = {};

  let id_user_clicked = localStorage.getItem("id_user_clicked");


  data.title = document.getElementById("titleN").value.trim();
  data.description = document.getElementById("descriptionN").value.trim();
  data.userDestId = id_user_clicked;

  if (titleN.value == "" || descriptionN.value == "") {
    Swal.fire(
      'Preencha todos os campos!',
      '',
      'warning'
    )
  } else {



    await fetch('http://127.0.0.1:8080/api/user-annotations', {
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
          "Anotação enviada com sucesso!",
          "success").then(() => {
            document.getElementById("titleN").value = "";
            document.getElementById("descriptionN").value = "";
            $('#NotaModal').modal('hide');
          })
      }
    }).catch(function (err) {
      swal("Erro!", "Erro!", "error");
    })



  }

}



//------------------------------------------------ALTERAR PASSWORD---------------------------------------------------------------

document.getElementById("editPass").addEventListener("click", function () {
  let id_user_clicked = localStorage.getItem("id_user_clicked");
  var nPassword = document.getElementById("nPassword");
  var data = {};

  if (nPassword.value.trim() == "") {
    Swal.fire(
      'Preencha o campo!',
      '',
      'warning'
    )
  } else {

    data.userId = id_user_clicked;
    data.newPassword = nPassword.value.trim();
    console.log(data)

    fetch('http://127.0.0.1:8080/api/users/passwords', {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(function (response) {
        //console.log(response.headers.get('Set-Cookie'));
        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (err) {
        //swal.showValidationError('Pedido falhado: ' + err);
        console.log(err); // estava alert(err); coloquei console log para não estar sempre a aparecer pop-up ao utilizador
      })
      .then(async function (result) {
        console.log(result);
        if (result) {

          Swal.fire(
            'Password alterada com sucesso!',
            '',
            'success'
          ).then(() => {
            location.reload();
          })


        }
        else {
          Swal.fire(
            'Ocorreu um erro!',
            '',
            'error'
          )
          console.log(result);
          //swal({ title: `${result.value.userMessage.message.pt}` });
        }
      });




  }

})


