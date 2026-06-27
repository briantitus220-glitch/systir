/* ================================================================
   SYSTIR NEWS LANGUAGE TOGGLE
   ----------------------------------------------------------------
   Purpose:
   - Allows language buttons inside a news story to swap only the
     snippet/content inside that same story.
   - Keeps each toggle scoped, so more bilingual news blocks can be
     added later without affecting the whole page.
================================================================ */

(function() {
    "use strict";

    function initNewsLanguageToggle() {
        const languageScopes = document.querySelectorAll("[data-news-language-scope]");

        languageScopes.forEach(function(scope) {
            const languageButtons = scope.querySelectorAll("[data-news-language]");
            const languagePanels = scope.querySelectorAll("[data-news-language-panel]");

            languageButtons.forEach(function(button) {
                button.addEventListener("click", function() {
                    const selectedLanguage = button.getAttribute("data-news-language");

                    languagePanels.forEach(function(panel) {
                        const panelLanguage = panel.getAttribute("data-news-language-panel");
                        panel.hidden = panelLanguage !== selectedLanguage;
                    });

                    languageButtons.forEach(function(languageButton) {
                        const buttonLanguage = languageButton.getAttribute("data-news-language");
                        const isActive = buttonLanguage === selectedLanguage;

                        languageButton.classList.toggle("is-active", isActive);
                        languageButton.setAttribute("aria-pressed", String(isActive));
                    });
                });
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNewsLanguageToggle);
    } else {
        initNewsLanguageToggle();
    }
})();