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
  
