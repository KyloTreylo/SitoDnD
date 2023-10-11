// Imports
const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


// Main 
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());


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

app.get('/manuali', (request, response) => {
    response.render('template', {
        titolo: "Manuali",
        distanza: trovaDistanza(request),
        nomefile: "home-manuali"
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

