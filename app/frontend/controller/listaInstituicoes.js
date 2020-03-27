$(window).on("load", function () {

    display_instituicoes();

    function display_instituicoes() {
        async function fetchAsync() {

            //const response = await fetch('http://127.0.0.1:8080/api/instituicao');
            //const func = await response.json();

            var conteudo = [];

            var func = [
                {
                    idInstituicao: 1,
                    nome: "Uminho",
                    descricao: "balasdfasdfsadfd",
                    morada: "Gualtar",
                    localidade: "Braga",
                    foto: "img/gualtar.jfif",
                    email: "uminho@gmail.com",
                    contacto: "123456789"
                },
                {
                    idInstituicao: 2,
                    nome: "Uminho",
                    descricao: "hmjnbvcxz",
                    morada: "Azurém",
                    localidade: "Guimarães",
                    foto: "img/azurem.jpg",
                    email: "uminho@hotmail.com",
                    contacto: "123456789"
                }
            ];


            for (const instituicao of func) {
                conteudo.push(["<div id='" + instituicao.idInstituicao + "'>" + instituicao.nome + "</div>",
                instituicao.localidade,
                instituicao.email,
                instituicao.contacto])
            }

            $(document).ready(function () {
                $('#dataTable').DataTable({
                    data: conteudo
                });
            });

        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

    }



    $("#tabelaInstituicoes").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaInstituicoes").rows[cRow].firstChild.firstChild.id;
        location.href = "instituicao.html";
        localStorage.setItem("id_inst_clicked", clicked);
    });


})
//----------------------------------------------------------------------------------------------------------------
