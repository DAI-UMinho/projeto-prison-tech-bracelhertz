$(window).on("load", function () {

    display_instituicoes();

    function display_instituicoes() {
        async function fetchAsync() {

            var conteudo = [];

            const response = await fetch('http://127.0.0.1:8080/api/alert-logs', {
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
                conteudo.push([ocorrencia.prisoner.identifierId,
                ocorrencia.prisoner.name,
                ocorrencia.prisoner.prison.name,
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

       
})
//----------------------------------------------------------------------------------------------------------------
