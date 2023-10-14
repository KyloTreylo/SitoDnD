// Imports
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();


// Main 
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.use(fileUpload());

// Static Files
app.use(express.static('public'));
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/pdf', express.static(__dirname + 'public/pdf'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/json', express.static(__dirname + 'public/json'))
app.use('/html', express.static(__dirname + 'public/html'))

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs'); 

// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port ${port}`))

app.get('', (request, response) => {
    response.render('template', {
        titolo: "Home",
        distanza: trovaDistanza(request),
        nomefile: "home"
    })
})

app.get('/lore', (request, response) => {
    response.render('template', {
        titolo: "Lore",
        distanza: trovaDistanza(request),
        nomefile: "home-lore"
    })
})

app.get('/lore/mondo', (request, response) => {
    response.render('template', {
        titolo: "Reame terreno",
        distanza: trovaDistanza(request),
        nomefile: "mondo"
    })
})

app.get('/lore/personaggi', (request, response) => {
    response.render('template', {
        titolo: "I nostri avventurieri",
        distanza: trovaDistanza(request),
        nomefile: "personaggi"
    })
})

app.get('/lore/mondo/:nomeRegione', (request, response) => {
    const {nomeRegione} = request.params;
    let titolo;
    let trovato = true;

    if (nomeRegione=="polis") {
        titolo = "Polis";
    } else if (nomeRegione=="ridium") {
        titolo = "Ridium";
    }  else if (nomeRegione=="lumines") {
        titolo = "Lumines";
    } else if (nomeRegione=="foresta") {
        titolo = "Le luci fioche";
    } else if (nomeRegione=="shatten") {
        titolo = "Shatten";
    } else if (nomeRegione=="pakt") {
        titolo = "Pakt Eufel";
    } else if (nomeRegione=="ecatombe") {
        titolo = "Ecatombe Est";
    } else if (nomeRegione=="devy") {
        titolo = "Devy D. Jones";
    } else if (nomeRegione=="rlyegh") {
        titolo = "R'lyegh";
    } else if (nomeRegione=="cronius") {
        titolo = "Cronius";
    } else if (nomeRegione=="vronn") {
        titolo = "Vronn Dall";
    } else if (nomeRegione=="ivit") {
        titolo = "Ivit Fiel";
    }else {
        trovato = false
    }

    response.render('template', {
        titolo: trovato?titolo:"Storia non scritta",
        distanza: trovaDistanza(request),
        nomefile: "regioni"
    })
})

app.get('/manuali', (request, response) => {
    response.render('template', {
        titolo: "Manuali",
        distanza: trovaDistanza(request),
        nomefile: "home-manuali"
    })
})

// Manual view charging
app.get('/manuali/:nomeManuale', (request, response) => {
    const {nomeManuale} = request.params;
    let titolo;
    let trovato = true;

    if (nomeManuale=="manuale-giocatore") {
        titolo = "Manuale del giocatore";
    } else if (nomeManuale=="manuale-mostri") {
        titolo = "Manuale dei mostri";
    } else if (nomeManuale=="manuale-dungeon-master") {
        titolo = "Manuale del Dungeon Master";
    } else if (nomeManuale=="manuale-tasha") {
        titolo = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeManuale=="manuale-xanathar") {
        titolo = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeManuale=="manuale-eberron") {
        titolo = "Eberron: Rising from the Last War";
    } else {
        trovato = false
    }

    response.render('template', {
        titolo: trovato?titolo:"Manuale non presente",
        distanza: trovaDistanza(request),
        nomefile: "manuali"
    })
})

var schedaInUso = [false, false, false, false, false, false, false]

app.get('/schede/:nomeScheda', (request, response) => {

    const {nomeScheda} = request.params;
    let titolo;
    let trovato = true;
    let disponibile = true;

    if (nomeScheda=="milean-nema") {
        titolo = "Milean Nema";
        if (schedaInUso[0] == false){
            schedaInUso[0] = true
        } else {
            disponibile = false;
        }
    } else if (nomeScheda=="manuale-mostri") {
        titolo = "Manuale dei mostri";
        schedaInUso[1] = true
    } else if (nomeScheda=="manuale-dungeon-master") {
        titolo = "Manuale del Dungeon Master";
        indiceMutuaEsclusione = 0
    } else if (nomeScheda=="manuale-tasha") {
        titolo = "Calderone Omnicomprensivo di Tasha";
        indiceMutuaEsclusione = 0
    } else if (nomeScheda=="manuale-xanathar") {
        titolo = "Giuda Omnicomprensiva di Xanathar";
        indiceMutuaEsclusione = 0
    } else if (nomeScheda=="manuale-eberron") {
        titolo = "Eberron: Rising from the Last War";
        indiceMutuaEsclusione = 0
    } else {
        trovato = false
    }

    if (disponibile) {
        response.render('template', {
            titolo: trovato?titolo:"Scheda non presente",
            distanza: trovaDistanza(request),
            nomefile: "schede"
        })
    } else {
        response.render('template', {
            titolo: `Scheda attualmente in modifica`,
            distanza: trovaDistanza(request),
            nomefile: "schede"
        })
    }
   
});
  
app.post('/upload-modified-pdf/:nomeScheda', (request, response) => {
    const {nomeScheda} = request.params;

    let nomepdf;

    if (nomeScheda=="milean-nema") {
        nomepdf = "Milean_Nema";
        schedaInUso[0] = false
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

    if (!request.files || Object.keys(request.files).length === 0) {
      return response.status(400).send('Nessun file caricato.');
    }
  
    const uploadedFile = request.files.uploadedFile;
    const filePath = `public/pdf/schede/${nomepdf}.pdf`;
    const filePathBackup = `public/pdf/schede-backup/${nomepdf}.pdf`;
  
    fs.copyFile(filePath, filePathBackup, (err) => {
        if (err) {
          return res.status(500).send('Errore nel creare la copia di backup.');
        }

        // Sovrascrivi il file PDF originale con il nuovo file caricato
        uploadedFile.mv(filePath, (err) => {
        if (err) {
            return response.status(500).send('Errore nel caricamento del file.');
        }
    
        response.send('Scheda aggiornata con successo!');
        });
    });
});

// Da mettere giù la pagina not found
app.get('*', (request, response) => {
    response.render('template', {
        titolo: "Not found 404",
        distanza: trovaDistanza(request),
        nomefile: "notfound"
    })
})

function trovaDistanza(request) {
    let x = request.originalUrl.split( new RegExp( "/", "gi" ) ).length-2
    let distanza = "";
    for (let i = 0; i < x; i++) {
        distanza += "../"
    }
    return distanza;
}

