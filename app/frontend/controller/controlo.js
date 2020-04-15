$(window).on("load", function () {

    display_pulsacao();
    display_infoPerfil();




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


    //------------------------------------------------INFO PERFIL-----------------------------------------


    function display_infoPerfil() {
        async function fetchAsync() {
            let RoleLogado = localStorage.getItem("RoleLogado");
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


            const response7 = await fetch('http://127.0.0.1:8080/api/photos/' + logado.photoId, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const photoD = await response7.json();


            var nomeUser = document.getElementById("nomeUser");
            var avatarUser = document.getElementById("avatarUser");


            if (RoleLogado == "ROLE_GUARD") {
                document.getElementById("showInst").style.display = "none";
                document.getElementById("dashBoard").href ="#";
            }



            //envia a para a pagina
            nomeUser.innerHTML = logado.name;
            avatarUser.src = "data:image/png;base64," + photoD.picByte;


        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));



    }


    //-------------------------------------------------------------------------------------


})

//-----------------------------------LOGOUT-----------------------------------------

const botaoLogout = document.getElementById("botaoLogout");

botaoLogout.addEventListener("click", sair);

async function sair() {
    event.preventDefault();
    var data = {};
    //data.email = document.getElementById("email").value;
    fetch('http://127.0.0.1:8080/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    })
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .catch(function (err) {
            //swal.showValidationError('Pedido falhado: ' + err);
            alert(err);
        })
        .then(async function (result) {
            if (result.success) {
                Swal.fire(
                    'Sessão terminada com sucesso!',
                    '',
                    'success'
                ).then(() => {
                    localStorage.clear();
                    window.location.replace("./login.html");
                })
            }
            else {
                alert(result);
                //swal({ title: `${result.value.userMessage.message.pt}` });
            }
        });

};