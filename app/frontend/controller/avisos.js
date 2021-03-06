let RoleLogado = localStorage.getItem("RoleLogado");
let val = 1;
var vamosVer = "";
$(window).on("load", function () {

    avisos();
    get_reclusos();
});

async function avisos() {

    if (val == 1) {
        //-----------------------------------GET PRISIONEIRO-----------------------------------
        const response = await fetch('http://127.0.0.1:8080/api/prisoner-annotations', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const avisos = await response.json();

        display(avisos);
    } else {
        document.getElementById("filtro").value = 2;
        //-----------------------------------GET INSTITUIÇÃO-----------------------------------
        const response = await fetch('http://127.0.0.1:8080/api/prison-annotations', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const avisos = await response.json();

        display(avisos);
    }
    //var t = setTimeout(avisos, 30000);
}


async function display(avisos) {

    let userLogado = localStorage.getItem("userLogado");

    const real_content = document.getElementById("real_content");
    let true_content = "";

    const response1 = await fetch('http://127.0.0.1:8080/api/users/logged-profiles', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    });
    const logado = await response1.json();







    if (avisos == null) {
        true_content += "<div class='w-100'>Não há anotações</div>";
    } else {
        for (const aviso of avisos) {


            const response7 = await fetch('http://127.0.0.1:8080/api/photos/' + aviso[1].photoId, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const photoD = await response7.json();


            true_content += "<div class='card shadow mb-4'>";
            true_content += "<div id='" + aviso[0] + "' class='card-header py-3 d-flex flex-row align-items-center justify-content-between bg-secondary'>";
            true_content += "<h6 class='tab_nome m-0 font-weight-bold text-white'><label>" + aviso[3] + "</label>";
            if (aviso[6] !== null) {
                true_content += "<span data-tooltip='" + getDate6(aviso[6]) + "' data-tooltip-position='bottom' class='text-white font-small font-weight-normal solve'>(Editado)</span>";
            }
            true_content += "</h6>";
            if (userLogado == aviso[1].userId) {
                true_content += "<div onclick='permiteEditar()' id='" + aviso[0] + "podeAlterar' style='padding-right: 10px; display: none;' type='button'><i class='fas fa-check text-white'></i></div>";
                true_content += "<div class='dropdown no-arrow'>";
                true_content += "<a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
                true_content += "<i class='fas fa-ellipsis-v fa-sm fa-fw text-white'></i></a>"
                true_content += "<div class='dropdown-menu dropdown-menu-right shadow animated--fade-in' aria-labelledby='dropdownMenuLink'>";
                true_content += "<div class='dropdown-header text-secondary'>Opções:</div>";
                true_content += "<button onclick='teste(this)' class='dropdown-item'>Editar</button>";
                true_content += "<button onclick='teste(this)' class='dropdown-item' >Apagar</button>";
                true_content += "<a class='dropdown-item' href='#'></a></div></div>";
            }
            true_content += "</div>";
            true_content += "<div class='card-body'><div style='margin-top:-12px;'class='text-primary'>";
            true_content += "<img class='img-profile rounded-circle picNotes' src=" + "data:image/png;base64," + photoD.picByte + "> " + aviso[1].name + " (" + aviso[1].username + ")";
            true_content += " <span class='text-xs'> " + getDate5(aviso[5]) + "</span></div><br>";

            if (document.getElementById("filtro").value == 1) {
                true_content += "<div>Recluso: " + aviso[2].name + " (" + aviso[2].identifierId + ")</div><textarea id='" + aviso[0] + "text' class='1spaceand alterar form-control' style='resize: none; border: none; background-color:transparent;' readonly='true'>" + aviso[4] + "</textarea>";
            } else {
                true_content += "<div>Instituição: " + aviso[2].name + "</div><textarea id='" + aviso[0] + "text' class='1spaceand alterar form-control' style='resize: none; border: none; background-color:transparent;' readonly='true'>" + aviso[4] + "</textarea>";
            }






            const response1 = await fetch('http://127.0.0.1:8080/api/comments/annotations/' + aviso[0], {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const comentarios = await response1.json();





            if (comentarios !== null) {
                true_content += "<div class='w-100'> Comentários: </div>";
                true_content += "<div class='text-black caixa-de-comentario no-border'>";
                for (const comentario of comentarios) {


                    const response8 = await fetch('http://127.0.0.1:8080/api/photos/' + comentario[1].photoId, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        method: 'GET',
                        credentials: 'include'
                    });
                    const photoC = await response8.json();

                    true_content += "<div class='caixa-de-cometario-interior mt-1 mg-1 full_tab90' id='" + comentario[0] + "'><div class='comentario2 tab_nome'>";
                    true_content += "<div class='w-100'><img class='img-profile rounded-circle picNotes mt-1 ml-1' src=" + "data:image/png;base64," + photoC.picByte + "> " + comentario[1].name + "</div>";
                    true_content += "<textarea id='" + comentario[0] + "coment' class='1spaceand font-small text-gray-600 my-1 ml-3'";
                    true_content += "readonly='true' style='width: 90%; background-color: transparent; resize: none; border: none; height: 24px; overflow-y: hidden;'>";
                    true_content += "" + comentario[4] + "</textarea></div>";


                    if (comentario[1].userId == logado.userId) {
                        true_content += "<div onclick='permiteEditarComent()' id='" + comentario[0] + "podeAlterarC'  style='display:none; padding-left: 5px; padding-right:10px; background-color: #fed8b1; cursor: pointer;'><i class='fas fa-check text-white'></i></div>";
                        true_content += "<div class='dropdown no-arrow tab_time' style='background-color: #fed8b1; cursor: pointer;'";
                        true_content += "<a class='dropdown-toggle' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>";
                        true_content += "<i class='fas fa-ellipsis-v fa-sm fa-fw text-white'></i></a>";
                        true_content += "<div class='dropdown-menu dropdown-menu-right shadow animated--fade-in' aria-labelledby='dropdownMenuLink' x-placement='top-end'";
                        true_content += "style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(-142px, 1px, 0px);'>";
                        true_content += "<div class='dropdown-header text-secondary'>Opções:</div>";
                        true_content += "<button onclick='teste2(this)' class='dropdown-item'>Editar</button>";
                        true_content += "<button onclick='teste2(this)' class='dropdown-item'>Apagar</button>";
                        true_content += "</div></div>";

                    }
                    true_content += "</div>";

                }
                true_content += "</div>"
            }



            true_content += "<div class='input-group'><input id='" + aviso[0] + "Input' type='text' class='1spaceand form-control bg-light border-0 small mt-2' placeholder='Comente aqui...' aria-label='Add' aria-describedby='basic-addon2'>"
            true_content += "<div class='input-group-append'><button onclick='subComent(this.id)' id='" + aviso[0] + "Submit' class='btn btn-secondary mt-2' type='button'>"
            true_content += "<i class='fas fa-envelope fa-sm'></i></button></div></div></div></div></div>"

        }
    }



    //envia a para a pagina
    real_content.innerHTML = true_content;


    //----------Só aceita letras e um espaço e pontos, virgulas----- regex-----------
    $('.1spaceand').keyup(function () {
        var $th = $(this);
        $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú\d.,!?()$€ªº:@_\-']/g, ' '));
        $th.val($th.val().replace(/^\s*/, ''));
    })



}








//-----------------------------------------SELEÇÃO DE TIPO DE DESTINO DAS ANOTAÇÕES A MOSTRAR-------------------------------

document.getElementById("filtro").addEventListener("change", async function () {

    if (document.getElementById("filtro").value == 1) {
        val = 1;
        const response4 = await fetch('http://127.0.0.1:8080/api/prisoner-annotations', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const avisos = await response4.json();

        display(avisos);
    } else {
        val = 2;
        const response5 = await fetch('http://127.0.0.1:8080/api/prison-annotations', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const avisos = await response5.json();

        display(avisos);
    }


})








//---------------------------------------------------DISPLAY POST INSTITUIÇÕES------------------------------------------------

async function get_instituicoes() {


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




//---------------------------------------------------DISPLAY POST PRISIONEIROS------------------------------------------------

async function get_reclusos() {

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
            document.getElementById("titleN").value = "";
            document.getElementById("descriptionN").value = "";
            $('#NotaModal').modal('hide');
            avisos();

        }
    }).catch(function (err) {
        swal("Erro!", "Erro!", "error");
    })

}

//-------------------------------POST DE ANOTAÇÃO RECLUSO-------------------------------
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
            document.getElementById("titleN").value = "";
            document.getElementById("descriptionN").value = "";
            $('#NotaModal').modal('hide');
            avisos();
        }
    }).catch(function (err) {
        swal("Erro!", "Erro!", "error");
    })

}





