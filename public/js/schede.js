document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let schedaPresente = true;
    let schedaDisponibile = true
    let nomejson;

    if (titolo=="Milean Nema") {
        nomejson = "Milean_Nema"
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
    } else if (titolo=="Scheda attualmente in modifica") {
        schedaDisponibile = false
    } else {
        schedaPresente = false
    }

    if (schedaPresente) {
        fetch(`/json/schede/${nomejson}.json`)
        .then(response => response.json())
        .then(data => loadMain(data));
    } else if (!schedaDisponibile) {
        schedaNonDisponibile();
    } else {
        schedaNonTrovata();
    }
    

});

async function loadMain(data) {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>${data.titolo}</h1>`;

    fetch('/html/schede.html')
    .then(response => response.text())
    .then((html) => {
        main.innerHTML = eval(`\`${html}\``)
    }).then(e=> {

        const fileInput = document.getElementById('fileInput');
        const spanFileName = document.querySelector('.custom-upload-button span');

        fileInput.addEventListener('change', () => {
            const fileName = fileInput.files[0] ? fileInput.files[0].name : 'Nessun file selezionato';
            spanFileName.textContent = fileName;
        });

        // CARICAMENTO DEL NUOVO FILE
        const uploadButton = document.getElementById('uploadButton');

        uploadButton.addEventListener('click', () => {
            const file = fileInput.files[0];

            if (!file) {
            alert('Seleziona un file PDF prima di caricare.');
            return;
            }

            const formData = new FormData();
            formData.append('uploadedFile', file);

            let nomeScheda = data.nomepdf;

            if (nomeScheda=="Milean_Nema") {
                nomeScheda = "milean-nema";
            } else if (nomeScheda=="manuale-mostri") {
                titolo = "Manuale dei mostri";
            } else if (nomeScheda=="manuale-dungeon-master") {
                titolo = "Manuale del Dungeon Master";
            } else if (nomeScheda=="manuale-tasha") {
                titolo = "Calderone Omnicomprensivo di Tasha";
            } else if (nomeScheda=="manuale-xanathar") {
                titolo = "Giuda Omnicomprensiva di Xanathar";
            } else if (nomeScheda=="manuale-eberron") {
                titolo = "Eberron: Rising from the Last War";
            }

            fetch(`/upload-modified-pdf/${nomeScheda}`, {
            method: 'POST',
            body: formData,
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Visualizza un messaggio di conferma
                // Seleziona l'iframe
                const iframe = document.getElementById('ReaderPDF');

                // Ricarica l'iframe
                iframe.src = iframe.src;
                // Resetta il nome file
                spanFileName.textContent = "Nessun file selezionato";
                // Elimina il file caricato nell'input
                fileInput.value = ""
            })
            .catch(error => {
                console.error('Errore durante il caricamento del file:', error);
                alert('Si è verificato un errore durante il caricamento del file.');
            });
        });
    })
}

async function schedaNonDisponibile() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Scheda selezionata in modifica!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}

async function schedaNonTrovata() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Scheda non disponibile nell'archivio!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}

