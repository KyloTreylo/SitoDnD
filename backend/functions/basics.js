const path = require('path')

function trovaDistanza(request) {
    let x = request.originalUrl.split( new RegExp( "/", "gi" ) ).length-2
    let distanza = "";
    for (let i = 0; i < x; i++) {
        distanza += `..${path.sep}`
    }
    return distanza;
}

module.exports = { trovaDistanza }