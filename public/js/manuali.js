document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let manualePresente = true;
    let nomejson;

    if (titolo=="Manuale del giocatore") {
        nomejson = "Manuale_del_Giocatore"
    } else if (titolo=="Manuale dei mostri") {
        nomejson = "Manuale_dei_Mostri"
    } else if (titolo=="Manuale del Dungeon Master") {
        nomejson = "Manuale_del_Dungeon_Master"
    } else if (titolo=="Calderone Omnicomprensivo di Tasha") {
        nomejson = "Manuale_di_Tasha"
    } else if (titolo=="Giuda Omnicomprensiva di Xanathar") {
        nomejson = "Manuale_di_Xanathar"
    } else if (titolo=="Eberron: Rising from the Last War") {
        nomejson = "Manuale_di_Eberron"
    } else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`/json/manuali/${nomejson}.json`)
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

    fetch('/html/manuali.html')
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