document.addEventListener('DOMContentLoaded', function () {

    let titolo = document.title;
    let nomeManuale;
    let manualePresente = true;
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
    } else {
        manualePresente = false
    }

    if (manualePresente) {
        fetch(`http://localhost:5000/json/schede/${nomejson}.json`)
        .then(response => response.json())
        .then(data => loadMain(data));
    } else {
        schedaNonTrovata();
    }
    

});

async function loadMain(data) {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>${data.titolo}</h1>`;

    fetch('http://localhost:5000/html/schede.html')
    .then(response => response.text())
    .then((html) => {
        main.innerHTML = eval(`\`${html}\``)
    }).then(e=> {
        // Quando viene premuto il pulsante per estrarre il PDF e inviarlo al server
        document.getElementById('save-button').addEventListener('click', function() {
            var iframe = document.getElementById('ReaderPDF'); // Sostituisci 'ilTuoIframe' con l'ID del tuo iframe
            var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
            // Se il contenuto dell'iframe è costituito da un embed tag
            var embedTag = iframeDoc.querySelector('embed[type="application/pdf"]');
            console.log(embedTag)
            if (embedTag) {
            var pdfUrl = embedTag.getAttribute('src');
            console.log(pdfUrl)
        
            // Ora che hai l'URL del PDF, puoi inviarlo al server tramite una richiesta Fetch
            fetch(pdfUrl)
                .then(function(response) {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Errore nella richiesta Fetch');
                }
                })
                .then(function(pdfBlob) {
                // Invia il blob del PDF al server
                var formData = new FormData();
                formData.append('pdf', pdfBlob, 'nome_del_pdf.pdf'); // Sostituisci 'nome_del_pdf.pdf' con il nome desiderato per il file
        
                fetch('/save-pdf', {
                    method: 'POST',
                    body: formData
                })
                .then(function(serverResponse) {
                    if (serverResponse.ok) {
                    // Il PDF è stato inviato con successo al server
                    } else {
                    throw Error(`Errore nell'invio del PDF al server`);
                    }
                })
                .catch(function(error) {
                    console.error(error);
                });
                })
                .catch(function(error) {
                console.error(error);
                });
            }
        });

    })
}

async function schedaNonTrovata() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Scheda non disponibile nell'archivio!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}

