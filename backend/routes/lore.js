const express = require('express')
const router = express.Router()
const { findDistance } = require('../functions/basics.js')

router.get('/', (req, res) => {
    res.render('template', {
        titolo: "Lore",
        distanza: findDistance(req),
        nomefile: "home-lore"
    })
})

router.get('/mondo', (req, res) => {
    res.render('template', {
        titolo: "Reame terreno",
        distanza: findDistance(req),
        nomefile: "mondo"
    })
})

router.get('/personaggi', (req, res) => {
    res.render('template', {
        titolo: "I nostri avventurieri",
        distanza: findDistance(req),
        nomefile: "personaggi"
    })
})

router.get('/mondo/:regionName', (req, res) => {
    const {regionName} = req.params;
    let title;
    let fileName;
    let pagePath = "regioni";
    let regionExsist = true;

    if (regionName=="polis") {
        title = "Polis";
        fileName = "lore"
    } else if (regionName=="ridium") {
        title = "Ridium";
        fileName = "polis"
    }  else if (regionName=="lumines") {
        title = "Lumines";
        fileName = "polis"
    } else if (regionName=="foresta") {
        title = "Le luci fioche";
        fileName = "polis"
    } else if (regionName=="shatten") {
        title = "Shatten";
        fileName = "polis"
    } else if (regionName=="pakt") {
        title = "Pakt Eufel";
        fileName = "polis"
    } else if (regionName=="ecatombe") {
        title = "Ecatombe Est";
        fileName = "polis"
    } else if (regionName=="devy") {
        title = "Devy D. Jones";
        fileName = "polis"
    } else if (regionName=="rlyegh") {
        title = "R'lyegh";
        fileName = "polis"
    } else if (regionName=="cronius") {
        title = "Cronius";
        fileName = "polis"
    } else if (regionName=="vronn") {
        title = "Vronn Dall";
        fileName = "polis"
    } else if (regionName=="ivit") {
        title = "Ivit Fiel";
        fileName = "polis"
    } else {
        regionExsist = false
        pagePath = "notfound"
        fileName = "lore"
    }

    res.render('template', {
        title: regionExsist?title:"Storia non scritta",
        distance: findDistance(req),
        pagePath: pagePath,
        fileName: fileName,
    })
})

module.exports = router