/* ================================================================
   SYSTIR JS: PAGE BACK BUTTON
   ----------------------------------------------------------------
   Purpose:
   - Enables reusable back buttons across secondary pages.
   - If there is browser history, the button returns to the previous page.
   - If the page was opened directly, it falls back safely to index.html.

   Usage:
   <button type="button" data-page-back>Back</button>
================================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const backButtons = document.querySelectorAll("[data-page-back]");

    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = "index.html";
        });
    });
});