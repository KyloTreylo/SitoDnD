document.addEventListener('DOMContentLoaded', function () {
    loadMain()
});

async function loadMain() {

    // Carica la tabella dei cer
    const imagenotfound = document.getElementById("img-notfound")
    const title = document.getElementById("div-title")

    title.innerHTML = `<h1>Pagina non trovata!</h1>`;
    imagenotfound.hidden = false;
}