/* ================================================================
   SYSTIR MAIN BOOT FILE
   ----------------------------------------------------------------
   Purpose:
   - Starts every SYSTIR JavaScript module after the DOM is ready.

   Load order in HTML:
   1. nav.js
   2. theme.js
   3. current-year.js
   4. parallax.js
   5. galleries.js
   6. fullscreen-viewer.js
   7. ambient-glow.js
   8. main.js

   Why main.js is last:
   - The earlier files attach init functions to window.SystirApp.
   - This file calls those functions once the page is ready.
================================================================ */

(function() {
    "use strict";

    /* ------------------------------------------------------------
       bootSystir()
       ------------------------------------------------------------
       What:
       - Safely calls each module if it exists.
       Why:
       - Future pages might not load every module.
       - This prevents one missing script from breaking the page.
    ------------------------------------------------------------ */
    function bootSystir() {
        const app = window.SystirApp || {};

        if (app.initMobileNavigation) app.initMobileNavigation();
        if (app.initThemeToggle) app.initThemeToggle();
        if (app.initCurrentYear) app.initCurrentYear();
        if (app.initHeroParallax) app.initHeroParallax();
        if (app.initMiniGalleries) app.initMiniGalleries();
        if (app.initMediaGallerySets) app.initMediaGallerySets();
        if (app.initFullscreenViewer) app.initFullscreenViewer();
        if (app.initAmbientGlow) app.initAmbientGlow();
    }

    /* ------------------------------------------------------------
       Wait for the DOM before querying elements.
    ------------------------------------------------------------ */
    document.addEventListener("DOMContentLoaded", bootSystir);
})();