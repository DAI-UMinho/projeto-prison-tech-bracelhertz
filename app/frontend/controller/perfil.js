$(window).on("load", function () {
  let userLogado = localStorage.getItem("userLogado");

  display_logado();
  get_instituicoes();

  function display_logado() {
    async function fetchAsync() {

      const response = await fetch('http://127.0.0.1:8080/api/users/logged-profiles', {
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
      });
      const logado = await response.json();
      console.log(logado);


      document.getElementById("username_perfil").innerHTML = logado.username;
      document.getElementById("contacto_perfil").value = logado.contact;
      document.getElementById("nacionalidade_perfil").value = logado.nationality;
      document.getElementById("morada_perfil").value = logado.address;
      document.getElementById("id_instituicao").value = logado.prison.prisonId;
      document.getElementById("nome_perfil").value = logado.name;
      document.getElementById("dataNascimento_perfil").value = logado.birthDate;
      document.getElementById("email_perfil").value = logado.email;
      document.getElementById("localidade_perfil").value = logado.location;
      document.getElementById("role_perfil").innerHTML = logado.roles[0].name;
      document.getElementById("fotoR").src = logado.photo;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));



  }


  function get_instituicoes() {
    async function fetchAsync() {

        const response = await fetch('http://127.0.0.1:8080/api/prisons');
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


//--------------------------------------EDITAR PERFIL-----------------------------------------------------

document.getElementById("perfil_save_2").addEventListener("click", editar);

async function editar() {
  event.preventDefault();
  data = {};

  const response = await fetch('http://127.0.0.1:8080/api/users/logged-profiles', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'GET',
    credentials: 'include'
  });
  const logado = await response.json();



  if (document.getElementById("contacto_perfil").value == "" || document.getElementById("contacto_perfil").value.length != 9 ||
    document.getElementById("nacionalidade_perfil").value == "" || document.getElementById("morada_perfil").value == "" ||
    document.getElementById("nome_perfil").value == "" || document.getElementById("dataNascimento_perfil").value == "" ||
    document.getElementById("email_perfil").value == "" || document.getElementById("localidade_perfil").value == "") {
    Swal.fire(
      'Preencha todos os campos!',
      '',
      'warning'
    )
  } else {
    if (validacaoEmail(document.getElementById("email_perfil"))) {

      let RoleLogado = localStorage.getItem("RoleLogado");
      

      if (RoleLogado == "ROLE_GUARD") {

        data.userId = userLogado;
        data.contact = document.getElementById("contacto_perfil").value.trim();
        data.email = document.getElementById("email_perfil").value.trim();

        console.log(data);

        editar_guarda(data)
      } else {

        data.userId = userLogado;
        data.contact = document.getElementById("contacto_perfil").value.trim();
        data.nationality = document.getElementById("nacionalidade_perfil").value.trim();
        data.address = document.getElementById("morada_perfil").value.trim();
        data.prisonId = document.getElementById("id_instituicao").value ;
        data.name = document.getElementById("nome_perfil").value.trim();
        data.birthDate = document.getElementById("dataNascimento_perfil").value;
        data.email = document.getElementById("email_perfil").value.trim();
        data.location = document.getElementById("localidade_perfil").value.trim();

        console.log(data);


        editar_outro(data)
      }


    } else {
      Swal.fire(
        'Este email não é válido!',
        '',
        'warning'
      )
    }
  }


  async function editar_guarda(coisa) {


    fetch('http://127.0.0.1:8080/api/users/guards', {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(coisa),
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
          //swal({ title: "Autenticação feita com sucesso!" });
          //+ result.value.message.success);S
          Swal.fire(
            'Dados alterados com sucesso!',
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
          ).then(() => {
            location.reload();
          })
          console.log(result);
          //swal({ title: `${result.value.userMessage.message.pt}` });
        }
      });


  }


  async function editar_outro(coisa) {


    fetch('http://127.0.0.1:8080/api/users/managers', {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(coisa),
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
          //swal({ title: "Autenticação feita com sucesso!" });
          //+ result.value.message.success);S
          Swal.fire(
            'Dados alterados com sucesso!',
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
          ).then(() => {
            location.reload();
          })
          console.log(result);
          //swal({ title: `${result.value.userMessage.message.pt}` });
        }
      });


  }




}


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




document.getElementById("perfil_alterar_2").addEventListener("click", function(){
  let RoleLogado = localStorage.getItem("RoleLogado");
  if(RoleLogado == "ROLE_GUARD"){
    Myfunction4245();
  }else{
    Myfunction424();
    if(RoleLogado == "ROLE_NETWORKMAN"){
      document.getElementById("id_instituicao").disabled = false;
      document.getElementById("icon_id_instituicao").style.display = "block";
    }
  }
});


//------------------------------------------------------------------------------------------------------------------------
function Myfunction424() {

  document.getElementById("nacionalidade_perfil").readOnly = false;
  document.getElementById("icon_nacionalidade_perfil").style.display = "block";
  document.getElementById("dataNascimento_perfil").disabled = false;
  document.getElementById("icon_dataNascimento_perfil").style.display = "block";
  document.getElementById("nome_perfil").readOnly = false;
  document.getElementById("icon_nome_perfil").style.display = "block";
  document.getElementById("localidade_perfil").readOnly = false;
  document.getElementById("icon_localidade_perfil").style.display = "block";
  document.getElementById("contacto_perfil").readOnly = false;
  document.getElementById("icon_contacto_perfil").style.display = "block";
  document.getElementById("email_perfil").readOnly = false;
  document.getElementById("icon_email_perfil").style.display = "block";
  document.getElementById("morada_perfil").readOnly = false;
  document.getElementById("icon_morada_perfil").style.display = "block";
  document.getElementById("perfil_alterar_2").style.display = "none";
  document.getElementById("perfil_save_2").style.display = "block";
  document.getElementById("foto420").style.color = "#ffffff";
  document.getElementById("file").disabled = false;
}

function Myfunction4245() {
  document.getElementById("contacto_perfil").readOnly = false;
  document.getElementById("icon_contacto_perfil").style.display = "block";
  document.getElementById("email_perfil").readOnly = false;
  document.getElementById("icon_email_perfil").style.display = "block";
  document.getElementById("perfil_alterar_2").style.display = "none";
  document.getElementById("perfil_save_2").style.display = "block";
  document.getElementById("foto420").style.color = "#ffffff";
  document.getElementById("file").disabled = false;

}



function Myfunction425() {
  document.getElementById("nacionalidade_perfil").readOnly = true;
  document.getElementById("icon_nacionalidade_perfil").style.display = "none";
  document.getElementById("dataNascimento_perfil").disabled = true;
  document.getElementById("icon_dataNascimento_perfil").style.display = "none";
  document.getElementById("nome_perfil").readOnly = true;
  document.getElementById("icon_nome_perfil").style.display = "none";
  document.getElementById("localidade_perfil").readOnly = true;
  document.getElementById("icon_localidade_perfil").style.display = "none";
  document.getElementById("contacto_perfil").readOnly = true;
  document.getElementById("icon_contacto_perfil").style.display = "none";
  document.getElementById("email_perfil").readOnly = true;
  document.getElementById("icon_email_perfil").style.display = "none";
  document.getElementById("morada_perfil").readOnly = true;
  document.getElementById("icon_morada_perfil").style.display = "none";
  document.getElementById("perfil_save_2").style.display = "none";
  document.getElementById("perfil_alterar_2").style.display = "block";
  document.getElementById("foto420").style.color = "#ff8800";
  document.getElementById("file").disabled = true;
}