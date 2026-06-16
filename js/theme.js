/* ================================================================
   SYSTIR THEME MODULE
   ----------------------------------------------------------------
   Purpose:
   - Controls the dark/light mode button.
   - Stores the selected theme in localStorage.
   - Applies either .theme-dark or .theme-light to <body>.

   Required HTML hooks:
   - [data-theme-toggle] on the theme button.
   - .theme-toggle__icon inside the button.
================================================================ */

(function() {
    "use strict";

    window.SystirApp = window.SystirApp || {};

    /* ------------------------------------------------------------
       Constants
       ------------------------------------------------------------
       Why:
       - Keeping repeated strings in one place reduces typo risk.
    ------------------------------------------------------------ */
    const STORAGE_KEY = "systir-theme";
    const DARK_THEME = "theme-dark";
    const LIGHT_THEME = "theme-light";

    /* ------------------------------------------------------------
       initThemeToggle()
       ------------------------------------------------------------
       What:
       - Reads any saved theme.
       - Applies the correct body class.
       - Updates the icon and accessible label.
       - Adds click behaviour to switch themes.
    ------------------------------------------------------------ */
    function initThemeToggle() {
        const themeToggle = document.querySelector("[data-theme-toggle]");

        /* --------------------------------------------------------
           Guard clause:
           Some future pages might not include a theme toggle.
        -------------------------------------------------------- */
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector(".theme-toggle__icon");
        const storedTheme = localStorage.getItem(STORAGE_KEY);

        /* --------------------------------------------------------
           applyTheme(theme)
           --------------------------------------------------------
           What:
           - Removes both possible theme classes.
           - Adds the requested theme class.
           - Saves the choice.
           - Updates the icon and ARIA label.
           Why:
           - The CSS theme libraries depend on exactly one active theme
             class being present on <body>.
        -------------------------------------------------------- */
        function applyTheme(theme) {
            document.body.classList.remove(DARK_THEME, LIGHT_THEME);
            document.body.classList.add(theme);

            localStorage.setItem(STORAGE_KEY, theme);

            if (theme === LIGHT_THEME) {
                if (themeIcon) themeIcon.textContent = "☀";
                themeToggle.setAttribute("aria-label", "Switch to dark mode");
                themeToggle.setAttribute("aria-pressed", "true");
            } else {
                if (themeIcon) themeIcon.textContent = "☾";
                themeToggle.setAttribute("aria-label", "Switch to light mode");
                themeToggle.setAttribute("aria-pressed", "false");
            }
        }

        /* --------------------------------------------------------
           Apply saved preference, or fall back to dark mode.
           Why:
           - Dark mode is the intended default SYSTIR aesthetic.
        -------------------------------------------------------- */
        if (storedTheme === LIGHT_THEME || storedTheme === DARK_THEME) {
            applyTheme(storedTheme);
        } else {
            applyTheme(DARK_THEME);
        }

        /* --------------------------------------------------------
           Switch theme on button click.
        -------------------------------------------------------- */
        themeToggle.addEventListener("click", () => {
            const isDark = document.body.classList.contains(DARK_THEME);
            applyTheme(isDark ? LIGHT_THEME : DARK_THEME);
        });
    }

    window.SystirApp.initThemeToggle = initThemeToggle;
})();