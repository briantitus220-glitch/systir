/* ================================================================
   SYSTIR NAVIGATION MODULE
   ----------------------------------------------------------------
   Purpose:
   - Controls the mobile navigation menu.
   - Opens/closes the menu when the hamburger button is clicked.
   - Closes the menu when a nav link is clicked.
   - Closes the menu when Escape is pressed.
   - Closes the menu when the screen is resized back to desktop width.

   Required HTML hooks:
   - [data-nav-toggle] on the hamburger button.
   - [data-site-nav] on the navigation element.
   - .nav-is-open on <body> is used by CSS to animate the hamburger icon.
================================================================ */

(function () {
    "use strict";

    /* ------------------------------------------------------------
       Create or reuse the global SYSTIR app namespace.
       ------------------------------------------------------------
       Why:
       - Splitting JS into multiple files means each file needs a safe
         shared place to expose its init function.
       - window.SystirApp avoids loose global functions like initNav().
       - The existing object is reused if another module created it first.
    ------------------------------------------------------------ */
    window.SystirApp = window.SystirApp || {};

    /* ------------------------------------------------------------
       initMobileNavigation()
       ------------------------------------------------------------
       What:
       - Finds the menu toggle and navigation.
       - Adds event listeners for click, Escape, and resize.
       Why:
       - Keeps all mobile-nav behaviour contained in one module.
    ------------------------------------------------------------ */
    function initMobileNavigation() {
        const navToggle = document.querySelector("[data-nav-toggle]");
        const siteNav = document.querySelector("[data-site-nav]");
        const pageBody = document.body;

        /* --------------------------------------------------------
           Guard clause:
           If this page has no mobile nav, safely stop here.
        -------------------------------------------------------- */
        if (!navToggle || !siteNav) return;

        /* --------------------------------------------------------
           setNavigationState(isOpen)
           --------------------------------------------------------
           What:
           - Synchronises the visible menu state, body class, and ARIA.
           Why:
           - Keeping this in one function prevents the visual state and
             accessibility state from drifting apart.
        -------------------------------------------------------- */
        function setNavigationState(isOpen) {
            siteNav.classList.toggle("is-open", isOpen);
            pageBody.classList.toggle("nav-is-open", isOpen);

            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        }

        /* --------------------------------------------------------
           Toggle the menu when the hamburger button is clicked.
        -------------------------------------------------------- */
        navToggle.addEventListener("click", () => {
            const isOpen = siteNav.classList.contains("is-open");
            setNavigationState(!isOpen);
        });

        /* --------------------------------------------------------
           Close the menu after clicking any navigation link.
           Why:
           - On mobile, the user should return to the page content after
             choosing a destination.
        -------------------------------------------------------- */
        siteNav.addEventListener("click", event => {
            const clickedLink = event.target.closest("a");

            if (clickedLink) {
                setNavigationState(false);
            }
        });

        /* --------------------------------------------------------
           Close the menu with Escape.
           Why:
           - This is expected keyboard behaviour for collapsible UI.
        -------------------------------------------------------- */
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                setNavigationState(false);
            }
        });

        /* --------------------------------------------------------
           Close the mobile menu when returning to desktop width.
           Why:
           - Prevents stale mobile classes from affecting desktop layout.
        -------------------------------------------------------- */
        window.addEventListener("resize", () => {
            if (window.innerWidth > 980) {
                setNavigationState(false);
            }
        });
    }

    /* ------------------------------------------------------------
       Expose this module's init function to main.js.
    ------------------------------------------------------------ */
    window.SystirApp.initMobileNavigation = initMobileNavigation;
})();
