$(window).on("load", function () {

    display_reclusos();



    function display_reclusos() {
        async function fetchAsync() {

            var conteudo = [];
            var conteudo1 = [];


               const response = await fetch('http://127.0.0.1:8080/api/recluso');
             const func = await response.json();

  /*          var func = [
                {
                    idRecluso: "1",
                    idIdentificador: "jo123",
                    nome: "João Teixeira",
                    contacto: 123456789,
                    idInstituicao: {
                        idInstituicao: 1,
                        nome: "Uminho"
                    },
                    nivelAmeaca: 10,
                    cela: "c14"
                },
                {
                    idRecluso: "2",
                    idIdentificador: "man123",
                    nome: "Manuel Teixeira",
                    contacto: 123456789,
                    idInstituicao: {
                        idInstituicao: 1,
                        nome: "Uminho"
                    },
                    nivelAmeaca: 10,
                    cela: "c14"
                },
                {
                    idRecluso: "3",
                    idIdentificador: "cR123",
                    nome: "carlos Teixeira",
                    contacto: 123456789,
                    idInstituicao: {
                        idInstituicao: 1,
                        nome: "Uminho"
                    },
                    nivelAmeaca: 10,
                    cela: "c14"
                },
                {
                    idRecluso: "4",
                    idIdentificador: "Rui123",
                    nome: "Rui Teixeira",
                    contacto: 123456789,
                    idInstituicao: {
                        idInstituicao: 1,
                        nome: "Uminho"
                    },
                    nivelAmeaca: 10,
                    cela: "c14"
                },
            ];*/

            let i = 1;
            for (const recluso of func) {

                conteudo.push(["<div id='" + recluso.idRecluso + "'>" + recluso.idIdentificador + "</div>",
                recluso.nome,
                recluso.contacto,
                recluso.idInstituicao.nome,
                recluso.nivelAmeaca,
                recluso.cela])
                i++;
            }

            $(document).ready(function () {
                $('#dataTable').DataTable({
                    data: conteudo
                });
            });


            /*
                        for (const recluso of func) {
                            console.log(recluso.id_instituicao);
                            // var newRow = conteudo.insertRow();
                            conteudo1 += "<tr onclick='GFG_click(" + recluso.id_user + ")'>";
                            conteudo1 += "<td><div type='button'>" + recluso.username + "</div></td> ";
                            conteudo1 += "<td><div type='button'>" + recluso.primeiro_nome + " " + recluso.ultimo_nome + "</div></td> ";
                            conteudo1 += "<td><div type='button'>" + recluso.contacto + "</div></td> ";
                            conteudo1 += "<td><div type='button'>" + recluso.id_instituicao.nome + "</div></td> ";
                            conteudo1 += "<td><div type='button'>" + recluso.nivel_ameaca + "</div></td> ";
                            conteudo1 += "<td><div type='button'>" + recluso.cela + "</div></td></tr> ";
            
                        }
                        conteudo.innerHTML = conteudo1;*/
        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));

    }

    $("#tabelaRecluso").on('click', 'tr', function () {
        var cRow = $(this).index();
        var clicked = document.getElementById("tabelaRecluso").rows[cRow].firstChild.firstChild.id;
        location.href = "recluso.html";
        localStorage.setItem("id_user_clicked", clicked);
    });

})
//----------------------------------------------------------------------------------------------------------------


