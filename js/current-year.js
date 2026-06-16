/* ================================================================
   SYSTIR CURRENT YEAR MODULE
   ----------------------------------------------------------------
   Purpose:
   - Automatically updates copyright years.
   - Prevents footer dates becoming stale.

   Required HTML hook:
   - [data-current-year] on any element that should display the year.
================================================================ */

(function () {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    function initCurrentYear() {
        const yearTargets = document.querySelectorAll("[data-current-year]");
        const currentYear = new Date().getFullYear();

        /* --------------------------------------------------------
           Write the current year into every matching element.
        -------------------------------------------------------- */
        yearTargets.forEach(target => {
            target.textContent = String(currentYear);
        });
    }

    window.SystirApp.initCurrentYear = initCurrentYear;
})();
