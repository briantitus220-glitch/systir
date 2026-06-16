/* ================================================================
   SYSTIR SHARED HEADER MODULE
   ----------------------------------------------------------------
   Purpose:
   - Injects the same site header/navbar into every page.
   - Prevents the navbar from becoming inconsistent across pages.
   - Automatically applies .is-active to the current page link.

   Required HTML hook:
   - <div id="siteHeader"></div>

   Important:
   - Load this script before nav.js, theme.js, and main.js.
   - nav.js and theme.js need the injected header to exist before their
     event listeners are initialised.
================================================================ */

(function() {
    "use strict";

    /* ================================================================
       1. FIND HEADER MOUNT POINT
       ----------------------------------------------------------------
       Purpose:
       - Finds the placeholder where the shared header should be inserted.
       - If a page does not include #siteHeader, this file safely stops.
    ================================================================ */

    const headerMount = document.getElementById("siteHeader");

    if (!headerMount) return;


    /* ================================================================
       2. CURRENT PAGE DETECTION
       ----------------------------------------------------------------
       Purpose:
       - Reads the current file name from the browser URL.
       - Used to apply .is-active to the correct navbar link.

       Examples:
       - /index.html   -> index.html
       - /members.html -> members.html
       - /member.html?id=amelia-jones -> member.html
    ================================================================ */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";


    /* ================================================================
       3. ACTIVE LINK HELPER
       ----------------------------------------------------------------
       Purpose:
       - Returns the correct class string for each nav link.
       - Keeps the HTML template cleaner.

       Special case:
       - member.html is treated as part of the Members section.
    ================================================================ */

    function getActiveClass(targetPage) {
        const isDirectMatch = currentPage === targetPage;
        const isMemberProfile = currentPage === "member.html" && targetPage === "members.html";

        if (isDirectMatch || isMemberProfile) {
            return "site-nav__link is-active";
        }

        return "site-nav__link";
    }


    /* ================================================================
       4. ARIA CURRENT HELPER
       ----------------------------------------------------------------
       Purpose:
       - Adds aria-current="page" to the active nav link.
       - Improves accessibility for screen-reader users.
    ================================================================ */

    function getAriaCurrent(targetPage) {
        const isDirectMatch = currentPage === targetPage;
        const isMemberProfile = currentPage === "member.html" && targetPage === "members.html";

        if (isDirectMatch || isMemberProfile) {
            return ' aria-current="page"';
        }

        return "";
    }


    /* ================================================================
       5. INJECT SHARED HEADER HTML
       ----------------------------------------------------------------
       Purpose:
       - Inserts the full reusable header structure into the page.
       - This is now the single source of truth for the navbar.
    ================================================================ */

    headerMount.innerHTML = `
        <header class="site-header" data-site-header>
            <div class="site-header__inner">

                <a class="site-header__brand" href="index.html" aria-label="SYSTIR home">
                    <img class="site-header__logo" src="images/logo/systir-logo.png" alt="SYSTIR" width="220" height="80" />
                </a>

                <nav class="site-nav" id="site-navigation" aria-label="Main navigation" data-site-nav>
                    <ul class="site-nav__list">
                        <li class="site-nav__item">
                            <a class="${getActiveClass("index.html")}" href="index.html"${getAriaCurrent("index.html")}>Home</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("live.html")}" href="live.html"${getAriaCurrent("live.html")}>Live</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("media.html")}" href="media.html"${getAriaCurrent("media.html")}>Media/Bio</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("members.html")}" href="members.html"${getAriaCurrent("members.html")}>Members</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("news.html")}" href="news.html"${getAriaCurrent("news.html")}>News</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("merch.html")}" href="https://anuna.sellfy.store/merch/"${getAriaCurrent("merch.html")}>Merch - The Anuna Collective</a>
                        </li>

                        <li class="site-nav__item">
                            <a class="${getActiveClass("contact.html")}" href="contact.html"${getAriaCurrent("contact.html")}>Contact</a>
                        </li>
                    </ul>

                    <div class="site-nav__theme">
                        <button class="theme-toggle" type="button" aria-label="Switch to light mode" aria-pressed="false" data-theme-toggle>
                            <span class="theme-toggle__icon" aria-hidden="true">☾</span>
                        </button>
                    </div>
                </nav>

                <button class="site-header__toggle" type="button" aria-label="Open navigation menu" aria-controls="site-navigation" aria-expanded="false" data-nav-toggle>
                    <span class="site-header__toggle-line" aria-hidden="true"></span>
                    <span class="site-header__toggle-line" aria-hidden="true"></span>
                    <span class="site-header__toggle-line" aria-hidden="true"></span>
                </button>

            </div>
        </header>
    `;
})();