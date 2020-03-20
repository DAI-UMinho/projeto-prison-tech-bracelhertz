$( window ).on( "load", function () {

    display_funcionarios();
    

    function display_funcionarios() {
        async function fetchAsync() {
            const conteudo = document.getElementById("tabelaRecluso");

            var conteudo1 = "";

            const response = await fetch('http://127.0.0.1:8080/api/recluso');
            const func = await response.json();

            for (const recluso of func) {
               // var newRow = conteudo.insertRow();
                conteudo1 += "<tr onclick='GFG_click(" + recluso.id_user + ")'>";
                conteudo1 += "<td><div type='button'>" + recluso.username + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + recluso.primeiro_nome + " " + funcionario.ultimo_nome + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + recluso.contacto + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + recluso.instituicao + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + recluso.nivel_ameaca + "</div></td> ";
                conteudo1 += "<td><div type='button'>" + recluso.cela + "</div></td></tr> ";

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
    location.href = "recluso.html";
    localStorage.setItem("id_user_clicked", clicked);

}
