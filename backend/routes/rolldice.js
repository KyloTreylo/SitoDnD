//tavolata
const express = require('express')
const router = express.Router()

const { pagesPath } = require(`../constants/path`)                   

const sectionPath = `${pagesPath}/rolldice`

router.get('/', (req, res) => {
    res.render('template', {
        pageTitle: "Tavolata",
        h1Title: "Famolo strano",
        pagePath: sectionPath + "",
        fileName: "home"
    })
})

router.get('/:nomeManuale', (req, res) => {

    const {nomeManuale} = req.params;

    let title = "";
    let fileName = "manual";
    let pdfName = "";
    let manualExists = true;

    if (nomeManuale=="manuale-giocatore") {
        title = "Manuale del giocatore";
    } else if (nomeManuale=="manuale-mostri") {
        title = "Manuale dei mostri";
    } else if (nomeManuale=="manuale-dungeon-master") {
        title = "Manuale del Dungeon Master";
    } else if (nomeManuale=="manuale-tasha") {
        title = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeManuale=="manuale-xanathar") {
        title = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeManuale=="manuale-eberron") {
        title = "Eberron: Rising from the Last War";
    } else {
        fileName = "notfound"
        manualExists = false
    }

    pdfName = title.replaceAll(" ", "_")

    res.render('template', {
        pageTitle: manualExists?title:"Manuale non presente",
        h1Title: manualExists?title:"Questo manuale non esiste o non è presente!",
        pagePath: sectionPath + "",
        fileName: "manual",
        pdfName: pdfName
    })
})

module.exports = router