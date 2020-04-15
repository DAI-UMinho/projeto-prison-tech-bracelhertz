let RoleLogado = localStorage.getItem("RoleLogado");
let id_user_clicked = localStorage.getItem("id_user_clicked");
let userLogado = localStorage.getItem("userLogado");
$(window).on("load", function () {

    startTime();
    display_logs();
    display_info();
    //render_Ultimas_Ocorrencias();
    //renderOcorrencias_recluso();

})

function display_logs() {
    async function fetchAsync() {

        var tabelBody = document.getElementById("tabelBody");

        let see_logs = "";
        let listaLogG = "";
        let listaLogR = "";


        if (RoleLogado == "ROLE_MANAGER") {
            const response = await fetch('http://127.0.0.1:8080/api/user-logs/managers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            listaLogG = await response.json();
            console.log(listaLogG);


            const response1 = await fetch('http://127.0.0.1:8080/api/prisoner-logs/managers', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            listaLogR = await response1.json();
            console.log(listaLogR);


        } else if (RoleLogado == "ROLE_NETWORKMAN") {
            const response = await fetch('http://127.0.0.1:8080/api/user-logs', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            listaLogG = await response.json();
            console.log(listaLogG);

            const response1 = await fetch('http://127.0.0.1:8080/api/prisoner-logs', {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'GET',
                credentials: 'include'
            });
            listaLogR = await response1.json();
            console.log(listaLogR);

        }

        //criação da demonstração de resultados recebidos
        if (document.getElementById("tipoDest").value == 1) {

            for (const logG of listaLogG) {

                see_logs += "<td>" + getDate(logG.logTimestamp) + "</td>";
                if (logG.byUser !== null) {
                    see_logs += "<td id='" + logG.byUser.userId + "' type='button' onclick='dothis(this.id)'>" + logG.byUser.name + " (" + logG.byUser.username + ")</td>";
                } else {
                    see_logs += "<td>Utilizador apagado</td>";
                }
                see_logs += "<td>" + logG.description + "</td>";
                if (logG.user == null) {
                    see_logs += "<td>Utilizador apagada</td>";
                } else {
                    see_logs += "<td id='" + logG.user.userId + "' type='button' onclick='dothis(this.id)'>" + logG.user.name + " (" + logG.user.username + ")</td>";
                }

                see_logs += "<td id='" + logG.byUser.prison.prisonId + "' type='button' onclick='dothis2(this.id)'>" + logG.byUser.prison.name + "</td>";
                see_logs += "</tr>";
            }

        } else {

            for (const logR of listaLogR) {

                see_logs += "<td>" + getDate(logR.logTimestamp) + "</td>";
                if (logR.byUser !== null) {
                    see_logs += "<td id='" + logR.byUser.userId + "' type='button' onclick='dothis(this.id)'>" + logR.byUser.name + " (" + logR.byUser.username + ")</td>";
                } else {
                    see_logs += "<td>Utilizador apagado</td>";
                }
                see_logs += "<td>" + logR.description + "</td>";
                if (logR.prisoner !== null) {
                    see_logs += "<td id='" + logR.prisoner.prisonerId + "' type='button' onclick='dothat(this.id)'>" + logR.prisoner.name + " (" + logR.prisoner.identifierId + ")</td>";
                } else {
                    see_logs += "<td>Reclusos apagado</td>";
                }
                see_logs += "<td id='" + logR.byUser.prison.prisonId + "' type='button' onclick='dothis2(this.id)'>" + logR.byUser.prison.name + "</td>";
                see_logs += "</tr>";

            }

        }

        //envia a para a pagina
        tabelBody.innerHTML = see_logs;


    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
    var t = setTimeout(display_logs, 10000);
}

document.getElementById("tipoDest").addEventListener("change", async function () {

    display_logs();

})

//--------------------------------------vai paginas-------------------------------------------

function dothis(id) {
    if (id == userLogado) {
        location.href = "perfil.html";
    } else {
        localStorage.setItem("id_user_clicked", id);
        localStorage.setItem("Anot", "func");
        location.href = "funcionario.html";
    }

}

function dothis2(id) {
    localStorage.setItem("id_inst_clicked", id);
    localStorage.setItem("Anot", "inst");
    location.href = "instituicao.html";
}

function dothat(id) {
    localStorage.setItem("id_user_clicked", id);
    localStorage.setItem("Anot", "rec");
    location.href = "recluso.html";
}





//------------------------------------DISPLAY INFO-------------------------------------------------


function display_info() {
    async function fetchAsync() {

        const response = await fetch('http://127.0.0.1:8080/api/dashboard', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'GET',
            credentials: 'include'
        });
        const info = await response.json();
        console.log(info);

        var nOcorrencias = document.getElementById("nOcorrencias");
        var nFuncionarios = document.getElementById("nFuncionarios");
        var nReclusos = document.getElementById("nReclusos");

        //envia a para a pagina
        nOcorrencias.innerHTML = info.totalAlerts;
        nFuncionarios.innerHTML = info.totalUsers;
        nReclusos.innerHTML = info.totalPrisoners;


    }
    //chama a função fetchAsync()
    fetchAsync().then(data => console.log("done")).catch(reason => console.log(reason.message));
}


//-------------------------------------------------------------------------------------

async function render_Ultimas_Ocorrencias() {
    const response4 = await fetch(/*--------ROTA DA TABELA ALERTA-------*/);
    const ocorrencias = await response4.json();
    const date = new Date();

    //Vari�veis para contagem do numero de atividades dos 12 meses
    var mesAtual = 0; //M�s atual
    var mesPassado = 0; //M�s Anterior
    var doisMesesAtras = 0; //Dois meses atr�s
    var tresMesesAtras = 0; //3 meses atr�s
    var quatroMesesAtras = 0; //4 meses atr�s
    var cincoMesesAtras = 0; //5 meses atr�s
    var seisMesesAtras = 0; //6 meses atr�s
    var seteMesesAtras = 0; //7 meses atr�s
    var oitoMesesAtras = 0; //8 meses atr�s
    var noveMesesAtras = 0; //9 meses atr�s
    var dezMesesAtras = 0; //10 meses atr�s
    var onzeMesesAtras = 0; //11 meses atr�s


    //Labels para legenda do gr�fico
    var lblMesAtual = ""; //M�s atual
    var lblMesAtras = ""; //M�s Anterior
    var lblDoisMesesAtras = ""; //Dois meses atr�s
    var lblTresMesesAtras = ""; //3 meses atr�s
    var lblQuatroMesesAtras = ""; //4 meses atr�s
    var lblCincoMesesAtras = ""; //5 meses atr�s
    var lblSeisMesesAtras = ""; //6 meses atr�s
    var lblSeteMesesAtras = ""; //7 meses atr�s
    var lblOitoMesesAtras = ""; //8 meses atr�s
    var lblNoveMesesAtras = ""; //9 meses atr�s
    var lblDezMesesAtras = ""; //10 meses atr�s
    var lblOnzeMesesAtras = ""; //11 meses atr�s

    //Mes e Ano dos Meses
    var nMes = date.getMonth(); //M�s atual
    var nAno = date.getFullYear();  //M�s atual
    var nMesPassado = 0; //M�s Anterior
    var nAnoPassado = 0; //M�s Anterior
    var nDoisMesesAtras = 0; //Dois meses atr�s
    var nAnoDoisMesesAtras = 0; //Dois meses atr�s
    var nTresMesesAtras = 0; //3 meses atr�s
    var nAnoTresMesesAtras = 0; //3 meses atr�s
    var nQuatroMesesAtras = 0; //4 meses atr�s
    var nAnoQuatroMesesAtras = 0; //4 meses atr�s
    var nCincoMesesAtras = 0; //5 meses atr�s
    var nAnoCincoMesesAtras = 0; //5 meses atr�s
    var nSeisMesesAtras = 0; //6 meses atr�s
    var nAnoSeisMesesAtras = 0; //6 meses atr�s
    var nSeteMesesAtras = 0; //7 meses atr�s
    var nAnoSeteMesesAtras = 0; //7 meses atr�s
    var nOitoMesesAtras = 0; //8 meses atr�s
    var nAnoOitoMesesAtras = 0; //8 meses atr�s
    var nNoveMesesAtras = 0; //9 meses atr�s
    var nAnoNoveMesesAtras = 0; //9 meses atr�s
    var nDezMesesAtras = 0; //10 meses atr�s
    var nAnoDezMesesAtras = 0; //10 meses atr�s
    var nOnzeMesesAtras = 0; //11 meses atr�s
    var nAnoOnzeMesesAtras = 0; //11 meses atr�s

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    if (nMes == 0) //Janeiro
    {
        nMesPassado = 11; //Dezembro
        nAnoPassado = nAno - 1;
        nDoisMesesAtras = 10; //Novembro
        nAnoDoisMesesAtras = nAno - 1;
        nTresMesesAtras = 9; //Outubro
        nAnoTresMesesAtras = nAno - 1;
        nQuatroMesesAtras = 8; //Setembro
        nAnoQuatroMesesAtras = nAno - 1;
        nCincoMesesAtras = 7; //Agosto
        nAnoCincoMesesAtras = nAno - 1;
        nSeisMesesAtras = 6; //Julho
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 5; //Junho
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 4; //Maio
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 3; //Abril
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 2; //Março
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 1; //Fevereiro
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 1) //Fevereiro
    {
        nMesPassado = 0; //Janeiro
        nAnoPassado = nAno;
        nDoisMesesAtras = 11; //Dezembro
        nAnoDoisMesesAtras = nAno - 1;
        nTresMesesAtras = 10; //Novembro
        nAnoTresMesesAtras = nAno - 1;
        nQuatroMesesAtras = 9; //Outubro
        nAnoQuatroMesesAtras = nAno - 1;
        nCincoMesesAtras = 8; //Setembro
        nAnoCincoMesesAtras = nAno - 1;
        nSeisMesesAtras = 7; //Agosto
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 6; //Julho
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 5; //Junho
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 4; //Maio
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 3; //Abril
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 2; //Março
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 2) //Março
    {
        nMesPassado = 1; //Fevereiro
        nAnoPassado = nAno;
        nDoisMesesAtras = 0; //Janeiro
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 11; //Dezembro
        nAnoTresMesesAtras = nAno - 1;
        nQuatroMesesAtras = 10; //Novembro
        nAnoQuatroMesesAtras = nAno - 1;
        nCincoMesesAtras = 9; //Outubro
        nAnoCincoMesesAtras = nAno - 1;
        nSeisMesesAtras = 8; //Setembro
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 7; //Agosto
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 6; //Julho
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 5; //Junho
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 4; //Maio
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 3; //Abril
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 3) //Abril
    {
        nMesPassado = 2; //Março
        nAnoPassado = nAno;
        nDoisMesesAtras = 1; //Fevereiro
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 0; //Janeiro
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 11; //Dezembro
        nAnoQuatroMesesAtras = nAno - 1;
        nCincoMesesAtras = 10; //Noembro
        nAnoCincoMesesAtras = nAno - 1;
        nSeisMesesAtras = 9; //Outubro
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 8; //Setembro
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 7; //Agosto
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 6; //Julho
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 5; //Junho
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 4; //Maio
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 4) //Maio
    {
        nMesPassado = 3; //Abril
        nAnoPassado = nAno;
        nDoisMesesAtras = 2; //Março
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 1; //Fevereiro
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 0; //Janeiro
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 11; //Dezembro
        nAnoCincoMesesAtras = nAno - 1;
        nSeisMesesAtras = 10; //Novembro
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 9; //Outubro
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 8; //Setembro
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 7; //Agosto
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 6; //Julho
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 5; //Junho
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 5) //Junho
    {
        nMesPassado = 4; //Maio
        nAnoPassado = nAno;
        nDoisMesesAtras = 3; //Abril
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 2; //Março
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 1; //Fevereiro
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 0; //Janeiro
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 11; //Dezembro
        nAnoSeisMesesAtras = nAno - 1;
        nSeteMesesAtras = 10; //Novembro
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 9; //Outubro
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 8; //Setembro
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 7; //Agosto
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 6; //Julho
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 6) //Julho
    {
        nMesPassado = 5; //Junho
        nAnoPassado = nAno;
        nDoisMesesAtras = 4; //Maio
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 3; //Abril
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 2; //Março
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 1; //Fevereiro
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 0; //Janeiro
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 11; //Dezembro
        nAnoSeteMesesAtras = nAno - 1;
        nOitoMesesAtras = 10; //Novembro
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 9; //Outubro
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 8; //Setembro
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 7; //Agosto
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 7) //Agosto
    {
        nMesPassado = 6; //Julho
        nAnoPassado = nAno;
        nDoisMesesAtras = 5; //Junho
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 4; //Maio
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 3; //Abril
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 2; //Março
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 1; //Fevereiro
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 0; //Janeiro
        nAnoSeteMesesAtras = nAno;
        nOitoMesesAtras = 11; //Dezembro
        nAnoOitoMesesAtras = nAno - 1;
        nNoveMesesAtras = 10; //Novembro
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 9; //Outubro
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 8; //Setembro
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 8) //Setembro
    {
        nMesPassado = 7; //Agosto
        nAnoPassado = nAno;
        nDoisMesesAtras = 6; //Julho
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 5; //Junho
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 4; //Maio
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 3; //Abril
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 2; //Março
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 1; //Fevereiro
        nAnoSeteMesesAtras = nAno;
        nOitoMesesAtras = 0; //Janeiro
        nAnoOitoMesesAtras = nAno;
        nNoveMesesAtras = 11; //Dezembro
        nAnoNoveMesesAtras = nAno - 1;
        nDezMesesAtras = 10; //Novembro
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 9; //Outubro
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 9) //Outubro
    {
        nMesPassado = 8; //Setembro
        nAnoPassado = nAno;
        nDoisMesesAtras = 7; //Agosto
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 6; //Julho
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 5; //Junho
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 4; //Maio
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 3; //Abril
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 2; //Março
        nAnoSeteMesesAtras = nAno;
        nOitoMesesAtras = 1; //Fevereiro
        nAnoOitoMesesAtras = nAno;
        nNoveMesesAtras = 0; //Janeiro
        nAnoNoveMesesAtras = nAno;
        nDezMesesAtras = 11; //Dezembro
        nAnoDezMesesAtras = nAno - 1;
        nOnzeMesesAtras = 10; //Novembro
        nAnoOnzeMesesAtras = nAno - 1;
    }

    else if (nMes == 10) //Novembro
    {
        nMesPassado = 9; //Outubro
        nAnoPassado = nAno;
        nDoisMesesAtras = 8; //Setembro
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 7; //Agosto
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 6; //Julho
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 5; //Junho
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 4; //Maio
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 3; //Abril
        nAnoSeteMesesAtras = nAno;
        nOitoMesesAtras = 2; //Março
        nAnoOitoMesesAtras = nAno;
        nNoveMesesAtras = 1; //Fevereiro
        nAnoNoveMesesAtras = nAno;
        nDezMesesAtras = 0; //Janeiro
        nAnoDezMesesAtras = nAno;
        nOnzeMesesAtras = 11; //Dezembro
        nAnoOnzeMesesAtras = nAno - 1;
    }
    else if (nMes == 11) //Dezembro
    {
        nMesPassado = 10; //Novembro
        nAnoPassado = nAno;
        nDoisMesesAtras = 9; //Outubro
        nAnoDoisMesesAtras = nAno;
        nTresMesesAtras = 8; //Setebro
        nAnoTresMesesAtras = nAno;
        nQuatroMesesAtras = 7; //Agosto
        nAnoQuatroMesesAtras = nAno;
        nCincoMesesAtras = 6; //Julho
        nAnoCincoMesesAtras = nAno;
        nSeisMesesAtras = 5; //Junho
        nAnoSeisMesesAtras = nAno;
        nSeteMesesAtras = 4; //Maio
        nAnoSeteMesesAtras = nAno;
        nOitoMesesAtras = 3; //Abril
        nAnoOitoMesesAtras = nAno;
        nNoveMesesAtras = 2; //Março
        nAnoNoveMesesAtras = nAno;
        nDezMesesAtras = 1; //Fevereiro
        nAnoDezMesesAtras = nAno;
        nOnzeMesesAtras = 0; //Janeiro
        nAnoOnzeMesesAtras = nAno;
    }

    lblMesAtual = monthNames[nMes];
    lblMesAtras = monthNames[nMesPassado];
    lblDoisMesesAtras = monthNames[nDoisMesesAtras];
    lblTresMesesAtras = monthNames[nTresMesesAtras];
    lblQuatroMesesAtras = monthNames[nQuatroMesesAtras];
    lblCincoMesesAtras = monthNames[nCincoMesesAtras];
    lblSeisMesesAtras = monthNames[nSeisMesesAtras];
    lblSeteMesesAtras = monthNames[nSeteMesesAtras];
    lblOitoMesesAtras = monthNames[nOitoMesesAtras];
    lblNoveMesesAtras = monthNames[nNoveMesesAtras];
    lblDezMesesAtras = monthNames[nDezMesesAtras];
    lblOnzeMesesAtras = monthNames[nOnzeMesesAtras];

    try {
        if (isIterable(ocorrencias)) {
            for (ocorrencia of ocorrencias) {
                var data = new Date(ocorrencia.created_timestamp);

                if (data.getFullYear() == nAno && data.getMonth() == nMes && ocorrencia.id_registo_alerta.data[0] == 0 && data.getDate() < date.getDate()) {
                    mesAtual++;
                }
                else if (data.getFullYear() == nAnoPassado && data.getMonth() == nMesPassado && ocorrencia.id_registo_alerta.data[0] == 0) {
                    mesPassado++;
                }
                else if (data.getFullYear() == nAnoDoisMesesAtras && data.getMonth() == nDoisMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    doisMesesAtras++;
                }
                else if (data.getFullYear() == nAnoTresMesesAtras && data.getMonth() == nTresMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    tresMesesAtras++;
                }
                else if (data.getFullYear() == nAnoQuatroMesesAtras && data.getMonth() == nQuatroMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    quatroMesesAtras++;
                }
                else if (data.getFullYear() == nAnoCincoMesesAtras && data.getMonth() == nCincoMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    cincoMesesAtras++;
                }
                else if (data.getFullYear() == nAnoSeisMesesAtras && data.getMonth() == nSeisMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    seisMesesAtras++;
                }
                else if (data.getFullYear() == nAnoSeteMesesAtras && data.getMonth() == nSeteMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    seteMesesAtras++;
                }
                else if (data.getFullYear() == nAnoOitoMesesAtras && data.getMonth() == nOitoMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    oitoMesesAtras++;
                }
                else if (data.getFullYear() == nAnoNoveMesesAtras && data.getMonth() == nNoveMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    noveMesesAtras++;
                }
                else if (data.getFullYear() == nAnoDezMesesAtras && data.getMonth() == nDezMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    dezMesesAtras++;
                }
                else if (data.getFullYear() == nAnoOnzeMesesAtras && data.getMonth() == nOnzeMesesAtras && ocorrencia.id_registo_alerta.data[0] == 0) {
                    onzeMesesAtras++;
                }
            }
        }
    }
    catch (err) {
        throw err
    }
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [lblOnzeMesesAtras, lblDezMesesAtras, lblNoveMesesAtras, lblOitoMesesAtras, lblSeteMesesAtras, lblSeisMesesAtras, lblCincoMesesAtras, lblQuatroMesesAtras, lblTresMesesAtras, lblDoisMesesAtras, lblMesAtras, lblMesAtual],
            datasets: [{
                label: "Ocorrências",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#1b2c47",
                pointRadius: 3,
                pointBackgroundColor: "#0e1e37",
                pointBorderColor: "#0e1e37",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "#d57201",
                pointHoverBorderColor: "#d57201",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [onzeMesesAtras, dezMesesAtras, noveMesesAtras, oitoMesesAtras, seteMesesAtras, seisMesesAtras, cincoMesesAtras, quatroMesesAtras, tresMesesAtras, doisMesesAtras, mesPassado, mesAtual],
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return number_format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });
}







//-------------------------------------------------------------------------------------

async function renderOcorrencias_recluso() {
    try {
        const response4 = await fetch(/*--------ROTA DA Tabela Recluso --------*/);
        const reclusos = await response4.json();
        const date = new Date();
        var ocorrencias = 0;
        var nao_ocorrencias = 0;

        for (recluso of reclusos) {

            const response5 = await fetch(/*--------ROTA DA TABELA REGISTO_ALERTA-------- + recluso.id_recluso */);
            const n_ocorencias = await response5.json();


            if (isIterable(n_ocorencias)) {

                ocorrencias++;

            }
            else {
                nao_ocorrencias++;
            }

        }
    }
    catch (err) {
        throw err
    }

    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Reclusos com ocorrências", "Reclusos sem ocorrências"],
            datasets: [{
                data: [ocorrencias, nao_ocorrencias],
                backgroundColor: ['#1b2c47', '#ff8800'],
                hoverBackgroundColor: ['#0e1e37', '#e57a00'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

}

//-------------------------------------------------------------------------------------



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    if (document.getElementById("txt") != null) {
        document.getElementById('txt').innerHTML =
            h + ":" + m + "h";
        var t = setTimeout(startTime, 500);
    }
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}




//FUN��ES AUXILIARES
function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

//-------------------------------------------------DATA FORMAT---------------------------------------------------------
function getDate(date) {
    var today = new Date(date);
    var d = today.getDate();
    var mo = today.getMonth();
    var a = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    d = checkTime(d);
    mo = checkTime(mo + 1);
    return d + "/" + mo + "/" + a + " " + h + ":" + m;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
