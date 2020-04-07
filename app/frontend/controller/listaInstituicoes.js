$(window).on("load", function () {
    let RoleLogado = localStorage.getItem("RoleLogado");
    display_instituicoes();



    if(RoleLogado == "ROLE_NETWORKMAN"){
        document.getElementById("esconder").style.display="inline";
    }

    function display_instituicoes() {
        async function fetchAsync() {

            const response = await fetch('http://127.0.0.1:8080/api/prisons', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const func = await response.json();

            var conteudo = [];


            for (const instituicao of func) {
                conteudo.push(["<div id='" + instituicao.prisonId + "'>" + instituicao.name + "</div>",
                instituicao.location,
                instituicao.email,
                instituicao.contact])
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
        if (typeof clicked !== 'undefined') {
            location.href = "instituicao.html";
            localStorage.setItem("id_inst_clicked", clicked);
        }

    });


})
//----------------------------------------------------------------------------------------------------------------
