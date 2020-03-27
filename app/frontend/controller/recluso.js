$(window).on("load", function () {

    display_recluso();

    function display_recluso() {
        async function fetchAsync() {
            //let id_user_clicked = localStorage.getItem("id_user_clicked");
            //  const response = await fetch('http://127.0.0.1:8080/api/recluso/' + id_user_clicked);
            // const recluso = await response.json();
            //  console.log(perfil);

            var recluso = {
                idRecluso: "3",
                idIdentificador: "cR123",
                dataNascimento: "2000-01-07",
                nacionalidade: "Portuguesa",
                nome: "carlos Teixeira",
                foto: "img/rec2.jpg",
                contacto: 123456789,
                contactoAlternativo: 987654321,
                idPulseira: 321323,
                idInstituicao: {
                    idInstituicao: 1,
                    nome: "Uminho"
                },
                nivelAmeaca: 10,
                cela: "c14",
                pulsacaoMax: 120,
                pulsacaoMin: 60,
                desligarAlerta: false
            }
            //criação da demonstração de resultados recebidos


            //envia a para a pagina
            document.getElementById("fotoR").src = recluso.foto;
            document.getElementById("id_recluso").innerHTML = recluso.idIdentificador;
            document.getElementById("nome_recluso").innerHTML = recluso.nome;
            document.getElementById("dn_recluso").innerHTML = recluso.dataNascimento;
            document.getElementById("nac_recluso").innerHTML = recluso.nacionalidade;
            document.getElementById("contacto_recluso2").innerHTML = recluso.contacto;
            document.getElementById("contacto_recluso_alternativo2").innerHTML = recluso.contactoAlternativo;
            document.getElementById("n_cela2").innerHTML = recluso.cela;
            document.getElementById("n_ameaca2").innerHTML = recluso.nivelAmeaca;
            document.getElementById("id_instituicao").innerHTML = recluso.idInstituicao.nome;
            document.getElementById("id_pulseira2").innerHTML = recluso.idPulseira;
            document.getElementById("max_pul2").innerHTML = recluso.pulsacaoMax;
            document.getElementById("min_pul2").innerHTML = recluso.pulsacaoMin;

            if (recluso.desligarAlerta) {
                document.getElementById("notiR").checked = false;
            } else {
                document.getElementById("notiR").checked = true;
            }

        }
        //chama a função fetchAsync()
        fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));


    }
})


//--------------------------------------EDITAR PERFIL-----------------------------------------------------

document.getElementById("perfil_save_2").addEventListener("click", editar);

async function editar() {
    event.preventDefault();

    //let id_user_clicked = localStorage.getItem("id_user_clicked");
    //  const response = await fetch('http://127.0.0.1:8080/api/recluso/' + id_user_clicked);
    // const recluso = await response.json();

    var recluso = {
        idRecluso: "3",
        idIdentificador: "cR123",
        dataNascimento: "2000-01-07",
        nacionalidade: "Portuguesa",
        nome: "carlos Teixeira",
        foto: "img/rec2.jpg",
        contacto: 123456789,
        contactoAlternativo: 987654321,
        idPulseira: 321323,
        idInstituicao: {
            idInstituicao: 1,
            nome: "Uminho"
        },
        nivelAmeaca: 10,
        cela: "c14",
        pulsacaoMax: 120,
        pulsacaoMin: 60,
        desligarAlerta: false
    }
    data = {};

    data.foto = document.getElementById("fotoR").src;
    data.idIdentificador = document.getElementById("id_recluso").innerHTML;
    data.nome = recluso.nome;
    data.dataNasciomento = recluso.dataNascimento;
    data.nacionalidade = document.getElementById("nac_recluso").innerHTML;
    data.contacto = parseInt(document.getElementById("contacto_recluso2").innerHTML);
    data.contactoAlternativo =  parseInt(document.getElementById("contacto_recluso_alternativo2").innerHTML);
    data.cela = document.getElementById("n_cela2").innerHTML;
    data.nivelAmeca = parseInt(document.getElementById("n_ameaca2").innerHTML);
    data.idInstituicao = recluso.idInstituicao;
    data.idPulseira = document.getElementById("id_pulseira2").innerHTML;
    data.pulsacaoMax = parseInt(document.getElementById("max_pul2").innerHTML);
    data.pulsacaoMin = parseInt(document.getElementById("min_pul2").innerHTML);
    data.desligarAlerta = document.getElementById("notiR").checked;

    if (document.getElementById("notiR").checked) {
        data.desligarAlerta = false;
    } else {
        data.desligarAlerta = true;
    }

console.log(data);













}

//----------------------------------------------------------------------------------------------------------------

function checkInp() {
    var x = document.getElementById("newNif").value;
    if ((x % 1) != 0) {
        //alert("So aceita numeros");
        return false;
    } else {
        return true;
    }
}