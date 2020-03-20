$( window ).on( "load", function () {

    display_funcionarios();
    

    function display_funcionarios() {
        async function fetchAsync() {
            const conteudo = document.getElementById("tabelaFuncionarios");

            var conteudo1 = "";

            const response = await fetch('http://127.0.0.1:8080/api/user');
            const func = await response.json();

            for (const funcionario of func) {
               // var newRow = conteudo.insertRow();
                conteudo1 += "<tr onclick='GFG_click(" + funcionario.id_user + ")'>";
                conteudo1 += "<td><div type='button'>" + funcionario.username + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + funcionario.primeiro_nome + " " + funcionario.ultimo_nome + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + funcionario.id_instituicao.nome + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + funcionario.email + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + funcionario.contacto + "</div></td></tr> ";

            }
            conteudo.innerHTML = conteudo1;

            
              
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

        
    }




})
//----------------------------------------------------------------------------------------------------------------

function GFG_click(clicked) {
    //console.log(clicked);
    location.href = "funcionario.html";
    localStorage.setItem("id_user_clicked", clicked);

}
