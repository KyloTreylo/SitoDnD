export function nav(document) {
    /* La navbar ha assunto la sticky pos? 
    Allora deve diventare opacity 1 */

    //to check when element get's position sticky
    let observer = new IntersectionObserver((entries) => {
        // no intersection 
        if (entries[0].intersectionRatio === 0)
            document.querySelector("nav").classList.add("nav-container-sticky");
        // fully intersects 
        else if (entries[0].intersectionRatio === 1)
            document.querySelector("nav").classList.remove("nav-container-sticky");
        }, {
        threshold: [0, 1]
    });
    observer.observe(document.querySelector("header"));
}
