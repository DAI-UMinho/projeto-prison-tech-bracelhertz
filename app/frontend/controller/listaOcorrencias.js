$(window).on("load", function () {

    display_instituicoes();

    async function display_instituicoes() {


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


        for (const ocorrencia of func) {
            if (ocorrencia.title == null) {
                t = "";
            } else {
                t = ocorrencia.title;
            }
            conteudo.push([ocorrencia.prisoner.identifierId,
            ocorrencia.prisoner.name,
            ocorrencia.prisoner.prison.name,
            getDate6(ocorrencia.createdTimestamp)])

        }

        $(document).ready(function () {
            $('#dataTable').DataTable({
                data: conteudo
            });
        });

    }



})
//----------------------------------------------------------------------------------------------------------------
function getDate6(date) {
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
    return d + "/" + mo + "/" + a + " " + h + ":" + m + "h";
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}