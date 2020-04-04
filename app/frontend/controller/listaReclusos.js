$(window).on("load", function () {

    display_reclusos();



    function display_reclusos() {
        async function fetchAsync() {

            var conteudo = [];


            const response = await fetch('http://127.0.0.1:8080/api/prisoner', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const func = await response.json();



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
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

    }

    $("#tabelaRecluso").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaRecluso").rows[cRow].firstChild.firstChild.id;
        if(typeof clicked !== 'undefined'){
            location.href = "recluso.html";
            localStorage.setItem("id_user_clicked", clicked);
        }
    });

})
//----------------------------------------------------------------------------------------------------------------


