document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let nomeManuale;
    let manualePresente = true;

    if (titolo=="Manuale del giocatore") {
        nomeManuale = "manuale-giocatore"
    } else if (titolo=="Manuale dei mostri") {
        nomeManuale = "manuale-mostri"
    } else if (titolo=="Manuale del Dungeon Master") {
        nomeManuale = "manuale-dungeon-master"
    } else if (titolo=="Calderone Omnicomprensivo di Tasha") {
        nomeManuale = "manuale-tasha"
    } else if (titolo=="Giuda Omnicomprensiva di Xanathar") {
        nomeManuale = "manuale-xanathar"
    } else if (titolo=="Eberron: Rising from the Last War") {
        nomeManuale = "manuale-eberron"
    } else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`http://localhost:5000/manuali/search/${nomeManuale}`)
        .then(response => response.json())
        .then(data => loadMain(data['data']));
    } else {
        manualeNonTrovato();
    }
    

});

async function loadMain(data) {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>${data.titolo}</h1>`;

    fetch('http://localhost:5000/html-mains/manuali.html')
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