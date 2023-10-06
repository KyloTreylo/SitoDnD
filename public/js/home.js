document.addEventListener('DOMContentLoaded', function () {

    loadMain()   
    
    const toggleDescriptions = document.querySelectorAll(".toggle-description");

    toggleDescriptions.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const description = this.parentElement.nextElementSibling;
            description.classList.toggle("hidden");
            if (description.classList.contains("hidden")) {
                this.textContent = "Mostra dettagli";
            } else {
                this.textContent = "Nascondi dettagli";
            }
        });
    });

});

async function loadMain() {

    // Carica la tabella dei cer
    const main = document.querySelector("main")
    const title = document.getElementById("div-titolo")

    title.innerHTML = `<h1>Home</h1>`;

    fetch('http://localhost:5000/html-mains/home.html')
    .then(response => response.text())
    .then((data) => {
        main.innerHTML = data
    })
}





