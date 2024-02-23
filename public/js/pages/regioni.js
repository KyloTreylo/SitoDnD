document.addEventListener('DOMContentLoaded', function () {

    let title = document.title;
    let manualePresente = true;
    let nomejson;
    let nomehtml;

    if (title=="Polis") {
        nomejson = "Polis"
        nomehtml = "polis"
    } else if (title=="Ridium") {
        nomejson = "Ridium"
        nomehtml = "ridium"
    } else if (title=="Lumines") {
        nomejson = "Lumines"
        nomehtml = "lumines"
    } else if (title=="Le luci fioche") {
        nomejson = "Le_luci_fioche"
        nomehtml = "le-luci-fioche"
    } else if (title=="Shatten") {
        nomejson = "Shatten"
        nomehtml = "shatten"
    } else if (title=="Pakt Eufel") {
        nomejson = "Pakt_Eufel"
        nomehtml = "pakt-eufel"
    } else if (title=="Ecatombe Est") {
        nomejson = "Ecatombe_Est"
        nomehtml = "ecatombe-est"
    }  else if (title=="Devy D. Jones") {
        nomejson = "Devy_D_Jones"
        nomehtml = "devy-d-jones"
    }  else if (title=="R'lyegh") {
        nomejson = "R'lyegh"
        nomehtml = "r-lyegh"
    }  else if (title=="Cronius") {
        nomejson = "Cronius"
        nomehtml = "cronius"
    }  else if (title=="Vronn Dall") {
        nomejson = "Vronn_Dall"
        nomehtml = "vronn-dall"
    }  else if (title=="Ivit Fiel") {
        nomejson = "Ivit_Fiel"
        nomehtml = "ivit-fiel"
    }  else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`/html/regioni/${nomejson}.html`)
        .then(response => response.json())
        .then(data => loadMain(data, nomehtml));
    } else {
        manualeNonTrovato();
    }

});

async function loadMain(data, nomehtml) {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-title")

    title.innerHTML = `<h1>${data.title}</h1>`;

    fetch(`/html/regioni/${nomehtml}.html`)
    .then(response => response.text())
    .then((html) => {
        main.innerHTML = eval(`\`${html}\``)
    })
}

async function manualeNonTrovato() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-title")

    title.innerHTML = `<h1>Manuale non disponibile nell'archivio!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}