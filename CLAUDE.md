# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (localhost)
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run deploy    # build + push dist/ to gh-pages branch (GitHub Pages)
```

There are no tests or linting scripts.

## Architecture

This is a single-page personal portfolio site (`index.html`) built with vanilla JS and Vite. The live site is at https://lofeodo.github.io.

**Entry point:** `index.html` loads `main.js` (ES module) and four additional script modules as plain `<script type="module">` tags.

**JS files and their roles:**
- `main.js` — Three.js scene (auto-rotating sphere), GSAP intro animations, scroll handler that rotates the camera around the sphere and shifts its RGB color, and wires `scrollToSection` onto `window` so inline `onclick` attributes in the HTML can call it.
- `scrollToFunction.js` — exports `scrollToSection(id)`, used by nav buttons in `index.html`.
- `sphereLines.js` — positions the four `.lineThroughSphere` divs (decorative horizontal lines) so they align with section landmarks; re-runs on resize/load.
- `rollingText.js` — cycles the hero subtitle text (e.g. "M.Sc.Comp.Sci." / "B.Eng.Mech.Eng.") with a per-letter roll animation every 3 s.
- `typeWriter.js` — types out "Daniel Lofeodo" character by character with a blinking caret into `#name`.
- `scrollingEffects.js` — IntersectionObserver that adds/removes `.animation-visible` on `.swipe-left-animation` when `.grid` enters the viewport.

**CSS (`style.css`):** Single stylesheet. Layout is a full-page vertical scroll grid (`.grid`) of four `.page` sections: hero, portfolio, about, contact. Each page uses a 3-column CSS grid with a spanning titlebar row and a centered content area. The Three.js `<canvas>` is `position: fixed` in the top-right corner; `--webGlMargin` (a CSS custom property set by JS) trims it so the circular clipped sphere appears flush with the corner.

**Dependencies:** `three` (3D sphere), `gsap` (tweens/timeline intro), `gh-pages` (deploy).

**`blog/` subdirectory:** A separate Jekyll blog (not built by Vite). It has its own `Gemfile` and `_config.yml` and is an independent project — changes there have no effect on the Vite site.
