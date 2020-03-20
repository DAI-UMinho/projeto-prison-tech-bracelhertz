window.onload = async function () {

    const botaoRegistar = document.getElementById("botaoRegistar");
    botaoRegistar.addEventListener("click", registar);


    async function registar() {
        event.preventDefault();
        var data = {};





        

        data.primeiro_nome = document.getElementById("Fname").value;
        data.ultimo_nome = document.getElementById("Lname").value;
        data.email = document.getElementById("email").value;
        data.data_nascimento = document.getElementById("dataNascimento").value;
        data.username = document.getElementById("usermane").value;
        data.contacto = document.getElementById("contact").value;
        // data.foto = document.getElementById("foto").value;
        data.foto = "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg"
        // data.localidade = document.getElementById("local").value;
        data.localidade = "Fafe";
        //  data.type = document.getElementById("type").value;
        data.id_tipo = 1;
        data.password = document.getElementById("password").value;
        data.nacionalidade = "Portuguesa";
        data.morada = "Rua Puta";



        console.log(data);
        await fetch('http://127.0.0.1:8080/api/user', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data)

        }).then(function (response) {
            if (!response.ok) {
                alert(response);
                throw new Error("ERRO");
            }
            console.log(response);
            return response.json();
        }).then(async function (result) {
            console.log(result);
            if (result) {
                swal("Sucesso!", "Registou um novo Utilizador com sucesso!", "success");
            }
        }).catch(function (err) {
            swal("Erro!", "Erro!", "error");
        })
    }
};



