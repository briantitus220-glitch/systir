/* ================================================================
   SYSTIR SHARED CONTACT SECTION MODULE
   ----------------------------------------------------------------
   Purpose:
   - Injects the same booking/contact CTA into every page.
   - Keeps the contact section standardised across the website.
   - Reuses the existing .cta CSS classes, so the current styling can
     remain unchanged.

   Required HTML hook:
   - <div id="contactSection"></div>

   Usage:
   - Add <div id="contactSection"></div> near the bottom of <main>.
   - Load this file with:
     <script src="js/contact-section.js" defer></script>
================================================================ */

(function() {
    "use strict";

    /* ================================================================
       1. FIND CONTACT SECTION MOUNT POINT
       ----------------------------------------------------------------
       Purpose:
       - Finds the placeholder where the shared contact CTA should be
         inserted.
       - If a page does not include #contactSection, this script safely
         stops without causing errors.
    ================================================================ */

    const contactMount = document.getElementById("contactSection");

    if (!contactMount) return;


    /* ================================================================
       2. INJECT SHARED CONTACT CTA
       ----------------------------------------------------------------
       Purpose:
       - Inserts the reusable booking/contact section.
       - Class names are intentionally kept the same as the existing
         homepage CTA so current CSS continues to work.
    ================================================================ */

    contactMount.innerHTML = `
        <!-- ================================================================
            SHARED CONTACT / BOOKING CTA
            ----------------------------------------------------------------
            Purpose:
            - Universal contact section injected by js/contact-section.js.
            - Reuses existing .cta styling for consistency.
        ================================================================= -->

        <section class="cta section section1" aria-labelledby="shared-cta-title">
            <div class="cta__inner">
                <p class="eyebrow">Bookings and enquiries</p>

                <h2 class="section-title" id="shared-cta-title">
                    Bring SYSTIR to your stage
                </h2>

                <p>
                    For live dates, festival programming, press, and collaboration enquiries, contact the ensemble directly.
                </p>

                <div class="cta__actions">
                    <a class="button6" href="contact.html">Contact SYSTIR</a>
                    <a class="button6" href="live.html">View live dates</a>
                </div>
            </div>
        </section>
    `;
})();