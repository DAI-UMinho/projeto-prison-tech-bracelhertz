$(window).on("load", function () {
    
    //avisos();


    function avisos() {
        async function fetchAsync() {
            const real_content = document.getElementById("real_content");
           


            let true_content = "";
            
 
            const avisos = [
                {
                    utilizador:{
                        nome: "pessoa",
                        img:"img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",
                    
                    comentarios:[{
                        owner_img:"img/mm.jpg",
                        owner:"pessoa1",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa2",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa3",
                        content:"Aloooooooooo"
                    }
                ],
                    editado:{
                        lastUpdatedTimestamp: "'Dec 31 2019 22:02:09'",
                        value: true,
                    }
                   
                },
                {
                    utilizador:{
                        nome: "pessoa",
                        img:"img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",
                    
                    
                    comentarios:[{
                        owner_img:"img/mm.jpg",
                        owner:"pessoa1",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa2",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa3",
                        content:"Aloooooooooo"
                    }
                ],
                    editado:{
                        lastUpdatedTimestamp: "'Dec 31 2019 22:02:09'",
                        value: true,
                    }
                   
                },
                {
                    utilizador:{
                        nome: "pessoa",
                        img:"img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: "22:02:09",
                    
                    
                    comentarios:[{
                        owner_img:"img/mm.jpg",
                        owner:"pessoa1",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa2",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa3",
                        content:"Aloooooooooo"
                    }
                ],
                    editado:{
                        
                        value: false,
                    }
                   
                },
                {
                    utilizador:{
                        nome: "pessoa",
                        img:"img/mm.jpg",
                    },
                    idReclusoDestino: 123,
                    titulo: "Ola",
                    descricao: "Aloooooooooo",
                    createdTimestamp: '22:02:09',
                    
                    
                    comentarios:[{
                        owner_img:"img/mm.jpg",
                        owner:"pessoa1",
                        content:"Aloooooooooo"
                    },
                    {
                        owner_img:"img/mm.jpg",
                        owner:"pessoa2",
                        content:"Aloooooooooo"
                    },
                ],
                    editado:{   
                        value: false,
                    }
                   
                },
            ]
            

           /* const response = await fetch('http://127.0.0.1:8080/api/user');
            const func = await response.json();*/
            /*
            const comentarios = [
                {
                    owner: "Wed Dec 31 2019 22:02:09 GMT+0000",
                    owner_img: "img/campos/imagem-campo.jpg",
                    content: "Wed Dec 31 2019 22:02:09 GMT+0000"

                },
                
            ]
*/


            //criação da demonstração de resultados recebidos
                
                
                for (const aviso of avisos) {
                    true_content += "<div class='card shadow mb-4'>";
                    true_content += "<div class='card-header py-3 d-flex flex-row align-items-center justify-content-between bg-secondary'>"
                    true_content += "<h6 class='m-0 font-weight-bold text-white'>"+aviso.titulo+""
                    if(aviso.editado.value == true){   
                        true_content += "<span data-tooltip=" + aviso.editado.lastUpdatedTimestamp+ " data-tooltip-position='bottom' class='text-white font-small font-weight-normal solve'>(Editado)</span>"                         
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
                    true_content += "<img class='img-profile rounded-circle picNotes' src="+aviso.utilizador.img+ "> " +aviso.utilizador.nome+ " <span class='text-xs'> " +aviso.createdTimestamp+ "</span></div><br><div>Recluso: " +aviso.idReclusoDestino+ "</div><div class='mt-3'>" +aviso.descricao+ "</div>";
                    if(aviso.comentarios.length == 0){

                    }else{
                        true_content +=  "<div class='text-black caixa-de-comentario no-border'>";
                        for (const comentario of aviso.comentarios){

                            
                            true_content += "<div class='caixa-de-cometario-interior mt-1 mg-1'><div class='comentario2'>";
                            true_content += "<img class='img-profile rounded-circle picNotes mt-1 ml-1' src="+comentario.owner_img+ "> "+comentario.owner+ " <div class='font-small text-gray-600 ml-3 mb-1 mt-1'>";
                            true_content += ""+comentario.content+ "</div></div></div>";
    
                        }
                        true_content += "</div>"
                    }
                    
                    
                
                   /*if(aviso.comentarios.lenght === null){
                    true_content +="<div class='w-100'><div class='text-black-50 text-center'>Não há comentários</div></div>";
                   } else{
                    for(var i = 0; i<avisos.comentarios[i].length; i++) {
                    true_content +=  "<div class='text-black caixa-de-comentario no-border'>";
                    
                    
                    true_content += "<div class='caixa-de-cometario-interior mt-1 mg-1'><div class='comentario2'>";
                    true_content += "<img class='img-profile rounded-circle picNotes mt-1 ml-1' src='"+avisos[j].comentarios[i].owner_img+ "'> '"+avisos[j].comentarios[i].owner+ "' <div class='font-small text-gray-600 ml-3 mb-1 mt-1'>";
                    true_content += "'"+avisos[j].comentarios[i].content+ "'</div></div></div></div>";
                       }
                }*/
                
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
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  function changeTooltip() {
    document.getElementById('cona').setAttribute('data-tooltip', aviso.editado.lastUpdatedTimestamp);
  }



/*function GFG_clickEditar(clicked) {
    //alert(clicked); 
   localStorage.setItem("id_", clicked);
}*/


//filtro

/*function filterContent() {
    var user = document.getElementById("filtro").value;
    var contentA = document.getElementById("contentA");
    var contentB = document.getElementById("contentB");
    var contentC = document.getElementById("contentC");
    if(user=="A") {
        contentA.style.display="block";
        contentB.style.display="block";
        contentC.style.display="block";
    } else if (user=="B") {
        contentA.style.display="none";
        contentB.style.display="block";
        contentC.style.display="block";
    } else if (user=="C") {
        contentA.style.display="none";
        contentB.style.display="none";
        contentC.style.display="block";
    }
}*/

const willEdit = document.getElementById("willEdit");
            willEdit.addEventListener("click", function () {
              const showInformation = document.getElementById("show_information");

              let show_information = "";



              show_information +=  "<textarea class='form-control mb-1 textarea2' rows='1' cols='1' placeholder='Recluso'> '"+aviso.recluso+ "' </textarea>"
              show_information +=  "<textarea class='form-control mb-1 textarea2' rows='1' cols='1' placeholder='Assunto'> '"+aviso.name+ "' </textarea>"
              show_information +=  "<textarea class='form-control textarea1' rows='6' cols='60' placeholder='Escreva aqui a nota...'> '"+aviso.content+ "' </textarea>"
              show_information +=  "<div class='modal-footer'><button class='btn btn-secondary' type='button' data-dismiss='modal'>Cancelar</button>"
              show_information +=  "<a class='btn btn-primary' id='enviar_edicao' href='#'>Enviar</a></div>"

              showInformation.innerHTML = show_information;
            });
/*
            const botaoApagar = document.getElementById("apagar_aviso");
            botaoApagar.addEventListener("click", apagarAviso);
            
            
            function apagarAviso() {
            console.log('apagar')
            }
            

            const botaoEditar = document.getElementById("enviar_edicao");
            botaoEditar.addEventListener("click", editarAviso);
            
            
            function editarAviso() {
            console.log('editar')
            }



            
            const botaoCriar = document.getElementById("enviar_novo");
            botaoCriar.addEventListener("click", criarAviso);
            
            
            function criarAviso() {
            console.log('criar')
            }


            const botaoEnviar = document.getElementById("enviar_comentario");
            botaoEnviar.addEventListener("click", enviarComentario);
            
            
            function enviarComentario() {
            console.log('enviar')
            }
*/

            

            
            
            
            
            /*const botaoApagar = document.getElementById("apagar_aviso");
            botaoApagar.addEventListener("click", apagarAviso);
          
            async function apagarAviso() {
                event.preventDefault();
          
                fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/users', {
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
                            //swal({ title: "Autenticação feita com sucesso!" });
                            //+ result.value.message.success);S
                            Swal.fire(
                              'Apagada com sucesso!',
                              '',
                              'success'
                            ).then( () => {
                              window.location.replace("./avisos.html");
                            })*/


    /* Criar anotacao */ 
 
 
    /*const botaoCriarAviso = document.getElementById("botaoCriar");
    botaoCriarAviso.addEventListener("click", criarAviso);*/

   
    /*async function criarAviso() {
        event.preventDefault();
        var data = {};
        data.nome_aviso = document.getElementById("teamname").value;
        data.id_user = localStorage.getItem("id_user");

        

        if(valida_nome(data.nome_equipa)){
            fetch('https://dd10afea8a444651a7975b97cdbc8a11.vfs.cloud9.us-east-2.amazonaws.com/teams', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'POST',
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
                if (result.msg == "success") {
                    //swal({ title: "Autenticação feita com sucesso!" });
                    //+ result.value.message.success);S
                    Swal.fire(
                        'Equipa criada com sucesso!',
                        '',
                        'success'
                      ).then( () => {
                        window.location.replace("./Equipas.html");
                    })
      
                    
                }
                else {
                    if(result[0].msg == "Insira um nome entre 2 a 20 letras!"){
                        Swal.fire(
                            'Insira um nome entre 2 a 20 letras!',
                            '',
                            'warning'
                          )  
                        document.getElementById("teamname").value="";
                    }
                    else{
                    Swal.fire(
                        'Ocorreu um erro!',
                        '',
                        'error'
                      )
                      document.getElementById("teamname").value="";
                    console.log(result);
                    //swal({ title: `${result.value.userMessage.message.pt}` });
                }
                }
            });
        }else{
            Swal.fire(
                'Nome da equipa apenas pode levar letras!',
                '',
                'warning'
              )
        }

    };*/


 /* enviar anotacao editada */ 
 
 
 /*const botaoEditarAviso = document.getElementById("botaoEnviar");
    botaoEditarAviso.addEventListener("click", editarAviso);

 /* enviar comentario 
 const botaoEnviarComentario = document.getElementById("botaoEnviarComentario");
    botaoEnviarComentario.addEventListener("click", enviarComentario);*/


