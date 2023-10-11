document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let nomeManuale;
    let manualePresente = true;
    let nomejson;

    if (titolo=="Manuale del giocatore") {
        nomeManuale = "manuale-giocatore"
        nomejson = "Manuale_del_Giocatore"
    } else if (titolo=="Manuale dei mostri") {
        nomeManuale = "manuale-mostri"
        nomejson = "Manuale_dei_Mostri"
    } else if (titolo=="Manuale del Dungeon Master") {
        nomeManuale = "manuale-dungeon-master"
        nomejson = "Manuale_del_Dungeon_Master"
    } else if (titolo=="Calderone Omnicomprensivo di Tasha") {
        nomeManuale = "manuale-tasha"
        nomejson = "Manuale_di_Tasha"
    } else if (titolo=="Giuda Omnicomprensiva di Xanathar") {
        nomeManuale = "manuale-xanathar"
        nomejson = "Manuale_di_Xanathar"
    } else if (titolo=="Eberron: Rising from the Last War") {
        nomeManuale = "manuale-eberron"
        nomejson = "Manuale_di_Eberron"
    } else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`http://localhost:5000/json/${nomejson}.json`)
        .then(response => response.json())
        .then(data => loadMain(data));
    } else {
        manualeNonTrovato();
    }
    

});

async function loadMain(data) {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>${data.titolo}</h1>`;
    console.log(data.nomepdf)

    fetch('http://localhost:5000/html/manuali.html')
    .then(response => response.text())
    .then((html) => {
        main.innerHTML = eval(`\`${html}\``)
    })
}

async function manualeNonTrovato() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Manuale non disponibile nell'archivio!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}