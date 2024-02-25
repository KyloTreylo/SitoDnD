// Imports //PER SAMUEL (importa le librerie esterne)
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Routing imports
const manualiRouter = require('./backend/routes/manuals')
const loreRouter = require('./backend/routes/lore')
const schedeRouter = require('./backend/routes/sheets')

// Main //PER SAMUEL (definisce la porta dove il server ascolterà)
const app = express()
const port = 5000

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routing
app.use('/manuali', manualiRouter)
app.use('/lore', loreRouter)
app.use('/schede', schedeRouter)

// Static Files //PER SAMUEL (qua faciamo riferimento alle dir che verranno usate)
app.use(express.static('public'));
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/pdf', express.static(__dirname + 'public/pdf'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/json', express.static(__dirname + 'public/json'))

// Set View's
app.set('views', './backend/views');
app.set('view engine', 'ejs'); 

// Listen on Port 5000 //PER SAMUEL (cio che ce scritto)
app.listen(port, () => console.info(`App listening on port ${port}`))

// Main Home
app.get('', (req, res) => {
    res.render('template', {
        pageTitle: "Home",
        h1Title: "Home",
        pagePath: "pages",
        fileName: "home",
        playersPath: `${__dirname}/backend/json/players.json`
    })
})

// Not found 404
app.all('*', (req, res) => {
    res.render('template', {
        pageTitle: "Not found 404",
        h1Title: "Questa pagina non esiste",
        pagePath: "pages",
        fileName: "error404"
    })
})

