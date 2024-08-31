// script.js

let currentIndex = 0;
let slideInterval;

const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Initialize slider
function initSlider() {
    slideInterval = setInterval(nextSlide, 4000); // Auto-transition every 4 seconds
    updateActiveDot();
}

// Move to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

// Move to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

// Update slider position and active dot
function updateSlider() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateActiveDot();
}

// Update active dot
function updateActiveDot() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Pause auto-slide on hover
slides.addEventListener('mouseenter', () => clearInterval(slideInterval));
slides.addEventListener('mouseleave', initSlider);

// Add event listeners to buttons
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Add event listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Swipe functionality for touch screens
let startX = 0;
slides.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
slides.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) nextSlide();
    if (startX < endX - 50) prevSlide();
});

initSlider();
