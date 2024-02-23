// Imports //PER SAMUEL (importa le librerie esterne)
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Functions
const { trovaDistanza } = require('./backend/functions/basics')

// Routing imports
const manualiRouter = require('./backend/routes/manuali')
const loreRouter = require('./backend/routes/lore')
const schedeRouter = require('./backend/routes/schede')

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
app.get('', (request, response) => {
    response.render('template', {
        titolo: "Home",
       distanza: trovaDistanza(request),
        nomefile: "home"
    })
})

// Not found 404
app.all('*', (request, response) => {
    response.render('template', {
    response.render('template', { 
        titolo: "Not found 404",
        distanza: trovaDistanza(request),
        nomefile: "notfound"
    })
})

