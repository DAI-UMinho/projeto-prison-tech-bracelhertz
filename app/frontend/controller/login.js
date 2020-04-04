window.onload = async function () {
var pi = 0;
    const botaoLogin = document.getElementById("botaoLogin");


    botaoLogin.addEventListener("click", entrar);
    vid_take.addEventListener("click", entrar2);


    async function entrar() {
        event.preventDefault();
        var data = {};

        data.username = document.getElementById("username").value;
        data.password = document.getElementById("password").value;
        console.log(data);

        fetch('http://127.0.0.1:8080/api/auth/signin', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(function (response) {

                console.log(response);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(async function (result) {
                if (result) {
                    console.log(result);
                    localStorage.setItem("userLogado", result.userId);
                    localStorage.setItem("RoleLogado", result.role);

                    swal("Sucesso!",
                        "Autenticado com sucesso!",
                        "success")
                        .then(() => {
                            window.location.replace("./avisos.html");
                        })

                } else {
                    Swal.fire(
                        'Os dados que inseriu não estão corretos!',
                        '',
                        'warning'
                    )
                    console.log(result);

                }

            });

    };




    //----------------------Just for fun-------------------------------------------
    async function entrar2() {
        event.preventDefault();
        var data = {};

        data.username = "a89218";
        data.password = "Aa123456";
        console.log(data);

        fetch('http://127.0.0.1:8080/api/auth/signin', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include'
        })
            .then(function (response) {

                console.log(response);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .catch(function (err) {
                console.log(err);
            })
            .then(async function (result) {
                if (result) {
                    console.log(result);
                    localStorage.setItem("userLogado", result.userId);
                    localStorage.setItem("RoleLogado", result.role);
                    setTimeout(function () {

                        if(pi==0){
                            
                            swal("Sucesso!",
                            "Autenticado com sucesso!",
                            "success")
                        .then(() => {
                            window.location.replace("./avisos.html");
                        })
                        }else{
                         //   pi-=1;
                            Swal.fire(
                                'Não foi reconhecido nenhum rosto!',
                                '',
                                'warning'
                            )
                        }


                    }, 3000);


                } else {
                    Swal.fire(
                        'Os dados que inseriu não estão corretos!',
                        '',
                        'warning'
                    )
                    console.log(result);

                }

            });

    };







};
