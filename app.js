// Imports
const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
dotenv.config();


// Main 
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());

app.use(bodyParser.raw({ type: 'application/pdf' }));

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
        titolo: "lore",
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
    const {nomeSezioneLore} = request.params;
    let titolo;
    let trovato = true;

    if (nomeSezioneLore=="mondo") {
        titolo = "Reame terreno";
    } else if (nomeSezioneLore=="personaggi") {
        titolo = "I nostri avventurieri";
    } else {
        trovato = false
    }

    response.render('template', {
        titolo: trovato?titolo:"Storia non scritta",
        distanza: trovaDistanza(request),
        nomefile: "lore"
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

let isPdfBeingEdited = false;

app.get('/schede/:nomeScheda', (request, response) => {
    if (!isPdfBeingEdited) {
        isPdfBeingEdited = true;
        const {nomeScheda} = request.params;
        let titolo;
        let trovato = true;

        if (nomeScheda=="milean-nema") {
            titolo = "Milean Nema";
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
        } else {
            trovato = false
        }

        response.render('template', {
            titolo: trovato?titolo:"Scheda non presente",
            distanza: trovaDistanza(request),
            nomefile: "schede"
        })
    } else {
        response.send('Il PDF è in fase di modifica da un altro utente.');
    }
});
  
app.post('/save-pdf', async (req, res) => {
    const pdfData = req.body;

    // Salva il PDF modificato sul server
    fs.writeFile('public/pdf/schede/MileanNema.pdf', pdfData, (err) => {
        if (err) {
            res.status(500).send('Errore durante il salvataggio del PDF.');
        } else {
            res.send('Modifiche al PDF salvate con successo.');
        }
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

