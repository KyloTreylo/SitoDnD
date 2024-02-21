const express = require('express')
const router = express.Router()
const { trovaDistanza } = require('../functions/basics')
const fs = require('fs');

/* Trasformare il controllo in un middleware */

var schedaInUso = [false, false, false, false, false, false, false]

router.get('/:nomeScheda', (req, res) => {

    const {nomeScheda} = req.params;
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
    } else if (nomeScheda=="dedachos-nipphos") {
        titolo = "Dedachos Nipphos";
        if (schedaInUso[1] == false){
            schedaInUso[1] = true
        } else {
            disponibile = false;
        }
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
        res.render('template', {
            titolo: trovato?titolo:"Scheda non presente",
            distanza: trovaDistanza(req),
            nomefile: "schede"
        })
    } else {
        res.render('template', {
            titolo: `Scheda attualmente in modifica`,
            distanza: trovaDistanza(req),
            nomefile: "schede"
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
        titolo = "Manuale del Dungeon Master";
    } else if (nomeScheda=="manuale-tasha") {
        titolo = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeScheda=="manuale-xanathar") {
        titolo = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeScheda=="manuale-eberron") {
        titolo = "Eberron: Rising from the Last War";
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
        titolo = "Manuale del Dungeon Master";
    } else if (nomeScheda=="manuale-tasha") {
        titolo = "Calderone Omnicomprensivo di Tasha";
    } else if (nomeScheda=="manuale-xanathar") {
        titolo = "Giuda Omnicomprensiva di Xanathar";
    } else if (nomeScheda=="manuale-eberron") {
        titolo = "Eberron: Rising from the Last War";
    } else {
        res.sendStatus(500)
    }

    res.sendStatus(200);
});

module.exports = router