const header = document.getElementById('fixedHeader');
const headerBg = document.getElementById('fixedHeaderBg');
const fixedMarquee = document.getElementById('fixedMarquee');
const navSpacer = document.getElementById('fixedNavSpacer');

function syncHeaderDimensions() {
  const h = header.offsetHeight;
  document.documentElement.style.setProperty('--fixed-header-height', h + 'px');
  headerBg.style.height = h + 'px';
}

function updateNavOffset() {
  const topLeft = document.querySelector('.page .top-left');
  if (topLeft) {
    navSpacer.style.width = topLeft.getBoundingClientRect().right + 'px';
  }
}

syncHeaderDimensions();
updateNavOffset();
window.addEventListener('load', () => { syncHeaderDimensions(); updateNavOffset(); });

const sections = [
  { sectionId: 'portfolioID', marqueeId: 'portfolioMarquee' },
  { sectionId: 'aboutID',     marqueeId: 'aboutMarquee'     },
  { sectionId: 'contactID',   marqueeId: 'contactMarquee'   },
];

let activeMarqueeId = null;
let displayedMarqueeId = null;
let crossfadeTimer = null;

function loadMarqueeContent(marqueeId) {
  const src = document.getElementById(marqueeId);
  fixedMarquee.innerHTML = src.innerHTML;
  displayedMarqueeId = marqueeId;
}

function crossfadeMarquee(newMarqueeId) {
  if (displayedMarqueeId === newMarqueeId) return;

  if (crossfadeTimer) {
    clearTimeout(crossfadeTimer);
    crossfadeTimer = null;
  }

  fixedMarquee.style.transition = 'none';
  fixedMarquee.style.opacity = '0';
  fixedMarquee.offsetHeight; // force reflow
  loadMarqueeContent(newMarqueeId);
  fixedMarquee.style.transition = 'opacity 0.25s ease';
  fixedMarquee.style.opacity = '1';
  crossfadeTimer = setTimeout(() => { crossfadeTimer = null; }, 250);
}

function updateFixedHeader() {
  const scrollY = window.scrollY;
  const headerH = header.offsetHeight;

  let currentSection = null;
  for (const s of sections) {
    const el = document.getElementById(s.sectionId);
    if (scrollY + headerH >= el.offsetTop) currentSection = s;
  }

  if (currentSection) {
    if (activeMarqueeId !== currentSection.marqueeId) {
      activeMarqueeId = currentSection.marqueeId;
      crossfadeMarquee(currentSection.marqueeId);
    }
    if (!crossfadeTimer) fixedMarquee.style.opacity = '1';
  } else {
    activeMarqueeId = null;
    const portfolioEl = document.getElementById('portfolioID');
    const transitionRange = 300;
    const distanceToPortfolio = portfolioEl.offsetTop - headerH - scrollY;
    const opacity = Math.max(0, 1 - distanceToPortfolio / transitionRange);

    if (opacity > 0 && displayedMarqueeId !== 'portfolioMarquee') {
      loadMarqueeContent('portfolioMarquee');
    }
    if (opacity === 0) displayedMarqueeId = null;

    fixedMarquee.style.transition = 'none';
    fixedMarquee.style.opacity = String(opacity);
  }
}

window.addEventListener('scroll', updateFixedHeader, { passive: true });
window.addEventListener('resize', () => {
  syncHeaderDimensions();
  updateNavOffset();
  updateFixedHeader();
});
updateFixedHeader();
