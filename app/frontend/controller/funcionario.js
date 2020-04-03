$(window).on("load", function () {

  display_perfil();

  function display_perfil() {
    async function fetchAsync() {
      let id_user_clicked = localStorage.getItem("id_user_clicked");
      const response = await fetch('http://127.0.0.1:8080/api/users/' + id_user_clicked);
      const perfil = await response.json();
      console.log(perfil);


      //envia a para a pagina
      document.getElementById("funcaoF").innerHTML = perfil.roles[0].name;
      document.getElementById("nFuncionario").innerHTML = perfil.username;
      document.getElementById("InstituicaoF").innerHTML = perfil.prison.name;
      document.getElementById("dataNascimentoF").innerHTML = perfil.birthDate;
      document.getElementById("nacionalidadeF").innerHTML = perfil.nationality;
      document.getElementById("moradaF").innerHTML = perfil.address;
      document.getElementById("localidadeF").innerHTML = perfil.location;
      document.getElementById("nomeF").innerHTML = perfil.name;
      document.getElementById("imagemPerfil").src = perfil.photo;
      document.getElementById("contactoF").innerHTML = perfil.contact;
      document.getElementById("emailF").innerHTML = perfil.email;



      document.getElementById("last_login").innerHTML = "Último login: " + getDate(perfil.lastLogin);

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
  }

})
//----------------------------------------------------------------------------------------------------------------


const enviar_novo = document.getElementById("enviar_novo");
enviar_novo.addEventListener("click", novaNota);

async function novaNota() {
  event.preventDefault();
  var data = {};

  let id_user_clicked = localStorage.getItem("id_user_clicked");

  let userLogado = localStorage.getItem("userLogado");
  const response = await fetch('http://127.0.0.1:8080/api/users/' + userLogado);
  const logado = await response.json();
  console.log(logado);


  data.title = document.getElementById("titleN").value.trim();
  data.description = document.getElementById("descriptionN").value.trim();
  data.createdBy = { userId: logado.userId };
  data.userDest = { userId: id_user_clicked };

  if (titleN.value == "" || descriptionN.value == "") {
    Swal.fire(
      'Preencha todos os campos!',
      '',
      'warning'
    )
  } else {



    await fetch('http://127.0.0.1:8080/api/anotations', {
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