export function footer (document) {
    // Caricare footer leggermente dopo per evitare scatto
    setTimeout(function(){
        document.querySelector("footer").hidden = false    
    },500);
}
