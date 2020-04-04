$(window).on("load", function () {

    display_instituicao();

    function display_instituicao() {
        async function fetchAsync() {

            let id_inst_clicked = localStorage.getItem("id_inst_clicked");
            const response = await fetch('http://127.0.0.1:8080/api/prisons/' + id_inst_clicked, {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const instituicao = await response.json();
            console.log(instituicao);

            //envia a para a pagina
            //document.getElementById("fotoinst").src = instituicao.photo;
            document.getElementById("novo_nome_inst").innerHTML = instituicao.name;
            document.getElementById("nova_morada_inst").innerHTML = instituicao.address;
            document.getElementById("novo_local_inst").innerHTML = instituicao.location;
            document.getElementById("novo_email_inst").innerHTML = instituicao.email;
            document.getElementById("novo_contacto_inst").innerHTML = instituicao.contact;
            document.getElementById("prisonDescrip").value = instituicao.description;
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));


    }
})


//--------------------------------------EDITAR PERFIL-----------------------------------------------------

document.getElementById("perfil_save_2").addEventListener("click", editar);

async function editar() {
    event.preventDefault();

    //let id_instituicao_clicked = localStorage.getItem("id_instituicao_clicked");
    //  const response = await fetch('----ROTA PARA INSTITUIÇÃO----' + id_instituicao_clicked);
    // const instituicao = await response.json();

    data = {};

    data.foto = document.getElementById("fotoinst").src;
    data.name = document.getElementById("novo_nome_inst").innerHTML;
    data.location = document.getElementById("novo_local_inst").innerHTML;
    data.address = document.getElementById("nova_morada_inst").innerHTML;
    data.contact = document.getElementById("novo_contacto_inst").innerHTML;
    data.email = document.getElementById("novo_email_inst").innerHTML;
    data.description = document.getElementById("prisonDescrip").value;

    console.log(data);
}

