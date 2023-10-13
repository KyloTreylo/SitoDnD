document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let manualePresente = true;
    let nomejson;

    if (titolo=="Polis") {
        nomejson = "Polis"
    } else if (titolo=="Ridium") {
        nomejson = "Ridium"
    } else if (titolo=="Lumines") {
        nomejson = "Lumines"
    } else if (titolo=="Le luci fioche") {
        nomejson = "Le_luci_fioche"
    } else if (titolo=="Shatten") {
        nomejson = "Shatten"
    } else if (titolo=="Pakt Eufel") {
        nomejson = "Pakt_Eufel"
    } else if (titolo=="Ecatombe Est") {
        nomejson = "Ecatombe_Est"
    }  else if (titolo=="Devy D. Jones") {
        nomejson = "Devy_D_Jones"
    }  else if (titolo=="R'lyegh") {
        nomejson = "R'lyegh"
    }  else if (titolo=="Cronius") {
        nomejson = "Cronius"
    }  else if (titolo=="Vronn Dall") {
        nomejson = "Vronn_Dall"
    }  else if (titolo=="Ivit Fiel") {
        nomejson = "Ivit_Fiel"
    }  else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`/json/regioni/${nomejson}.json`)
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