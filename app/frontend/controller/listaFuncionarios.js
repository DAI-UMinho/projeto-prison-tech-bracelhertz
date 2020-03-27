$(window).on("load", function () {

    display_funcionarios();


    function display_funcionarios() {
        async function fetchAsync() {

            var conteudo = [];

            const response = await fetch('http://127.0.0.1:8080/api/utilizador');
            const func = await response.json();


            for (const funcionario of func) {
                conteudo.push(["<div id='" + funcionario.idUtilizador + "'>" + funcionario.username + "</div>",
                funcionario.nome,
                //funcionario.Instituicao.nome,
                "ola",
                funcionario.email,
                funcionario.contacto])
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

    $("#tabelaFuncionarios").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaFuncionarios").rows[cRow].firstChild.firstChild.id;
        location.href = "funcionario.html";
        localStorage.setItem("id_user_clicked", clicked);
    });

})
//----------------------------------------------------------------------------------------------------------------

