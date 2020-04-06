$(window).on("load", function () {

    display_reclusos();



    function display_reclusos() {
        async function fetchAsync() {
            let RoleLogado = localStorage.getItem("RoleLogado");
            var conteudo = [];

            if (RoleLogado == "ROLE_GUARD") {
                const response = await fetch('http://127.0.0.1:8080/api/prisoners/by-guards', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include'
                });
                const func = await response.json();
                display(func);

            } else {
                const response = await fetch('http://127.0.0.1:8080/api/prisoners', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    method: 'GET',
                    credentials: 'include'
                });
                const func = await response.json();
                display(func);

                document.getElementById("esconder").style.display="inline";
            }

            function display(func) {

                for (const recluso of func) {

                    conteudo.push(["<div id='" + recluso.prisonerId + "'>" + recluso.identifierId + "</div>",
                    recluso.name,
                    recluso.contact,
                    recluso.prison.name,
                    recluso.threatLevel,
                    recluso.cell])

                }

                $(document).ready(function () {
                    $('#dataTable').DataTable({
                        data: conteudo
                    });
                });

            }




        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

    }

    $("#tabelaRecluso").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaRecluso").rows[cRow].firstChild.firstChild.id;
        if (typeof clicked !== 'undefined') {
            location.href = "recluso.html";
            localStorage.setItem("id_user_clicked", clicked);
        }
    });

})
//----------------------------------------------------------------------------------------------------------------


