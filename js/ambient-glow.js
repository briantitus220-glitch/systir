/* ================================================================
   SYSTIR AMBIENT GLOW MODULE
   ----------------------------------------------------------------
   Purpose:
   - Adds a slow breathing glow to .ambient-glow.
   - Used inside the fullscreen viewer for atmosphere.

   Required HTML/CSS hook:
   - .ambient-glow

   Note:
   - This is decorative only.
   - It does not use real audio analysis.
================================================================ */

(function () {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    function initAmbientGlow() {
        const ambientGlow = document.querySelector(".ambient-glow");

        /* --------------------------------------------------------
           Guard clause:
           Some pages may not include the glow element.
        -------------------------------------------------------- */
        if (!ambientGlow) return;

        let glowPhase = 0;

        /* --------------------------------------------------------
           Animate with a lightweight interval.
           Why:
           - The effect is intentionally subtle and slow.
        -------------------------------------------------------- */
        setInterval(() => {
            glowPhase += 0.03;

            const scale = 1 + Math.sin(glowPhase) * 0.025;
            const opacity = 0.22 + Math.sin(glowPhase * 1.5) * 0.05;

            ambientGlow.style.transform = `scale(${scale})`;
            ambientGlow.style.opacity = opacity;
        }, 16);
    }

    window.SystirApp.initAmbientGlow = initAmbientGlow;
})();
