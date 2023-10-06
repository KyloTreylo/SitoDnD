document.addEventListener('DOMContentLoaded', function () {
    loadMain()
});

async function loadMain() {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Le storie del mondo</h1>`;

	fetch('http://localhost:5000/html/home-lore.html')
    .then(response => response.text())
    .then((html) => {
        main.innerHTML = html
    })
}