/* ================================================================
   SYSTIR MINI GALLERIES MODULE
   ----------------------------------------------------------------
   Purpose:
   - Controls the small homepage gallery cards.
   - Updates image src, alt text, and captions.
   - Supports previous/next controls.
   - Automatically rotates gallery images at a consistent interval.
   - Uses a conveyor-belt style transition:
     old image fades/slides out to the right,
     new image fades/slides in from the left.

   Required HTML hooks:
   - [data-gallery] on each gallery container.
   - [data-gallery-image] on the gallery image.
   - [data-gallery-caption] on the gallery caption.
   - [data-gallery-prev] on the previous button.
   - [data-gallery-next] on the next button.

   Important path note:
   - JS image paths are resolved relative to the HTML file.
   - Therefore use "images/gallery/..." not "../images/gallery/...".
================================================================ */

(function() {
    "use strict";

    /* ================================================================
       1. GLOBAL APP NAMESPACE
       ----------------------------------------------------------------
       Purpose:
       - Creates one shared global object for this website's JS modules.
       - Prevents each file from scattering unrelated globals everywhere.
       - main.js can later call window.SystirApp.initMiniGalleries().
    ================================================================ */

    window.SystirApp = window.SystirApp || {};


    /* ================================================================
       2. GALLERY TIMING SETTINGS
       ----------------------------------------------------------------
       Purpose:
       - Controls how often the mini galleries automatically change image.

       How to adjust:
       - 5000 = 5 seconds
       - 3500 = 3.5 seconds
       - 3000 = 3 seconds
       - 2500 = 2.5 seconds

       Recommendation:
       - 3000 is active here.
       - Avoid going much below 2500 because the fade/slide transition may
         begin to feel rushed.
    ================================================================ */

    const AUTO_ROTATION_INTERVAL = 4000;


    /* ================================================================
       3. GALLERY DATA LIBRARY
       ----------------------------------------------------------------
       Purpose:
       - Stores the image sets used by each mini gallery.
       - Each object key matches the data-gallery value in the HTML.

       Path note:
       - These paths are relative to index.html, not to this JS file.
    ================================================================ */

    const galleryData = {
        intro: [{
                image: "images/gallery/systir-gallery-image1.png",
                caption: "SYSTIR ensemble portrait"
            },
            {
                image: "images/gallery/systir-gallery-image2.png",
                caption: "Atmospheric ensemble portrait"
            },
            {
                image: "images/gallery/systir-media-image.png",
                caption: "Contemporary ritual performance"
            }
        ],

        collective: [{
                image: "images/gallery/systir-live-image.png",
                caption: "Part of the ANÚNA Collective"
            },
            {
                image: "images/gallery/systir-photography.png",
                caption: "Irish vocal tradition"
            },
            {
                image: "images/gallery/systir-gallery-image1.png",
                caption: "Contemporary vocal performance"
            }
        ],

        members: [{
                image: "images/gallery/systir-members-image.png",
                caption: "SYSTIR members"
            },
            {
                image: "images/gallery/systir-gallery-image2.png",
                caption: "Ensemble collaborators"
            },
            {
                image: "images/gallery/systir-media-image.png",
                caption: "A flexible ensemble of voices"
            }
        ]
    };


    /* ================================================================
       4. initMiniGalleries()
       ----------------------------------------------------------------
       Purpose:
       - Finds every gallery on the page.
       - Connects it to the matching galleryData set.
       - Adds click behaviour to previous/next buttons.
       - Applies the initial active image state for CSS transitions.
       - Starts automatic gallery rotation.
    ================================================================ */

    function initMiniGalleries() {
        const galleries = document.querySelectorAll("[data-gallery]");

        galleries.forEach(gallery => {
            const galleryKey = gallery.dataset.gallery;
            const items = galleryData[galleryKey];

            const image = gallery.querySelector("[data-gallery-image]");
            const caption = gallery.querySelector("[data-gallery-caption]");
            const prevBtn = gallery.querySelector("[data-gallery-prev]");
            const nextBtn = gallery.querySelector("[data-gallery-next]");

            let index = 0;
            let autoRotationTimer = null;


            /* ------------------------------------------------------------
               Guard clause
               ------------------------------------------------------------
               What:
               - Stops this gallery setup if required data/markup is missing.

               Why:
               - Prevents JS errors on pages that do not contain every gallery
                 type or where a gallery is temporarily incomplete.
            ------------------------------------------------------------ */

            if (!items || !items.length || !image) return;


            /* ------------------------------------------------------------
               renderCurrentGalleryItem()
               ------------------------------------------------------------
               What:
               - Reads the current image object from items[index].
               - Updates the visible image src.
               - Updates the image alt text.
               - Updates the visible caption if one exists.
            ------------------------------------------------------------ */

            function renderCurrentGalleryItem() {
                const currentItem = items[index];

                image.src = currentItem.image;
                image.alt = currentItem.caption;

                if (caption) {
                    caption.textContent = currentItem.caption;
                }
            }


            /* ------------------------------------------------------------
               updateGallery()
               ------------------------------------------------------------
               What:
               - Creates a conveyor-belt style transition.
               - Current image exits to the right.
               - Image source changes while hidden.
               - New image enters from the left.

               CSS classes used:
               - is-active
               - is-exiting
               - is-preparing-entry

               Important:
               - This function no longer uses "next" or "prev" animation
                 directions.
               - Even when the previous button is clicked, the visual
                 movement stays consistent.
            ------------------------------------------------------------ */

            function updateGallery() {
                image.classList.remove("is-active");
                image.classList.add("is-exiting");

                setTimeout(() => {
                    renderCurrentGalleryItem();

                    image.classList.remove("is-exiting");
                    image.classList.add("is-preparing-entry");

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            image.classList.remove("is-preparing-entry");
                            image.classList.add("is-active");
                        });
                    });
                }, 700);
            }


            /* ------------------------------------------------------------
               moveToNextImage()
               ------------------------------------------------------------
               What:
               - Moves the gallery forward by one image.
               - Wraps back to the first image after the final item.
            ------------------------------------------------------------ */

            function moveToNextImage() {
                index = (index + 1) % items.length;
                updateGallery();
            }


            /* ------------------------------------------------------------
               moveToPreviousImage()
               ------------------------------------------------------------
               What:
               - Moves the gallery backward by one image.
               - Wraps to the final image when moving back from the first.
            ------------------------------------------------------------ */

            function moveToPreviousImage() {
                index = (index - 1 + items.length) % items.length;
                updateGallery();
            }


            /* ------------------------------------------------------------
               startAutoRotation()
               ------------------------------------------------------------
               What:
               - Starts automatic gallery movement.
               - Changes image every AUTO_ROTATION_INTERVAL milliseconds.
            ------------------------------------------------------------ */

            function startAutoRotation() {
                if (items.length <= 1) return;

                autoRotationTimer = setInterval(() => {
                    moveToNextImage();
                }, AUTO_ROTATION_INTERVAL);
            }


            /* ------------------------------------------------------------
               resetAutoRotation()
               ------------------------------------------------------------
               What:
               - Clears the existing timer.
               - Starts a fresh timer.

               Why:
               - If the visitor manually clicks previous/next, the gallery
                 should not instantly auto-advance again a moment later.
            ------------------------------------------------------------ */

            function resetAutoRotation() {
                if (autoRotationTimer) {
                    clearInterval(autoRotationTimer);
                }

                startAutoRotation();
            }


            /* ------------------------------------------------------------
               Next button behaviour
            ------------------------------------------------------------ */

            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    moveToNextImage();
                    resetAutoRotation();
                });
            }


            /* ------------------------------------------------------------
               Previous button behaviour
            ------------------------------------------------------------ */

            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    moveToPreviousImage();
                    resetAutoRotation();
                });
            }


            /* ------------------------------------------------------------
               Initial gallery setup
               ------------------------------------------------------------
               What:
               - Forces the HTML's first displayed image/caption to match
                 the JS gallery data.
               - Adds .is-active so the image becomes visible.
               - Starts automatic rotation.
            ------------------------------------------------------------ */

            renderCurrentGalleryItem();
            image.classList.add("is-active");
            startAutoRotation();
        });
    }


    /* ================================================================
       5. EXPORT MODULE INITIALISER
       ----------------------------------------------------------------
       Purpose:
       - Makes initMiniGalleries available to main.js without exposing the
         internal galleryData object globally.
    ================================================================ */

    window.SystirApp.initMiniGalleries = initMiniGalleries;
})();