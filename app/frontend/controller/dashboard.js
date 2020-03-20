$( window ).on( "load", function () {

    startTime();
    display_logs();
    display_info();


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


    function display_pulsacao() {
        async function fetchAsync() {
            //id_user=localStorage.getItem("id_user");
            //const response = await fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/users/' + id_user + '/friends-list');
            //const friends = await response.json();
            //console.log(friends);
            //const show_friends = document.getElementById("show_friends");
            var tPulsacoes = document.getElementById("tPulsacoes");

            let see_puls = "";

            var listaPuls = [
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                },
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                },
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                },
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                },
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                },
                {
                    avatar: "img/perfil2.jpg",
                    nome: "Jose Pires",
                    pulsacao: "60"
                }
            ];


            //criação da demonstração de resultados recebidos
            see_puls += "<ul class='teste w-100 px-0' style='list-style-type: none;'>";


            for (const puls of listaPuls) {
                see_puls += "<div class='col py-2 mr-3 pl-0 pr-1 myfilter'>";
                see_puls += "<div class='card border-left-danger shadow h-100 py-2'><div class='card-body pl-3'>";
                see_puls += "<div class='row no-gutters align-items-center'><div class='col-auto pr-2'>";
                see_puls += "<img class='picNotes40 img-profile rounded-circle' src=" + puls.avatar + ">";
                see_puls += "</div><div class='col mr-2'>";
                see_puls += "<div class='text-xs font-weight-bold text-primary text-uppercase mb-1'>" + puls.nome + "</div>";
                see_puls += "<div class='h5 mb-0 font-weight-bold text-gray-800'>" + puls.pulsacao + " bpm</div>";
                see_puls += "</div></div></div></div></div>";
            }
            see_puls += "</ul>";

            //envia a para a pagina
            tPulsacoes.innerHTML = see_puls;


        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
        //var t = setTimeout(display_pulsacao, 1000);
    }

    //------------------------------------DISPLAY INFO-------------------------------------------------


    function display_info() {
        async function fetchAsync() {

            var nOcorrencias = document.getElementById("nOcorrencias");
            var nFuncionarios = document.getElementById("nFuncionarios");
            var nReclusos = document.getElementById("nReclusos");
            var nomeUser = document.getElementById("nomeUser");
            var avatarUser = document.getElementById("avatarUser");


            var tOcorrencias = 50;
            var tFuncionarios = 100;
            var tReclusos = 1000;

            // idUser = localStorage.getItem("id_user");

            //const response = await fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/play-spaces/' + idEspaco);
            //const user = await response.json();

            var user = {
                username: "João Teixeira",
                data_nascimento: "...",
                avatar: "img/perfil2.jpg",
                tipo: 2
            }


            //criação da demonstração de resultados recebidos

            if (user.tipo == 0) {
                document.getElementById("listafuncionarios.html").style.display = "none";
                document.getElementById("listagestores.html").style.display = "none";
                document.getElementById("dashBoard").href = "#";
            } else if (user.tipo == 1) {
                document.getElementById("listagestores.html").style.display = "none";
                document.getElementById("dashBoard").href = "#";
            }

            //envia a para a pagina
            nOcorrencias.innerHTML = tOcorrencias;
            nFuncionarios.innerHTML = tFuncionarios;
            nReclusos.innerHTML = tReclusos;
            nomeUser.innerHTML = user.username;
            avatarUser.src = user.avatar;


        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
    }
   
        //------------------------------------DISPLAY INFO-------------------------------------------------


        function display_info() {
            async function fetchAsync() {
    
                var nOcorrencias = document.getElementById("nOcorrencias");
                var nFuncionarios = document.getElementById("nFuncionarios");
                var nReclusos = document.getElementById("nReclusos");
    
    
                var tOcorrencias = 50;
                var tFuncionarios = 100;
                var tReclusos = 1000;
    
                // idUser = localStorage.getItem("id_user");
    
                //const response = await fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/play-spaces/' + idEspaco);
                //const user = await response.json();
    
                var user = {
                    username: "João Teixeira",
                    data_nascimento: "...",
                    avatar: "img/perfil2.jpg",
                    tipo: 2
                }
    
    
                //criação da demonstração de resultados recebidos
    
                if (user.tipo == 0) {
                    document.getElementById("listafuncionarios.html").style.display = "none";
                    document.getElementById("dashBoard").href = "#";
                }
    
                //envia a para a pagina
                nOcorrencias.innerHTML = tOcorrencias;
                nFuncionarios.innerHTML = tFuncionarios;
                nReclusos.innerHTML = tReclusos;
    
    
            }
            //chama a função fetchAsync()
            fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
        }
        //-------------------------------------------------------------------------------------






    //-------------------------------------------------------------------------------------



    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        if(document.getElementById("txt") != null){
            document.getElementById('txt').innerHTML =
            h + ":" + m + "h";
        var t = setTimeout(startTime, 500);
        }
    }
    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }

})


