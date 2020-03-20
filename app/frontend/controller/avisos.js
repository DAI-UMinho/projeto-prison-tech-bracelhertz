window.onload = function () {
    avisos();


    function avisos() {
        async function fetchAsync() {
            const real_content = document.getElementById("real_content");

            let true_content = "";

/*
            const reservas = [
                {
                    field: "PlaySoccer",
                    locality: "Fafe",
                    day: "Wed Dec 31 2019 22:02:09 GMT+0000",
                    stars: 4.5,
                    img: "img/campos/imagem-campo.jpg"
                },
                {
                    field: "PlayGreen",
                    locality: "Braga",
                    day: "Wed Jan 01 2019 08:02:09 GMT+0000",
                    stars: 3,
                    img: "img/campos/imagem-campo6.jpg"
                },
                {
                    field: "Marrocos",
                    locality: "Felgueiras",
                    day: "Wed Dec 31 2019 22:02:09 GMT+0000",
                    stars: 2.5,
                    img: "img/campos/imagem-campo2.jpg"
                },
                {
                    field: "Soccer",
                    locality: "Vizela",
                    day: "Wed Dec 31 2019 22:02:09 GMT+0000",
                    stars: 1,
                    img: "img/campos/imagem-campo7.jpg"
                }
            ]
*/


            //criação da demonstração de resultados recebidos
            if (avisos.status == "404") {
                true_content +="<div class='w-100'><div class='text-black-50 text-center'>Não há avisos neste momento</div></div>";
            } else {
                true_content += "<div class='card shadow mb-4'>";
                for (const aviso of avisos) {
                    
                    true_content += "<div class='card-header py-3 d-flex flex-row align-items-center justify-content-between bg-secondary'>"
                    true_content += "<h6 class='m-0 font-weight-bold text-white'>'"+aviso.name+"'"
                    if(editado.status == true){   
                        true_content += "<span data-tooltip=" + aviso.data+ "' data-tooltip-position='bottom' class='text-white font-small font-weight-normal'>(Editado)</span>"                         
                     } else {

                     }  
                    true_content += "</h6><div class='dropdown no-arrow'>"
                    true_content += "<a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"
                    true_content += "<i class='fas fa-ellipsis-v fa-sm fa-fw text-white'></i></a>"
                    true_content += "<div class='dropdown-menu dropdown-menu-right shadow animated--fade-in' aria-labelledby='dropdownMenuLink'>"
                    true_content += "<div class='dropdown-header text-secondary'>Opções:</div>"
                    true_content += "<a class='dropdown-item' data-toggle='modal' data-target='#EditarNotaModal' href='#'>Editar</a>"
                    true_content += "<a class='dropdown-item' href='#''>Apagar</a>"
                    true_content += "<a class='dropdown-item' href='#''></a></div></div></div>"

                    true_content += "<div class='card-body'><div style='margin-top:-12px;'class='text-primary'>"
                    true_content += "<img class='img-profile rounded-circle picNotes' src='img/perfil2.jpg'> '" +aviso.owner+ "' <span class='text-xs'> 12:35</span></div><div class='mt-3'>Dropdown menus can be placed in the card header in order to extend the functionality of a basic card. In this dropdown card example, the Font Awesome vertical ellipsis icon in the card header can be clicked on in order to toggle a dropdown menu.</div>"
                   
                   if(comentarios.num == 0){
                    true_content +="<div class='w-100'><div class='text-black-50 text-center'>Não há comentários</div></div>";
                   } else{
                    true_content +=  "<div class='text-black caixa-de-comentario no-border'></div>";
                    for (const comentario of comentarios){
                    
                    true_content += "<div class='caixa-de-cometario-interior mt-1 mg-1'><div class='comentario2'>"
                    true_content += "<img class='img-profile rounded-circle picNotes mt-1 ml-1' src='"+comentario.owner_img+ "'> '"+comentario.owner+ "' <div class='font-small text-gray-600 ml-3 mb-1 mt-1'>"
                    true_content += "'"+comentario.content+ "'</div></div></div></div></div>"
                   }    
                }
                true_content += "<div class='input-group'><input type='text' class='form-control bg-light border-0 small mt-2' placeholder='Comente aqui...' aria-label='Add' aria-describedby='basic-addon2'>"
                true_content += "<div class='input-group-append'><button class='btn btn-secondary mt-2' type='button'>"
                true_content += "<i class='fas fa-envelope fa-sm'></i></button></div></div></div>"

                }
                true_content += "</div>";
            }

            //envia a para a pagina
            real_content.innerHTML = true_content;


        }
        /*chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));*/
    }
};


/*
function GFG_clickEditar(clicked) {
    //alert(clicked); 
   localStorage.setItem("id_inscricao", clicked);
}*/
