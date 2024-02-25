import { nav } from '/js/partials/nav.js'
import { footer } from '/js/partials/footer.js'

document.addEventListener("DOMContentLoaded", async () => {

    /* Utilizzo il js relativo alla nav */
    nav(document)

    const elementsToFadeIn = document.querySelectorAll(".fade-in");
    elementsToFadeIn.forEach(function (element) {
        element.style.opacity = "1";
    })

    /* Utilizzo il js relativo al footer */
    footer(document)
 
});

