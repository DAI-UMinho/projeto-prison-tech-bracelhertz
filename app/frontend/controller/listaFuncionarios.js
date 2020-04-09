$(window).on("load", function () {
    let userLogado = localStorage.getItem("userLogado");
    
    display_funcionarios();


    function display_funcionarios() {
        async function fetchAsync() {

            var conteudo = [];

            const response = await fetch('http://127.0.0.1:8080/api/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            const func = await response.json();
            console.log(func);


            for (const funcionario of func) {
                if (funcionario.userId !== parseInt(userLogado)) {
                    conteudo.push(["<div id='" + funcionario.userId + "'>" + funcionario.username + "</div>",
                    funcionario.name,
                    funcionario.prison.name,
                    funcionario.email,
                    funcionario.roles[0].name])
                }


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
        if (typeof clicked !== 'undefined') {
            location.href = "funcionario.html";
            localStorage.setItem("id_user_clicked", clicked);
        }

    });

})
//----------------------------------------------------------------------------------------------------------------

