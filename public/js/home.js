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

    fetch('http://localhost:5000/html/home.html')
    .then(response => response.text())
    .then((data) => {
        main.innerHTML = data
    }).then (e => {
        const slides = document.querySelector('.slides');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        let currentIndex = 0;
        const slideCount = document.querySelectorAll('.slide').length;
        let timer;

        function goToSlide(index) {
            currentIndex = index;
            const translateX = -currentIndex * 100;
            slides.style.transform = `translateX(${translateX}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            goToSlide(currentIndex);
            clearInterval(timer);
            startTimer();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            goToSlide(currentIndex);
            clearInterval(timer);
            startTimer();
        }

        nextButton.addEventListener('click', () => {
            nextSlide();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
        });

        function startTimer() {
            timer = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        startTimer();
 
    })

}





