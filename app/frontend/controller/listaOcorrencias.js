$(window).on("load", function () {

    display_instituicoes();

    function display_instituicoes() {
        async function fetchAsync() {

            var conteudo = [];

            const response = await fetch('https://backend-bracelhertz.herokuapp.com/api/alert-logs', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const func = await response.json();
            console.log(func)

            for (const ocorrencia of func) {
                if (ocorrencia.title == null) {
                    t = "";
                } else {
                    t = ocorrencia.title;
                }
                conteudo.push(["<div id='" + ocorrencia.alertLogId + "'>" + ocorrencia.prisonerId.identifierId + "</div>",
                ocorrencia.prisonerId.name,
                ocorrencia.prisonerId.prison.name,
                ocorrencia.createdTimestamp,
                    t])

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



    /*   $("#listaOcorrencias").on('click', 'tr', function () {
           var cRow = $(this).index();
           var clicked = document.getElementById("tabelaRecluso").rows[cRow].firstChild.firstChild.id;
           location.href = "instituicoes.html";
           localStorage.setItem("id_occor_clicked", clicked);
       });*/


})
//----------------------------------------------------------------------------------------------------------------
