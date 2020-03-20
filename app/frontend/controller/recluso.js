window.onload = function () {

  display_logs();

  function display_logs() {
      async function fetchAsync() {
          //id_user=localStorage.getItem("id_user");
          //const response = await fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/users/' + id_user + '/friends-list');
          //const friends = await response.json();
          //console.log(friends);


          var tabelBody = document.getElementById("tabelBody");

          let see_logs = "";

          var listaLog = [
              {
                  hora: "Mon Mar 16 2020 19:12:38 GMT+0000",
                  quem: "Jose Pires",
                  texto: "Adicionou uma anotação ao recluso Luis Duarte"
              },
              {
                  hora: "Mon Mar 16 2020 19:10:38 GMT+0000",
                  quem: "Jose Pires",
                  texto: "Adicionou uma anotação ao recluso Luis Duarte"
              },
              {
                  hora: "Mon Mar 16 2020 19:14:38 GMT+0000",
                  quem: "Jose Pires",
                  texto: "Adicionou uma anotação ao recluso Luis Duarte"
              },
              {
                  hora: "Mon Mar 16 2020 19:15:38 GMT+0000",
                  quem: "Jose Pires",
                  texto: "Adicionou uma anotação ao recluso Luis Duarte"
              }
          ];


          //criação da demonstração de resultados recebidos
          for (const log of listaLog) {
              let time = new Date(log.hora);
              var ht = time.getHours();
              var mt = time.getMinutes();


              see_logs += "<td>" + time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear() + " " + ht + ":" + mt + "</td>";
              see_logs += "<td>" + log.quem + "</td>";
              see_logs += "<td>" + log.texto + "</td></tr>";
          }

          //envia a para a pagina
          tabelBody.innerHTML = see_logs;


      }
      //chama a função fetchAsync()
      fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
      //var t = setTimeout(display_logs, 60000);
  }
}
//----------------------------------------------------------------------------------------------------------------

function myfunction420() {
    document.getElementById("edit_registocriminal").readOnly = false;
    document.getElementById("edit_registocriminal").style.border = "groove";
  }

  function myfunction421() {
    document.getElementById("edit_registocriminal").readOnly = true;
    document.getElementById("edit_registocriminal").style.border = "hidden";
  }

  function myfunction422() {
    document.getElementById("edit_receita").readOnly = false;
    document.getElementById("edit_receita").style.border = "groove";
  }

  function myfunction423() {
    document.getElementById("edit_receita").readOnly = true;
    document.getElementById("edit_receita").style.border = "hidden";
  }

  function Myfunction424() {
    document.getElementById("contacto_recluso2").contentEditable = true;
    document.getElementById("icon_contacto_recluso").style.display = "block";
    document.getElementById("contacto_recluso_alternativo2").contentEditable = true;
    document.getElementById("icon_contacto_recluso_alternativo").style.display = "block";
    document.getElementById("n_cela2").contentEditable = true;
    document.getElementById("icon_n_cela").style.display = "block";
    document.getElementById("n_ameaca2").contentEditable = true;
    document.getElementById("icon_n_ameaca").style.display = "block";
    document.getElementById("max_pul2").contentEditable = true;
    document.getElementById("icon_max_pul").style.display = "block";
    document.getElementById("min_pul2").contentEditable = true;
    document.getElementById("icon_min_pul").style.display = "block";
    document.getElementById("perfil_alterar_2").style.display = "none";
    document.getElementById("perfil_save_2").style.display = "block";
  }

  function Myfunction425() {
    document.getElementById("contacto_recluso2").contentEditable = false;
    document.getElementById("icon_contacto_recluso").style.display = "none";
    document.getElementById("contacto_recluso_alternativo2").contentEditable = false;
    document.getElementById("icon_contacto_recluso_alternativo").style.display = "none";
    document.getElementById("n_cela2").contentEditable = false;
    document.getElementById("icon_n_cela").style.display = "none";
    document.getElementById("n_ameaca2").contentEditable = false;
    document.getElementById("icon_n_ameaca").style.display = "none";
    document.getElementById("max_pul2").contentEditable = false;
    document.getElementById("icon_max_pul").style.display = "none";
    document.getElementById("min_pul2").contentEditable = false;
    document.getElementById("icon_min_pul").style.display = "none";
    document.getElementById("perfil_save_2").style.display = "none";
    document.getElementById("perfil_alterar_2").style.display = "block";
  }