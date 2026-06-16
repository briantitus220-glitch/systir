/* ================================================================
   SYSTIR FULLSCREEN VIEWER MODULE
   ----------------------------------------------------------------
   Purpose:
   - Opens eligible images in a fullscreen viewer.
   - Supports next/previous navigation.
   - Supports Escape, ArrowLeft, and ArrowRight keys.
   - Can display captions if #fullscreenCaption exists in the HTML.

   Required HTML hooks:
   - #fullscreenViewer
   - #fullscreenImage
   - #closeFullscreen
   - #fullscreenPrev
   - #fullscreenNext

   Optional HTML hook:
   - #fullscreenCaption

   Eligible image selectors:
   - .gallery-card__image
   - .media-tile__image-button img
   - .media-gallery-frame__image
   - .media-gallery__image

   Grouping:
   - Add data-fullscreen-gallery to a gallery wrapper when next/previous
     should stay inside that section.
================================================================ */

(function() {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    function initFullscreenViewer() {
        const fullscreenViewer = document.getElementById("fullscreenViewer");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const fullscreenCaption = document.getElementById("fullscreenCaption");

        const closeFullscreenBtn = document.getElementById("closeFullscreen");
        const fullscreenPrevBtn = document.getElementById("fullscreenPrev");
        const fullscreenNextBtn = document.getElementById("fullscreenNext");

        let fullscreenImages = [];
        let fullscreenIndex = 0;

        if (!fullscreenViewer || !fullscreenImage) return;

        function getImageCaption(imageElement) {
            const explicitCaptionElement = imageElement.closest("[data-fullscreen-caption]");
            const explicitCaption = explicitCaptionElement ?
                explicitCaptionElement.getAttribute("data-fullscreen-caption") :
                "";

            const galleryCard = imageElement.closest(".gallery-card");
            const mediaTile = imageElement.closest(".media-tile");
            const mediaGalleryFrameItem = imageElement.closest(".media-gallery-frame__item");
            const mediaGalleryItem = imageElement.closest(".media-gallery__item");

            if (explicitCaption) {
                return explicitCaption.trim();
            }

            if (galleryCard) {
                const caption = galleryCard.querySelector("[data-gallery-caption]");

                if (caption) {
                    return caption.textContent.trim();
                }
            }

            if (mediaTile) {
                const label = mediaTile.querySelector(".media-tile__label");

                if (label) {
                    return label.textContent.trim();
                }
            }

            if (mediaGalleryFrameItem) {
                const label = mediaGalleryFrameItem.querySelector(".media-gallery-frame__label");
                const title = mediaGalleryFrameItem.querySelector(".media-gallery-frame__title");

                if (label && title) {
                    return `${label.textContent.trim()} — ${title.textContent.trim()}`;
                }

                if (title) {
                    return title.textContent.trim();
                }
            }

            if (mediaGalleryItem) {
                const memberLink = mediaGalleryItem.querySelector(".media-gallery__member-link");

                if (memberLink) {
                    return memberLink.textContent.trim();
                }
            }

            return imageElement.alt || "";
        }

        function updateFullscreenCaption(activeImage) {
            if (!fullscreenCaption) return;

            fullscreenCaption.textContent = getImageCaption(activeImage);
        }

        function getFullscreenGroupTargets(activeImage) {
            const group = activeImage.closest("[data-fullscreen-gallery]");

            if (!group) {
                return Array.from(fullscreenTargets);
            }

            return Array.from(
                group.querySelectorAll(
                    ".gallery-card__image, .media-tile__image-button img, .media-gallery-frame__image, .media-gallery__image"
                )
            );
        }

        const fullscreenTargets = document.querySelectorAll(
            ".gallery-card__image, .media-tile__image-button img, .media-gallery-frame__image, .media-gallery__image"
        );

        fullscreenTargets.forEach(img => {
            img.style.cursor = "zoom-in";

            img.addEventListener("click", () => {
                fullscreenImages = getFullscreenGroupTargets(img);
                fullscreenIndex = fullscreenImages.indexOf(img);

                openFullscreen();
            });
        });

        function openFullscreen() {
            const activeImage = fullscreenImages[fullscreenIndex];

            if (!activeImage) return;

            fullscreenImage.classList.remove("is-visible");
            updateFullscreenCaption(activeImage);

            fullscreenViewer.classList.add("active");
            document.body.classList.add("no-scroll");

            setTimeout(() => {
                fullscreenImage.src = activeImage.src;
                fullscreenImage.alt = activeImage.alt;
                fullscreenImage.classList.add("is-visible");
            }, 100);
        }

        function closeFullscreen() {
            fullscreenViewer.classList.remove("active");
            fullscreenImage.classList.remove("is-visible");
            document.body.classList.remove("no-scroll");
        }

        function navigateFullscreen(direction) {
            if (!fullscreenImages.length) return;

            fullscreenImage.classList.remove("is-visible");

            setTimeout(() => {
                fullscreenIndex =
                    (fullscreenIndex + direction + fullscreenImages.length) %
                    fullscreenImages.length;

                const activeImage = fullscreenImages[fullscreenIndex];

                if (!activeImage) return;

                fullscreenImage.src = activeImage.src;
                fullscreenImage.alt = activeImage.alt;
                updateFullscreenCaption(activeImage);

                fullscreenImage.classList.add("is-visible");
            }, 180);
        }

        if (fullscreenPrevBtn) {
            fullscreenPrevBtn.addEventListener("click", event => {
                event.stopPropagation();
                navigateFullscreen(-1);
            });
        }

        if (fullscreenNextBtn) {
            fullscreenNextBtn.addEventListener("click", event => {
                event.stopPropagation();
                navigateFullscreen(1);
            });
        }

        if (closeFullscreenBtn) {
            closeFullscreenBtn.addEventListener("click", closeFullscreen);
        }

        fullscreenViewer.addEventListener("click", event => {
            if (event.target === fullscreenViewer) {
                closeFullscreen();
            }
        });

        document.addEventListener("keydown", event => {
            if (!fullscreenViewer.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeFullscreen();
            }

            if (event.key === "ArrowLeft") {
                navigateFullscreen(-1);
            }

            if (event.key === "ArrowRight") {
                navigateFullscreen(1);
            }
        });
    }

    window.SystirApp.initFullscreenViewer = initFullscreenViewer;
})();