const express = require('express')
const router = express.Router()
const { trovaDistanza } = require('../functions/basics')

router.get('/', (req, res) => {
    res.render('template', {
        titolo: "Manuali",
        distanza: trovaDistanza(req),
        nomefile: "home-manuali"
    })
})

router.get('/:nomeManuale', (req, res) => {
    const {nomeManuale} = req.params;
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

    res.render('template', {
        titolo: trovato?titolo:"Manuale non presente",
        distanza: trovaDistanza(req),
        nomefile: "manuali"
    })
})

module.exports = router