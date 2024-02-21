const express = require('express')
const router = express.Router()
const { trovaDistanza } = require('../functions/basics.js')

router.get('/', (req, res) => {
    res.render('template', {
        titolo: "Lore",
        distanza: trovaDistanza(req),
        nomefile: "home-lore"
    })
})

router.get('/mondo', (req, res) => {
    res.render('template', {
        titolo: "Reame terreno",
        distanza: trovaDistanza(req),
        nomefile: "mondo"
    })
})

router.get('/personaggi', (req, res) => {
    res.render('template', {
        titolo: "I nostri avventurieri",
        distanza: trovaDistanza(req),
        nomefile: "personaggi"
    })
})

router.get('/mondo/:nomeRegione', (req, res) => {
    const {nomeRegione} = req.params;
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

    res.render('template', {
        titolo: trovato?titolo:"Storia non scritta",
        distanza: trovaDistanza(req),
        nomefile: "regioni"
    })
})

module.exports = router