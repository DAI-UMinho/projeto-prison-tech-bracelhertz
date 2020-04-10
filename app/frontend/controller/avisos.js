$(window).on("load", function () {

    avisos();
    get_reclusos();


    function avisos() {
        async function fetchAsync() {
            const real_content = document.getElementById("real_content");



            let true_content = "";


            const avisos = [
                {
                    utilizador: {
                        nome: "pessoa",
                        img: "img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",

                    comentarios: [{
                        owner_img: "img/mm.jpg",
                        owner: "pessoa1",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa2",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa3",
                        content: "Aloooooooooo"
                    }
                    ],
                    editado: {
                        lastUpdatedTimestamp: "'Dec 31 2019 22:02:09'",
                        value: true,
                    }

                },
                {
                    utilizador: {
                        nome: "pessoa",
                        img: "img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",


                    comentarios: [{
                        owner_img: "img/mm.jpg",
                        owner: "pessoa1",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa2",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa3",
                        content: "Aloooooooooo"
                    }
                    ],
                    editado: {
                        lastUpdatedTimestamp: "'Dec 31 2019 22:02:09'",
                        value: true,
                    }

                },
                {
                    utilizador: {
                        nome: "pessoa",
                        img: "img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",


                    comentarios: [{
                        owner_img: "img/mm.jpg",
                        owner: "pessoa1",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa2",
                        content: "Aloooooooooo"
                    },
                    {
                        owner_img: "img/mm.jpg",
                        owner: "pessoa3",
                        content: "Aloooooooooo"
                    }
                    ],
                    editado: {

                        value: false,
                    }

                },
                {
                    utilizador: {
                        nome: "pessoa",
                        img: "img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: '22:02:09',


                    comentarios: [],
                    editado: {
                        value: false,
                    }

                },
            ]



            //criação da demonstração de resultados recebidos


            for (const aviso of avisos) {
                true_content += "<div class='card shadow mb-4'>";
                true_content += "<div class='card-header py-3 d-flex flex-row align-items-center justify-content-between bg-secondary'>"
                true_content += "<h6 class='m-0 font-weight-bold text-white'>" + aviso.titulo + ""
                if (aviso.editado.value == true) {
                    true_content += "<span data-tooltip=" + aviso.editado.lastUpdatedTimestamp + " data-tooltip-position='bottom' class='text-white font-small font-weight-normal solve'>(Editado)</span>"
                } else {

                }
                true_content += "</h6><div class='dropdown no-arrow'>";
                true_content += "<a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
                true_content += "<i class='fas fa-ellipsis-v fa-sm fa-fw text-white'></i></a>"
                true_content += "<div class='dropdown-menu dropdown-menu-right shadow animated--fade-in' aria-labelledby='dropdownMenuLink'>";
                true_content += "<div class='dropdown-header text-secondary'>Opções:</div>";
                true_content += "<button class='dropdown-item' data-toggle='modal' data-target='#EditarNotaModal' id='willEdit' href='#'>Editar</button>";
                true_content += "<button class='dropdown-item' id='apagar_aviso' href='#''>Apagar</button>";
                true_content += "<a class='dropdown-item' href='#''></a></div></div></div>";

                true_content += "<div class='card-body'><div style='margin-top:-12px;'class='text-primary'>";
                true_content += "<img class='img-profile rounded-circle picNotes' src=" + aviso.utilizador.img + "> " + aviso.utilizador.nome;
                true_content += " <span class='text-xs'> " + aviso.createdTimestamp + "</span></div><br>";
                true_content += "<div>Recluso: " + aviso.idReclusoDestino + "</div><textarea class='alterar form-control' style='resize: none; border: none; background-color:transparent;' readonly='true'>" + aviso.descricao + "</textarea>";

                if (aviso.comentarios.length == 0) {

                } else {
                    true_content += "<br><div class='w-100'> Comentários: </div>";
                    true_content += "<div class='text-black caixa-de-comentario no-border'>";
                    for (const comentario of aviso.comentarios) {


                        true_content += "<div class='caixa-de-cometario-interior mt-1 mg-1'><div class='comentario2'>";
                        true_content += "<img class='img-profile rounded-circle picNotes mt-1 ml-1' src=" + comentario.owner_img + "> " + comentario.owner + " <div class='text-gray-600 ml-3 mb-1 mt-1'>";
                        true_content += "" + comentario.content + "</div></div></div>";

                    }
                    true_content += "</div>"
                }



                true_content += "<div class='input-group'><input type='text' class='form-control bg-light border-0 small mt-2' placeholder='Comente aqui...' aria-label='Add' aria-describedby='basic-addon2'>"
                true_content += "<div class='input-group-append'><button class='btn btn-secondary mt-2' id='enviar_comentario' type='button'>"
                true_content += "<i class='fas fa-envelope fa-sm'></i></button></div></div></div></div></div>"

            }



            //envia a para a pagina
            real_content.innerHTML = true_content;


        }
        /*chama a função fetchAsync()*/
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
    }

});

//---------------------------------------------------DISPLAY POST INSTITUIÇÕES------------------------------------------------

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

        document.getElementById("Dest").innerHTML = show_inst;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

}



//---------------------------------------------------DISPLAY POST PRISIONEIROS------------------------------------------------

function get_reclusos() {
    async function fetchAsync() {
        let RoleLogado = localStorage.getItem("RoleLogado");
        var func = "";
        var show_rec = "";
        if (RoleLogado == "ROLE_GUARD") {
            const response = await fetch('http://127.0.0.1:8080/api/prisoners/by-guards', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            func = await response.json();

        } else {
            const response = await fetch('http://127.0.0.1:8080/api/prisoners', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            func = await response.json();

        }

        for (var inst of func) {
            show_rec += "<option value='" + inst.prisonerId + "'>" + inst.name + " (" + inst.identifierId + ")" + "</option>";
        }

        document.getElementById("Dest").innerHTML = show_rec;

    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

}
//------------------------------------------------POST ANOTAÇÃO---------------------------------------------------

const enviar_novo = document.getElementById("enviar_novo");
enviar_novo.addEventListener("click", novaNota);

async function novaNota() {
    event.preventDefault();
    var data = {};

    data.title = document.getElementById("titleN").value.trim();
    data.description = document.getElementById("descriptionN").value.trim();


    if (titleN.value == "" || descriptionN.value == "") {
        Swal.fire(
            'Preencha todos os campos!',
            '',
            'warning'
        )
    } else {

        if (document.getElementById("tipoDest").value == 1) {
            data.prisonerDestId = document.getElementById("Dest").value;
            postRec(data)
        } else {
            data.prisonDestId = document.getElementById("Dest").value;
            postInst(data)
        }

    }

}

//-------------------------------POST DE ANOTAÇÃO INSTITUIÇÃO-------------------------------
async function postInst(data) {

    await fetch('http://127.0.0.1:8080/api/prison-annotations', {
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

//-------------------------------POST REC ANOTAÇÃO RECLUSO-------------------------------
async function postRec(data) {

    await fetch('http://127.0.0.1:8080/api/prisoner-annotations', {
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





//-----------------------------------------SELEÇÃO DE TIPO DE DESTINO DAS ANOTAÇÕES-------------------------------

document.getElementById("tipoDest").addEventListener("change", function () {

    if (document.getElementById("tipoDest").value == 1) {
        get_reclusos();
    } else {
        get_instituicoes()
    }


})

//-------------------------------------------------------------------------------------------------------------



