let RoleLogado1 = localStorage.getItem("RoleLogado");

var listaRec = "";
$(window).on("load", function () {

    if (RoleLogado1 == "ROLE_GUARD") {
        display_pulsacao();
    }
    display_infoPerfil();

    if (RoleLogado1 !== "ROLE_GUARD") {
        document.getElementById("openPuls").style.display = "none";
        document.getElementById("rec12").style.display = "none"
        var pi = document.getElementById("estenao");
        if (pi !== null) {
            pi.style.marginTop = "30px";
        }
    }


})


function trocaClasse(elemento, nova1) {
    elemento.className = "";
    elemento.classList.add(nova1);
}


async function display_pulsacao() {



    const response = await fetch('http://127.0.0.1:8080/api/alert-prisoners', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    });
    listaRec = await response.json();



    var tPulsacoes = document.getElementById("tPulsacoes");

    let see_puls = "";


    //criação da demonstração de resultados recebidos
    see_puls += "<ul class='teste w-100 px-0' style='list-style-type: none;'>";


    for (const rec of listaRec) {

        const response7 = await fetch('http://127.0.0.1:8080/api/photos/' + rec.photoId, {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const photoD = await response7.json();



        see_puls += "<div class='col py-2 mr-3 pl-0 pr-1 myfilter'>";
        see_puls += "<div class='card border-left-danger shadow h-100 py-2'><div class='card-body pl-3'>";
        see_puls += "<div class='row no-gutters align-items-center'><div class='col-auto pr-2'>";
        see_puls += "<img class='picNotes40 img-profile rounded-circle' src=" + "data:image/png;base64," + photoD.picByte + ">";
        see_puls += "</div><div class='col mr-2'>";
        see_puls += "<div class='text-xs font-weight-bold text-primary text-uppercase mb-1'>" + rec.name + "</div>";
        see_puls += "<div id='" + rec.prisonerId + "puls' class='h5 mb-0 font-weight-bold' style='color: #5a5c69;'></div>";
        see_puls += "</div></div></div></div></div>";
    }
    see_puls += "</ul>";

    //envia a para a pagina
    tPulsacoes.innerHTML = see_puls;
    procurarPul();

}



//------------------------------------------------INFO PERFIL-----------------------------------------


async function display_infoPerfil() {

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
        document.getElementById("dashBoard").href = "#";
    }



    //envia a para a pagina
    nomeUser.innerHTML = logado.name;
    avatarUser.src = "data:image/png;base64," + photoD.picByte;


}


//-------------------------------------------------------------------------------------




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


//-------------------------------------------------------------------------------------------------------------------------------------
var bracel1 = 123;
var bracel2 = 1;
var bracelt = [bracel1, bracel2];
var reclusos = [];
function procurarPul() {

    for (const f of listaRec) {

        for (var i = 0; i < bracelt.length; i++) {

            if (f.braceletId == bracelt[i]) {
                reclusos[i] = f;
            }
        }
    }

    //verPul();
}



function verPul() {
    for (var i = 0; i < reclusos.length; i++) {
        console.log(reclusos)

        var pulse = Math.floor(Math.random() * reclusos[i].maxHB) + reclusos[i].minHB
        document.getElementById(reclusos[i].prisonerId + "puls").innerHTML = pulse + " bpm";
        console.log(reclusos[i].name + " " + pulse)


        if (pulse >= reclusos[i].maxHB || pulse <= reclusos[i].minHB) {
            document.getElementById(reclusos[i].prisonerId + "puls").style.color = "#e74a3b";
            $("#AlertModal").modal();


            playAudio();
            document.getElementById("infoDanger").innerHTML = "O recluso " + reclusos[i].name + " está em perigo"

        } else {
            document.getElementById(reclusos[i].prisonerId + "puls").style.color = "#5a5c69";
        }
        var t = setTimeout(verPul, 5000);


    }


}


$('#AlertModal').on('hidden.bs.modal', function () {
    pauseAudio();
});


var x = document.getElementById("myAudio");
function playAudio() {
    x.play();
}

function pauseAudio() {
    x.pause();
}