const express = require('express')
const router = express.Router()
const fs = require('fs');

const { pagesPath } = require(`../constants/path`)                   

const sectionPath = `${pagesPath}/character sheets`

/* Trasformare il controllo in un middleware */

var schedaInUso = [false, false, false, false, false, false, false]

router.get('/:sheetName', (req, res) => {

    const {sheetName} = req.params;
    
    let title;
    let sheetExists = true;
    let disponibile = true;

    if (sheetName=="milean-nema") {
        title = "Milean Nema";
        if (schedaInUso[0] == false){
            schedaInUso[0] = true
        } else {
            disponibile = false;
        }
    } else if (sheetName=="dedachos-nipphos") {
        title = "Dedachos Nipphos";
        if (schedaInUso[1] == false){
            schedaInUso[1] = true
        } else {
            disponibile = false;
        }
    } else if (sheetName=="manuale-dungeon-master") {
        title = "Manuale del Dungeon Master";
        indiceMutuaEsclusione = 0
    } else if (sheetName=="manuale-tasha") {
        title = "Calderone Omnicomprensivo di Tasha";
        indiceMutuaEsclusione = 0
    } else if (sheetName=="manuale-xanathar") {
        title = "Giuda Omnicomprensiva di Xanathar";
        indiceMutuaEsclusione = 0
    } else if (sheetName=="manuale-eberron") {
        title = "Eberron: Rising from the Last War";
        indiceMutuaEsclusione = 0
    } else {
        sheetExists = false
    }

    if (disponibile) {
        res.render('template', {
            pageTitle: sheetExists?title:"Scheda non presente",
            h1Title: sheetExists?title:"Scheda non presente",
            pagePath: sectionPath + "",
            fileName: sheetExists?"sheet":"notfound"
        })
    } else {
        res.render('template', {
            pageTitle: `Scheda attualmente in modifica`,
            h1Title: `Scheda attualmente in modifica`,
            pagePath: sectionPath + "",
            fileName: "waituntil"
        })
    }
   
});
  
router.post('/update/:nomeScheda', (req, res) => {
    const {nomeScheda} = req.params;

    let nomepdf;

    if (nomeScheda=="milean-nema") {
        nomepdf = "Milean_Nema";
        schedaInUso[0] = false
    } else if (nomeScheda=="manuale-mostri") {
        nomepdf = "Dedachos_Nipphos"
        schedaInUso[1] = false
    } else if (nomeScheda=="manuale-dungeon-master") {
        title = "Manuale del Dungeon Master";
    } else if (nomeScheda=="manuale-tasha") {
        title = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeScheda=="manuale-xanathar") {
        title = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeScheda=="manuale-eberron") {
        title = "Eberron: Rising from the Last War";
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('Nessun file caricato.');
    }
  
    const uploadedFile = req.files.uploadedFile;
    const filePath = `public/pdf/schede/${nomepdf}.pdf`;
    const filePathBackup = `public/pdf/schede-backup/${nomepdf}.pdf`;
  
    fs.copyFile(filePath, filePathBackup, (err) => {
        if (err) {
          return res.status(500).send('Errore nel creare la copia di backup.');
        }

        // Sovrascrivi il file PDF originale con il nuovo file caricato
        uploadedFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send('Errore nel caricamento del file.');
        }
    
        res.send('Scheda aggiornata con successo!');
        });
    });
});

router.post('/nuovamenteDisponibile/:nomeScheda', (req, res) => {
    const {nomeScheda} = req.params;

    if (nomeScheda=="milean-nema") {
        schedaInUso[0] = false
    } else if (nomeScheda=="dedachos-nipphos") {
        schedaInUso[1] = false
    } else if (nomeScheda=="manuale-dungeon-master") {
        title = "Manuale del Dungeon Master";
    } else if (nomeScheda=="manuale-tasha") {
        title = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeScheda=="manuale-xanathar") {
        title = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeScheda=="manuale-eberron") {
        title = "Eberron: Rising from the Last War";
    } else {
        res.sendStatus(500)
    }

    res.sendStatus(200);
});

module.exports = router