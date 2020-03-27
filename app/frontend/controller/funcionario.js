$(window).on("load", function () {

    display_perfil();

    function display_perfil() {
        async function fetchAsync() {
            let id_user_clicked = localStorage.getItem("id_user_clicked");
            const response = await fetch('http://127.0.0.1:8080/api/user/' + id_user_clicked);
            const perfil = await response.json();
            console.log(perfil);

            var funcao = "";

            //criação da demonstração de resultados recebidos


            //envia a para a pagina
            if (perfil.idTipo == 0) {
                funcao = "Guarda Prisional";
            } else if (perfil.idTipo == 1) {
                funcao = "Gestor da Instituição";
            } else if (perfil.idTipo == 2) {
                funcao = "Gestor da Rede Prisional";
            } else {
                funcao = "undifined";
            }

            document.getElementById("funcaoF").innerHTML = funcao;
            document.getElementById("nFuncionario").innerHTML = perfil.username;
            document.getElementById("InstituicaoF").innerHTML = perfil.idInstituicao.nome;
            document.getElementById("dataNascimentoF").innerHTML = perfil.dataNascimento;
            document.getElementById("nacionalidadeF").innerHTML = perfil.nacionalidade;
            document.getElementById("moradaF").innerHTML = perfil.morada;
            document.getElementById("localidadeF").innerHTML = perfil.localidade;
            document.getElementById("nomeF").innerHTML = perfil.nome;
            document.getElementById("imagemPerfil").src = perfil.foto;
            document.getElementById("contactoF").innerHTML = perfil.contacto;
            document.getElementById("emailF").innerHTML = perfil.email;



        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
        //var t = setTimeout(display_logs, 60000);
    }
})
//----------------------------------------------------------------------------------------------------------------

