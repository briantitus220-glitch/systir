/* ================================================================
   SYSTIR MEDIA GALLERY SETS MODULE
   ----------------------------------------------------------------
   Purpose:
   - Controls fixed media gallery frames that contain multiple artistic
     image-grid sets.
   - Previous/next buttons move between full grid sets rather than
     individual images.
   - This is separate from fullscreen-viewer.js, which only controls
     fullscreen image viewing.
================================================================ */

(function() {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    function initMediaGallerySets() {
        const galleries = document.querySelectorAll("[data-media-gallery-sets]");

        galleries.forEach(gallery => {
            const sets = Array.from(gallery.querySelectorAll("[data-media-gallery-set]"));
            const prevButton = gallery.querySelector("[data-media-gallery-prev]");
            const nextButton = gallery.querySelector("[data-media-gallery-next]");
            const currentCounter = gallery.querySelector("[data-media-gallery-current]");
            const totalCounter = gallery.querySelector("[data-media-gallery-total]");

            let activeIndex = sets.findIndex(set => set.classList.contains("is-active"));

            if (activeIndex < 0) {
                activeIndex = 0;
            }

            if (!sets.length) return;

            if (totalCounter) {
                totalCounter.textContent = String(sets.length);
            }

            function updateGallerySet(nextIndex) {
                sets[activeIndex].classList.remove("is-active");

                activeIndex = (nextIndex + sets.length) % sets.length;

                sets[activeIndex].classList.add("is-active");

                if (currentCounter) {
                    currentCounter.textContent = String(activeIndex + 1);
                }
            }

            if (currentCounter) {
                currentCounter.textContent = String(activeIndex + 1);
            }

            if (prevButton) {
                prevButton.addEventListener("click", () => {
                    updateGallerySet(activeIndex - 1);
                });
            }

            if (nextButton) {
                nextButton.addEventListener("click", () => {
                    updateGallerySet(activeIndex + 1);
                });
            }
        });
    }

    window.SystirApp.initMediaGallerySets = initMediaGallerySets;
})();