var regisztraltak = [];
var oltottak = [];
function Regisztralt(nev, szulev, van, eu, iod, iol, covid, beoltva, kateg) {
    this.nev = nev;
    this.szulev = szulev;
    this.van = van;
    this.eu = eu;
    this.iod = iod;
    this.iol = iol;
    this.covid = covid;
    this.beoltva = beoltva;
    this.kor = 2021 - this.szulev;
    this.kateg = kateg;
    
    if(this.kor>65 && this.van || this.eu){
        this.kateg = 1;
    }
    if(this.iol && this.van){
        this.kateg = 2;
    }
    if(this.iol && !this.van || this.iod){
        this.kateg = 3;
    }
    if(this.kor<=65 && this.van && !this.iol){
        this.kateg = 4;
    }
    if(this.covid || this.kor<=65 && !this.van && !this.iol && !this.iod && !this.eu){
        this.kateg = 5;
    }

}


function felvesz() {
    var nev = document.getElementById("nev").value;
    var szulev = document.getElementById("szulev").value;
    var kateg = document.getElementById("kateg");
    var kor = parseInt(document.getElementById("kor"));
    var van = document.getElementById("van").checked;
    var eu = document.getElementById("eu").checked;
    var iod = document.getElementById("iod").checked;
    var iol = document.getElementById("iol").checked;
    var covid = document.getElementById("covid").checked;
    var beoltva = document.getElementById("beoltva").checked;
    var hiba = document.getElementById("hiba");
    var jo = true;


    if (nev == "" || szulev == "" || 1899>szulev || szulev>2021) {
        jo = false;
        hiba.innerHTML = "*** Nem töltötted ki a nevet vagy a születési dátumot, vagy hibás adatot adtál meg!! ***"
    }




    if (!beoltva && jo) {
        var regisztralt = new Regisztralt(nev, szulev, van, eu, iod, iol, covid, kateg);
        regisztraltak.push(regisztralt);
        kiir();
    }

    if (beoltva && jo) {
        var regisztralt = new Regisztralt(nev, szulev, van, eu, iod, iol, covid, kateg);
        oltottak.push(regisztralt);
        elkiir();

    }
}
function kiir() {
    var ki = document.getElementById("ki");
    ki.innerHTML = "";

    var tablazat = document.createElement("table")
    for (let i = 0; i < regisztraltak.length; i++) {
        var regisztralt = regisztraltak[i];
        var sor = document.createElement("tr")
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.nev + " ";
        sor.appendChild(cella);
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.kor + " éves ";
        sor.appendChild(cella);
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.kateg + ".kategória";
        sor.appendChild(cella);
        sor.onclick = function () { atrak(i) };
        tablazat.appendChild(sor);
    }

    ki.appendChild(tablazat);
}
function atrak(id) {
    regisztralt = regisztraltak[id];
    oltottak.push(regisztralt);
    regisztraltak.splice(id, 1);
    kiir();
    elkiir();
}

function beoltva(id) {
    regisztralt = regisztraltak[id];
    if (beoltva.checked) {
        elkiir();
    }

}
function elkiir() {
    var be = document.getElementById("be")
    be.innerHTML = "";
    var tablazat = document.createElement("table");
    for (let i = 0; i < oltottak.length; i++) {
        var regisztralt = oltottak[i];
        var sor = document.createElement("tr")
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.nev + " ";
        sor.appendChild(cella);
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.kor + " éves ";
        sor.appendChild(cella);
        var cella = document.createElement("td")
        cella.innerHTML = regisztralt.kateg + ".kategória";
        sor.appendChild(cella);
        tablazat.appendChild(sor);

    }
    be.appendChild(tablazat);
}


