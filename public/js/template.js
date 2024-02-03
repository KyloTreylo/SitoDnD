//chiedere perche qua non usiamo un Arrow function =>
document.addEventListener("DOMContentLoaded", async function () {
    const elementsToFadeIn = document.querySelectorAll(".fade-in");
    elementsToFadeIn.forEach(function (element) {
        element.style.opacity = "1";
    })

    // Caricare footer leggermente dopo per evitare scatto
    setTimeout(function(){
        document.querySelector("footer").hidden = false    
    },500);

    /* La navbar ha assunto la sticky pos? 
    Allora deve diventare opacity 1 */

    //to check when element get's position sticky
    var observer = new IntersectionObserver(function(entries) {
        // no intersection 
        if (entries[0].intersectionRatio === 0)
            document.querySelector("#navbar").classList.add("nav-container-sticky");
        // fully intersects 
        else if (entries[0].intersectionRatio === 1)
            document.querySelector("#navbar").classList.remove("nav-container-sticky");
        }, {
        threshold: [0, 1]
    });
    observer.observe(document.querySelector("header"));

    
    
});

