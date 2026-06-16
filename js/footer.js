/* ================================================================
   SYSTIR SHARED FOOTER MODULE
   ----------------------------------------------------------------
   Purpose:
   - Injects the same site footer into every page.
   - Prevents footer/social/copyright inconsistencies across pages.

   Required HTML hook:
   - <div id="siteFooter"></div>

   Important:
   - Load this script before current-year.js.
   - current-year.js needs [data-current-year] to exist first.
================================================================ */

(function() {
    "use strict";

    /* ================================================================
       1. FIND FOOTER MOUNT POINT
       ----------------------------------------------------------------
       Purpose:
       - Finds the placeholder where the shared footer should be inserted.
       - If a page does not include #siteFooter, this file safely stops.
    ================================================================ */

    const footerMount = document.getElementById("siteFooter");

    if (!footerMount) return;


    /* ================================================================
       2. INJECT SHARED FOOTER HTML
       ----------------------------------------------------------------
       Purpose:
       - Inserts the reusable footer structure into the page.
       - This is now the single source of truth for footer content.
    ================================================================ */

    footerMount.innerHTML = `
        <footer class="site-footer">
            <div class="site-footer__inner">
                <a class="site-footer__brand" href="index.html" aria-label="SYSTIR home">SYSTIR</a>

               <ul class="site-footer__socials" aria-label="Social links">

    <li>
        <a href="https://www.instagram.com/systirofficial/" target="_blank" rel="noopener" aria-label="Instagram">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
        </a>
    </li>

    <li>
        <a href="#" aria-label="Spotify">
            <i class="fa-brands fa-spotify" aria-hidden="true"></i>
        </a>
    </li>

    <li>
        <a href="#" aria-label="YouTube">
            <i class="fa-brands fa-youtube" aria-hidden="true"></i>
        </a>
    </li>

</ul>
                <p class="site-footer__credit">
                    © <span data-current-year>2026</span> SYSTIR. Part of the ANÚNA Collective.
                </p>
            </div>
        </footer>
    `;
})();