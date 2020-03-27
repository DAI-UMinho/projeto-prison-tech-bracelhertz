$(window).on("load", function () {

    display_instituicoes();

    function display_instituicoes() {
        async function fetchAsync() {

            var conteudo = [];

            //   const response = await fetch('http://127.0.0.1:8080/api/recluso');
            // const func = await response.json();

   /*         var func = [
                {
                    id_user: "1",
                    username: "Ras123",
                    primeiro_nome: "João",
                    ultimo_nome: "Teixeira",
                    contacto: 123456789,
                    id_instituicao: {
                        id_instituicao: 1,
                        nome: "Uminho"
                    },
                    nivel_ameaca: 10,
                    cela: "c14"
                },
                {
                    id_user: "2",
                    username: "Ras123",
                    primeiro_nome: "Manuel",
                    ultimo_nome: "Teixeira",
                    contacto: 123456789,
                    id_instituicao: {
                        id_instituicao: 1,
                        nome: "Uminho"
                    },
                    nivel_ameaca: 10,
                    cela: "c14"
                },
                {
                    id_user: "3",
                    username: "Ras123",
                    primeiro_nome: "carlos",
                    ultimo_nome: "Teixeira",
                    contacto: 123456789,
                    id_instituicao: {
                        id_instituicao: 1,
                        nome: "Uminho"
                    },
                    nivel_ameaca: 10,
                    cela: "c14"
                },
                {
                    id_user: "4",
                    username: "Ras123",
                    primeiro_nome: "Rui",
                    ultimo_nome: "Teixeira",
                    contacto: 123456789,
                    id_instituicao: {
                        id_instituicao: 1,
                        nome: "Uminho"
                    },
                    nivel_ameaca: 10,
                    cela: "c14"
                },
            ];


            for (const recluso of func) {
                conteudo.push([recluso.username,
                recluso.primeiro_nome + " " + recluso.ultimo_nome,
                recluso.contacto,
                recluso.id_instituicao.nome,
                recluso.nivel_ameaca,
                recluso.cela])
            }

            $(document).ready(function () {
                $('#dataTable').DataTable({
                    data: conteudo1
                });
            });*/

        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

    }



    $("#listaOcorrencias").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaRecluso").rows[cRow].firstChild.firstChild.id;
       // location.href = "instituicoes.html";
        localStorage.setItem("id_occor_clicked", clicked);
    });


})
//----------------------------------------------------------------------------------------------------------------
