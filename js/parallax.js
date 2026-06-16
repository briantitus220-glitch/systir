/* ================================================================
   SYSTIR HERO PARALLAX MODULE
   ----------------------------------------------------------------
   Purpose:
   - Adds a subtle parallax movement to the hero background.
   - Keeps the effect lightweight and decorative.

   Required HTML/CSS hook:
   - .hero on the homepage hero section.

   Note:
   - This is intentionally subtle. If the effect ever feels distracting,
     lower PARALLAX_STRENGTH or remove this script from index.html.
================================================================ */

(function () {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    const PARALLAX_STRENGTH = 0.35;

    function initHeroParallax() {
        const hero = document.querySelector(".hero");

        /* --------------------------------------------------------
           Guard clause:
           Non-homepage files may not have a hero.
        -------------------------------------------------------- */
        if (!hero) return;

        /* --------------------------------------------------------
           Move background position on scroll.
           Why:
           - Gives the photographic hero a gentle depth effect.
        -------------------------------------------------------- */
        window.addEventListener("scroll", () => {
            const offset = window.scrollY * PARALLAX_STRENGTH;
            hero.style.backgroundPosition = `center ${offset}px`;
        });
    }

    window.SystirApp.initHeroParallax = initHeroParallax;
})();
