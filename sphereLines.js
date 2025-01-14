// Set line positions
const heroLine = document.getElementById('heroLine');
const aboutLine = document.getElementById('aboutLine');
const portfolioLine = document.getElementById('portfolioLine');
const contactLine = document.getElementById('contactLine');
const heroContent = document.getElementById('heroContent');
const aboutMarquee = document.getElementById('aboutMarquee');
const portfolioMarquee = document.getElementById('portfolioMarquee');
const contactMarquee = document.getElementById('contactMarquee');

updateLinePositions();

window.addEventListener('resize', () => {
    updateLinePositions();
});
window.addEventListener('load', () => {
    updateLinePositions();
});
window.addEventListener('DOMContentLoaded', () => {
    updateLinePositions();
});

function updateLinePositions(){
    heroLine.style.top = heroContent.offsetTop - 1 + 'px';
    aboutLine.style.top = aboutMarquee.offsetTop + aboutMarquee.offsetHeight + 'px';
    portfolioLine.style.top = portfolioMarquee.offsetTop + portfolioMarquee.offsetHeight + 'px';
    contactLine.style.top = contactMarquee.offsetTop + contactMarquee.offsetHeight + 'px';
}