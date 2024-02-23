const express = require('express')
const router = express.Router()

const { pagesPath } = require(`../constants/path`)                   

const sectionPath = `${pagesPath}/lore`

router.get('/', (req, res) => {
    res.render('template', {
        pageTitle: "Lore",
        h1Title: "Le storie del mondo",
        pagePath: sectionPath,
        fileName: "home"
    })
})

router.get('/mondo', (req, res) => {
    res.render('template', {
        pageTitle: "Reame terreno",
        h1Title: "Edean",
        pagePath: sectionPath + "/world",
        fileName: "home"
    })
})

router.get('/personaggi', (req, res) => {
    res.render('template', {
        pageTitle: "I nostri avventurieri",
        h1Title: "I nostri avventurieri",
        pagePath: sectionPath + "/characters",
        fileName: "home"
    })
})

router.get('/mondo/:regionName', (req, res) => {

    const {regionName} = req.params;

    let title;
    let fileName;
    let pagePath = "/world";
    let regionExsist = true;

    if (regionName=="polis") {
        title = "Polis";
        fileName = "polis"
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
        fileName = "notfound"
    }

    res.render('template', {
        pageTitle: regionExsist?title:"Storia non scritta",
        h1Title: regionExsist?title:"Questa storia non esiste... per ora",
        pagePath: sectionPath + pagePath,
        fileName: fileName,
    })
})

module.exports = router