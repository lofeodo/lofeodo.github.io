// Set line positions
const heroLine = document.getElementById('heroLine');
const aboutLine = document.getElementById('aboutLine');
const portfolioLine = document.getElementById('portfolioLine');
const contactLine = document.getElementById('contactLine');
const aboutMarquee = document.getElementById('aboutMarquee');
const portfolioMarquee = document.getElementById('portfolioMarquee');
const contactMarquee = document.getElementById('contactMarquee');
const fixedHeaderEl = document.getElementById('fixedHeader');

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
    heroLine.style.position = 'fixed';
    heroLine.style.top = fixedHeaderEl.offsetHeight + 'px';
    // dividers sit on the section boundary, so they appear the moment the previous section scrolls away
    aboutLine.style.top = aboutMarquee.offsetTop + 'px';
    portfolioLine.style.top = portfolioMarquee.offsetTop + 'px';
    contactLine.style.top = contactMarquee.offsetTop + 'px';
}