//-----------------------------------------SELEÇÃO DE TIPO DE DESTINO DAS ANOTAÇÕES-------------------------------

document.getElementById("tipoDest").addEventListener("change", mudarDestino);

function mudarDestino() {

    if (document.getElementById("tipoDest").value == 1) {
        get_reclusos();
    } else {
        get_instituicoes()
    }

}


document.getElementById("filtro").addEventListener("change", function () {

    if (document.getElementById("filtro").value == 1) {
        document.getElementById("tipoDest").value = 1;
        mudarDestino();
    } else {
        document.getElementById("tipoDest").value = 2;
        mudarDestino();
    }



})

//---------------------------------------------DATA FORMAT-------------------------------------------------------

function getDate5(date) {
    var today = new Date(date);
    var d = today.getDate();
    var mo = today.getMonth()
    var a = today.getFullYear();
    d = checkTime(d);
    mo = checkTime(mo + 1);
    return d + "-" + mo + "-" + a;
}

function getDate6(date) {
    var dias = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    var today = new Date(date);
    var dia = today.getDay();
    var d = today.getDate();
    var mo = today.getMonth();
    var a = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    d = checkTime(d);
    mo = checkTime(mo + 1);
    return dias[dia] + " " + d + " " + mo + " " + a + " " + h + ":" + m + "h";
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

//-----------------------------------------------DELETE ANOTAÇÃO-----------------------------------------------
document.getElementById("botaoConf").addEventListener("click", async function () {


    fetch('http://127.0.0.1:8080/api/prisons-annotations/' + anotDelete, {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'DELETE',
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

                anotDelete = "";
                $('#confModal').modal('hide');

                if (document.getElementById("filtro").value == 1) {
                    val = 1;
                    avisos();
                } else {
                    val = 2;
                    avisos();
                }


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


})

//-----------------------------------------------GET ID PARA APAGAR OU EDITAR ANOTAÇÃO------------------------------------
var anotDelete = "";
function teste(este) {

    if (este.innerHTML == "Apagar") {
        $("#confModal").modal();
        anotDelete = parseInt(este.closest('[id]').id);
    } else {
        ativarEdit(este.closest('[id]').id);
    }
}


//-----------------------------------------------ATIVAR EDITAR ANOTAÇÃO------------------------------------------
var anotEdit = "";
function ativarEdit(id) {
    anotEdit = id;
    document.getElementById(id + "podeAlterar").style.display = "block";
    document.getElementById(id + "text").readOnly = false;
    document.getElementById(id + "text").style.border = "1px solid #d1d3e2";
}

function permiteEditar() {
    editarAnotacao(anotEdit);
    anotEdit = "";
}


//-----------------------------------------------EDITAR ANOTAÇÃO-----------------------------------------------

async function editarAnotacao(id) {
    var data = {};

    data.annotationId = parseInt(id);
    data.title = document.getElementById(id).children[0].children[0].innerHTML;
    data.description = document.getElementById(id + "text").value;



    fetch('http://127.0.0.1:8080/api/annotations', {
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

                if (document.getElementById("filtro").value == 1) {
                    val = 1;
                    avisos();
                } else {
                    val = 2;
                    avisos();
                }

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


//-----------------------------------------------GET ID PARA APAGAR OU EDITAR ANOTAÇÃO COMENTÁRIO------------------------------------
function teste2(este) {

    if (este.innerHTML == "Apagar") {
        eliminarComentario(parseInt(este.closest('[id]').id));
    } else {
        ativEditComent(este.closest('[id]').id);
    }
}


//-----------------------------------------------ATIVAR EDITAR COMENTÁRIO------------------------------------------
var comentEdit = "";
function ativEditComent(id) {
    comentEdit = id;
    document.getElementById(id + "podeAlterarC").style.display = "table-cell";
    document.getElementById(id + "podeAlterarC").style.verticalAlign = "middle";
    document.getElementById(id + "coment").readOnly = false;
    document.getElementById(id + "coment").style.border = "1px solid #c0c0c0";
}

function permiteEditarComent() {
    editarComentario(comentEdit);
    comentEdit = "";
}

//-----------------------------------------------EDITAR COMENTÁRIO-----------------------------------------------

async function editarComentario(id) {
    var data = {};

    data.annotationId = parseInt(id);
    data.title = "comentario";
    data.description = document.getElementById(id + "coment").value;



    fetch('http://127.0.0.1:8080/api/annotations', {
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

                if (document.getElementById("filtro").value == 1) {
                    val = 1;
                    avisos();
                } else {
                    val = 2;
                    avisos();
                }

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

//--------------------------------------------------------DELETE COMENTÁRIO-------------------------------------------------------
async function eliminarComentario(anotDelete) {


    fetch('http://127.0.0.1:8080/api/prisons-annotations/' + anotDelete, {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'DELETE',
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


                if (document.getElementById("filtro").value == 1) {
                    val = 1;
                    avisos();
                } else {
                    val = 2;
                    avisos();
                }


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



//---------------------------------------------------------POST COMENTÁRIO---------------------------------------------------------

async function subComent(idbtn) {
    var id = idbtn.replace('Submit', '');

    var descrip = document.getElementById(id + "Input").value.trim();
    var tit = document.getElementById(id).children[0].children[0].innerHTML;

    var dat = {};

    dat.annotationDestId = parseInt(id);
    dat.title = tit;
    dat.description = descrip;

    if (descrip !== "") {


        if (document.getElementById("filtro").value == 1) {
            await fetch('http://127.0.0.1:8080/api/comments/prisoner-annotations', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(dat)

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

                    if (document.getElementById("filtro").value == 1) {
                        val = 1;
                        avisos();
                    } else {
                        val = 2;
                        avisos();
                    }
                }
            }).catch(function (err) {
                swal("Erro!", "Erro!", "error").then(() => {
                    location.reload();
                });
            })


        } else {

            await fetch('http://127.0.0.1:8080/api/comments/prison-annotations', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(dat)

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

                    if (document.getElementById("filtro").value == 1) {
                        val = 1;
                        avisos();
                    } else {
                        val = 2;
                        avisos();
                    }

                }
            }).catch(function (err) {
                swal("Erro!", "Erro!", "error").then(() => {
                    location.reload();
                });
            })

        }


    }


}

//----------Só aceita letras e um espaço e pontos, virgulas----- regex-----------
$('.1spaceand').keyup(function () {
    var $th = $(this);
    $th.val($th.val().replace(/(\s{2,})|[^a-zA-Zà-úÀ-Ú\d.,!?()$€ªº:@_\-']/g, ' '));
    $th.val($th.val().replace(/^\s*/, ''));
})