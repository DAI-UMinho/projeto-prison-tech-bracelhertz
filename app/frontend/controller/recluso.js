$(window).on("load", function () {
    let id_user_clicked = localStorage.getItem("id_user_clicked");
    let RoleLogado = localStorage.getItem("RoleLogado");

    display_recluso();
    get_instituicoes();


    function display_recluso() {
        async function fetchAsync() {




            if (RoleLogado == "ROLE_GUARD") {
                const response = await fetch('http://127.0.0.1:8080/api/prisoners/by-guards/' + id_user_clicked, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include'
                });
                const recluso = await response.json();
                console.log(recluso);
                display(recluso);
            } else {
                const response = await fetch('http://127.0.0.1:8080/api/prisoners/' + id_user_clicked, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include'
                });
                const recluso = await response.json();
                console.log(recluso);
                display(recluso);
            }

            //criação da demonstração de resultados recebidos
            function display(recluso) {

                //envia a para a pagina
                document.getElementById("fotoR").src = recluso.photo;
                document.getElementById("id_recluso").innerHTML = recluso.identifierId;
                document.getElementById("nome_recluso").innerHTML = recluso.name;
                document.getElementById("dn_recluso").innerHTML = recluso.birthDate;
                document.getElementById("nacionalidade_recluso").value = recluso.nationality;
                document.getElementById("contacto_recluso").value = recluso.contact;
                document.getElementById("contacto_recluso_alternativo").value = recluso.alternativeContact;
                document.getElementById("n_cela").value = recluso.cell;
                document.getElementById("n_ameaca").value = recluso.threatLevel;
                document.getElementById("id_instituicao").value = recluso.prison.prisonId;
                //document.getElementById("id_pulseira").value = recluso.braceletId;
                //document.getElementById("max_pul").value = recluso.maxHB;
                //document.getElementById("min_pul").value = recluso.minHB;

                if (recluso.alertOff) {
                    document.getElementById("notiR").checked = false;
                } else {
                    document.getElementById("notiR").checked = true;
                }
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


//--------------------------------------EDITAR PERFIL-----------------------------------------------------

document.getElementById("perfil_save_2").addEventListener("click", editar);
document.getElementById("notiR").addEventListener("change", editar);

async function editar() {
    event.preventDefault();
    data = {};


    let id_user_clicked = localStorage.getItem("id_user_clicked");
    const response = await fetch('http://127.0.0.1:8080/api/prisoners/' + id_user_clicked, {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    });
    const recluso = await response.json();

    let userLogado = localStorage.getItem("userLogado");


    data.prisonerId = recluso.prisonerId;
    data.photo = document.getElementById("fotoR").src;
    data.identifierId = document.getElementById("id_recluso").innerHTML;
    data.name = document.getElementById("nome_recluso").innerHTML;
    data.birthDate = document.getElementById("dn_recluso").innerHTML;
    data.nationality = document.getElementById("nacionalidade_recluso").value.trim();
    data.contact = parseInt(document.getElementById("contacto_recluso").value.trim());
    data.alternativeContact = parseInt(document.getElementById("contacto_recluso_alternativo").value.trim());
    data.cell = parseInt(document.getElementById("n_cela").value.trim());
    data.threatLevel = parseInt(document.getElementById("n_ameaca").value.trim());
    data.prison = { prisonId: recluso.prison.prisonId };
    data.braceletId = document.getElementById("id_pulseira").value.trim();
    data.maxHB = parseInt(document.getElementById("max_pul").value.trim());
    data.minHB = parseInt(document.getElementById("min_pul").value.trim());

    data.createdBy = { userId: userLogado };

    if (document.getElementById("notiR").checked) {
        data.alertOff = false;
    } else {
        data.alertOff = true;
    }




    if (document.getElementById("contacto_recluso").value == "" || document.getElementById("n_cela").value == "" ||
        document.getElementById("id_pulseira").value == "" || document.getElementById("nacionalidade_recluso").value == "" ||
        document.getElementById("contacto_recluso_alternativo").value == "" || document.getElementById("max_pul").value == "" ||
        document.getElementById("min_pul").value == "") {
        Swal.fire(
            'Preencha todos os campos!',
            '',
            'warning'
        )
    } else {
        if (document.getElementById("contacto_recluso").value.length != 9 ||
            document.getElementById("contacto_recluso_alternativo").value.length != 9) {
            Swal.fire(
                'Contacto tem de conter 9 números!',
                '',
                'warning'
            )
        } else {
            if (parseInt(document.getElementById("max_pul").value) > parseInt(document.getElementById("min_pul").value)) {




                console.log(data);


                fetch('http://127.0.0.1:8080/api/prisoners', {
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
                            //swal({ title: "Autenticação feita com sucesso!" });
                            //+ result.value.message.success);S




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
                                title: 'Alterada com sucesso'
                            }).then(() => {
                                // display_recluso();
                                Myfunction425();
                            })







                            /*
                            Swal.fire(
                              'Alterada com sucesso!',
                              '',
                              'success'
                            ).then(() => {
                                display_recluso();
                              //Myfunction425()
                            })
        
        */


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



            } else {
                Swal.fire(
                    'Pulsação máxima tem de ser maior que a pulsação minima!',
                    '',
                    'warning'
                )
            }

        }
    }










}

//----------------------------------------------------------------------------------------------------------------

function checkInp() {
    var x = document.getElementById("newNif").value;
    if ((x % 1) != 0) {
        //alert("So aceita numeros");
        return false;
    } else {
        return true;
    }
}


//(v-vmin)*90/(vmax-vmin)

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



//--------------------------------POSTAR ANOTAÇÃO--------------------------------------------------------------


const enviar_novo = document.getElementById("enviar_novo");
enviar_novo.addEventListener("click", novaNota);

async function novaNota() {
    event.preventDefault();
    var data = {};

    let id_user_clicked = localStorage.getItem("id_user_clicked");

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


    data.title = document.getElementById("titleN").value.trim();
    data.description = document.getElementById("descriptionN").value.trim();
    data.createdBy = { userId: logado.userId };
    data.prisonerDest = { prisonerId: parseInt(id_user_clicked) };

    if (titleN.value == "" || descriptionN.value == "") {
        Swal.fire(
            'Preencha todos os campos!',
            '',
            'warning'
        )
    } else {

        console.log(data);

        await fetch('http://127.0.0.1:8080/api/anotations', {
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


//--------------------------------------------------------------------------------


document.getElementById("perfil_alterar_2").addEventListener("click", function () {
    let RoleLogado = localStorage.getItem("RoleLogado");
    if (RoleLogado == "ROLE_GUARD") {
      Myfunction4245();
    } else {
      Myfunction424();
      if (RoleLogado == "ROLE_NETWORKMAN") {
        document.getElementById("id_instituicao").disabled = false;
        document.getElementById("icon_id_instituicao").style.display = "block";
      }
    }
  });



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
    document.getElementById("id_pulseira").readOnly = false;
    document.getElementById("icon_id_pulseira").style.display = "block";
    document.getElementById("nacionalidade_recluso").readOnly = false;
    document.getElementById("icon_nacionalidade_recluso").style.display = "block";
    document.getElementById("contacto_recluso").readOnly = false;
    document.getElementById("icon_contacto_recluso").style.display = "block";
    document.getElementById("contacto_recluso_alternativo").readOnly = false;
    document.getElementById("icon_contacto_recluso_alternativo").style.display = "block";
    document.getElementById("n_cela").readOnly = false;
    document.getElementById("icon_n_cela").style.display = "block";
    document.getElementById("n_ameaca").disabled = false;
    document.getElementById("icon_n_ameaca").style.display = "block";
    //document.getElementById("max_pul").readOnly = false;
    //document.getElementById("icon_max_pul").style.display = "block";
    //document.getElementById("min_pul").readOnly = false;
    //document.getElementById("icon_min_pul").style.display = "block";
    document.getElementById("perfil_alterar_2").style.display = "none";
    document.getElementById("perfil_save_2").style.display = "block";
}


function Myfunction4245() {
    document.getElementById("id_pulseira").readOnly = false;
    document.getElementById("icon_id_pulseira").style.display = "block";

    document.getElementById("n_cela").readOnly = false;
    document.getElementById("icon_n_cela").style.display = "block";

    //document.getElementById("max_pul").readOnly = false;
    //document.getElementById("icon_max_pul").style.display = "block";

    //document.getElementById("min_pul").readOnly = false;
    //document.getElementById("icon_min_pul").style.display = "block";

    document.getElementById("perfil_alterar_2").style.display = "none";
    document.getElementById("perfil_save_2").style.display = "block";
}

function Myfunction425() {
    document.getElementById("id_pulseira").readOnly = true;
    document.getElementById("icon_id_pulseira").style.display = "none";
    document.getElementById("id_instituicao").disabled = true;
    document.getElementById("icon_id_instituicao").style.display = "none";
    document.getElementById("nacionalidade_recluso").readOnly = true;
    document.getElementById("icon_nacionalidade_recluso").style.display = "none";
    document.getElementById("contacto_recluso").readOnly = true;
    document.getElementById("icon_contacto_recluso").style.display = "none";
    document.getElementById("contacto_recluso_alternativo").readOnly = true;
    document.getElementById("icon_contacto_recluso_alternativo").style.display = "none";
    document.getElementById("n_cela").readOnly = true;
    document.getElementById("icon_n_cela").style.display = "none";
    document.getElementById("n_ameaca").disabled = true;
    document.getElementById("icon_n_ameaca").style.display = "none";
    document.getElementById("max_pul").readOnly = true;
    document.getElementById("icon_max_pul").style.display = "none";
    document.getElementById("min_pul").readOnly = true;
    document.getElementById("icon_min_pul").style.display = "none";
    document.getElementById("perfil_save_2").style.display = "none";
    document.getElementById("perfil_alterar_2").style.display = "block";
}