async function manualeNonTrovato() {
    const main = document.querySelector("main")
    const title = document.getElementById("div-title")

    title.innerHTML = `<h1>Manuale non disponibile nell'archivio!</h1>`;
    main.innerHTML = `<img src="../../img/manualeinesistente.png" alt="Error404">`
}