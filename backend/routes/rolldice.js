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

router.get('/soundtracks', (req, res) => {
    res.render('template', {
        pageTitle: "Musiche",
        h1Title: "per un'immersione migliore",
        pagePath: sectionPath + "/soundtracks",
        fileName: "soundtrack"
    })
})

router.get('/sessioni', (req, res) => {
    res.render('template', {
        pageTitle: "sessioni",
        h1Title: "nostre giocate",
        pagePath: sectionPath + "/sessions",
        fileName: "home"
    })
})



module.exports = router