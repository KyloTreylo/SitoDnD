document.addEventListener('DOMContentLoaded', function () {

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

});






