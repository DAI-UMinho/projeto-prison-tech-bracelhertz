$(window).on("load", function () {

    display_instituicao();

    function display_instituicao() {
        async function fetchAsync() {
            //let id_instituicao_clicked = localStorage.getItem("id_instituicao_clicked");
            //  const response = await fetch('----ROTA PARA INSTITUIÇÃO----' + id_instituicao_clicked);
            // const instituicao = await response.json();
            //  console.log(dados);

            var instituicao = {
                id: "89198",
                nome: "Centro prisional de Braga",
                morada: "Rua Cardoso da Saudade nº15",
                localidade: "Braga",
                email: "braga.prisao@gmail.com",
                contacto: "253789999",
                foto: "img/evora2.jpg",
                foto2: "img/evora.jpg",

            }
            //criação da demonstração de resultados recebidos


            //envia a para a pagina
            document.getElementById("fotoinst").src = instituicao.foto;
            document.getElementById("fotoinst2").src = instituicao.foto2;
            document.getElementById("id_instituicao").innerHTML = instituicao.id;
            document.getElementById("nome_inst").innerHTML = instituicao.nome;
            document.getElementById("morada_inst").innerHTML = instituicao.morada;
            document.getElementById("localidade_inst").innerHTML = instituicao.localidade;
            document.getElementById("email_inst").innerHTML = instituicao.email;
            document.getElementById("contacto_inst").innerHTML = instituicao.contacto;
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

    var instituicao = {
        id: "89198",
        nome: "Centro prisional de Braga",
        morada: "Rua Cardoso da Saudade nº15",
        localidade: "Braga",
        email: "braga.prisao@gmail.com",
        contacto: "253789999",
        foto: "img/evora2.jpg",
        foto2: "img/evora.jpg",
    }
    data = {};

    data.foto = document.getElementById("fotoinst").src;
    data.foto2 = document.getElementById("fotoinst2").src;
    data.id = instituicao.id_instituicao;
    data.nome = instituicao.nome_inst;
    data.localidade = instituicao.localidade_inst;
    data.morada = instituicao.morada_inst;
    data.contacto = document.getElementById("novo_contacto_inst").innerHTML;
    data.email = document.getElementById("novo_email_inst").innerHTML;

    console.log(data);
}

