/* ================================================================
   SYSTIR CONTACT FORM MODULE
   ----------------------------------------------------------------
   Purpose:
   - Filters the member-selection list.
   - Handles select-all and clear controls.
   - Updates the selected-member and message-character counters.
   - Performs supportive client-side validation.
   - Prepares the form for a future backend submission endpoint.

   Security note:
   - Client-side filtering can be bypassed.
   - Required fields, blocked terms, spam checks, rate limits, and
     recipient selection must all be repeated on the backend.
================================================================ */

(function() {
    "use strict";


    /* ================================================================
       1. CONFIGURATION
       ----------------------------------------------------------------
       Purpose:
       - Stores words or phrases that should not be accepted.
       - Matching is case-insensitive.

       Important:
       - This is only a browser-side convenience.
       - The backend must repeat the same check before sending email.
    ================================================================ */

    const BLOCKED_TERMS = [
        /* "example blocked term", */
    ];


    /* ================================================================
       2. INITIALISE CONTACT FORM
       ----------------------------------------------------------------
       Purpose:
       - Finds the contact form and all related controls.
       - Stops safely if the page does not contain the form.
    ================================================================ */

    function initContactForm() {
        const form = document.querySelector("[data-contact-form]");

        if (!form) return;


        /* ============================================================
           2.1 FIND FORM ELEMENTS
        ============================================================ */

        const memberSearch = form.querySelector("[data-member-search]");

        const memberOptions = Array.from(
            form.querySelectorAll(".contact-member-option")
        );

        const memberCheckboxes = memberOptions
            .map(function(option) {
                return option.querySelector('input[type="checkbox"]');
            })
            .filter(function(checkbox) {
                return Boolean(checkbox);
            });

        const selectAllButton = form.querySelector(
            "[data-members-select-all]"
        );

        const clearButton = form.querySelector(
            "[data-members-clear]"
        );

        const selectedCount = form.querySelector(
            "[data-members-selected-count]"
        );

        const messageField = form.querySelector(
            "#contactMessage"
        );

        const messageCount = form.querySelector(
            "[data-message-count]"
        );

        const statusElement = form.querySelector(
            "[data-contact-status]"
        );


        /* ============================================================
           3. SAFE FORM FIELD VALUE HELPER
           ------------------------------------------------------------
           Purpose:
           - Retrieves a named form control safely.
           - Avoids optional-chaining syntax such as ?.value.
           - Returns an empty string when the field cannot be found.
        ============================================================ */

        function getFieldValue(fieldName) {
            const field = form.elements.namedItem(fieldName);

            if (!field) {
                return "";
            }

            if (typeof field.value !== "string") {
                return "";
            }

            return field.value;
        }


        /* ============================================================
           4. MEMBER FILTERING
           ------------------------------------------------------------
           Purpose:
           - Filters the visible member options as the user types.
           - Does not uncheck members that have already been selected.
        ============================================================ */

        function filterMembers() {
            if (!memberSearch) return;

            const searchTerm = memberSearch.value
                .trim()
                .toLocaleLowerCase();

            memberOptions.forEach(function(option) {
                const memberName = option.textContent
                    .trim()
                    .toLocaleLowerCase();

                const shouldShow =
                    searchTerm === "" ||
                    memberName.includes(searchTerm);

                option.classList.toggle(
                    "is-filtered-out", !shouldShow
                );
            });
        }


        /* ============================================================
           5. SELECTED MEMBER COUNTER
           ------------------------------------------------------------
           Purpose:
           - Counts checked member options.
           - Updates the accessible status text.
        ============================================================ */

        function updateSelectedCount() {
            if (!selectedCount) return;

            const totalSelected = memberCheckboxes.filter(
                function(checkbox) {
                    return checkbox.checked;
                }
            ).length;

            selectedCount.textContent = String(totalSelected);
        }


        /* ============================================================
           6. MESSAGE CHARACTER COUNTER
           ------------------------------------------------------------
           Purpose:
           - Displays the current number of message characters.
        ============================================================ */

        function updateMessageCount() {
            if (!messageField || !messageCount) return;

            messageCount.textContent = String(
                messageField.value.length
            );
        }


        /* ============================================================
           7. BLOCKED LANGUAGE CHECK
           ------------------------------------------------------------
           Purpose:
           - Searches submitted text for blocked terms.
           - Returns the matching term or undefined when none is found.
        ============================================================ */

        function findBlockedTerm(value) {
            const normalisedValue = value.toLocaleLowerCase();

            return BLOCKED_TERMS.find(function(term) {
                const normalisedTerm = term.toLocaleLowerCase();

                return normalisedValue.includes(normalisedTerm);
            });
        }


        /* ============================================================
           8. STATUS MESSAGE
           ------------------------------------------------------------
           Purpose:
           - Displays validation and submission messages.
           - Applies .is-error when the message represents a problem.
        ============================================================ */

        function setStatus(message, isError) {
            if (!statusElement) return;

            statusElement.textContent = message;

            statusElement.classList.toggle(
                "is-error",
                Boolean(isError)
            );
        }


        /* ============================================================
           9. FIELD VALIDITY MARKERS
           ------------------------------------------------------------
           Purpose:
           - Adds aria-invalid to invalid controls.
           - Skips the hidden honeypot field.
        ============================================================ */

        function updateInvalidFields() {
            const controls = Array.from(
                form.querySelectorAll(
                    "input, select, textarea"
                )
            );

            controls.forEach(function(control) {
                const isHoneypot =
                    control.name === "company_website";

                const isHidden =
                    control.type === "hidden";

                if (isHoneypot || isHidden) {
                    return;
                }

                control.setAttribute(
                    "aria-invalid",
                    String(!control.checkValidity())
                );
            });
        }


        /* ============================================================
           10. CLEAR FIELD VALIDITY WHEN CORRECTED
           ------------------------------------------------------------
           Purpose:
           - Removes the invalid state as soon as a field becomes valid.
        ============================================================ */

        function handleControlInput(event) {
            const control = event.target;

            if (!control || typeof control.checkValidity !== "function") {
                return;
            }

            control.setAttribute(
                "aria-invalid",
                String(!control.checkValidity())
            );
        }


        /* ============================================================
           11. MEMBER CONTROL EVENTS
        ============================================================ */

        if (memberSearch) {
            memberSearch.addEventListener(
                "input",
                filterMembers
            );
        }


        /* ------------------------------------------------------------
           Select all currently visible members
        ------------------------------------------------------------ */

        if (selectAllButton) {
            selectAllButton.addEventListener(
                "click",
                function() {
                    memberCheckboxes.forEach(
                        function(checkbox) {
                            const option = checkbox.closest(
                                ".contact-member-option"
                            );

                            const isVisible =
                                option &&
                                !option.classList.contains(
                                    "is-filtered-out"
                                );

                            if (isVisible) {
                                checkbox.checked = true;
                            }
                        }
                    );

                    updateSelectedCount();
                }
            );
        }


        /* ------------------------------------------------------------
           Clear all selected members
        ------------------------------------------------------------ */

        if (clearButton) {
            clearButton.addEventListener(
                "click",
                function() {
                    memberCheckboxes.forEach(
                        function(checkbox) {
                            checkbox.checked = false;
                        }
                    );

                    updateSelectedCount();
                }
            );
        }


        /* ------------------------------------------------------------
           Update counter after individual checkbox changes
        ------------------------------------------------------------ */

        memberCheckboxes.forEach(function(checkbox) {
            checkbox.addEventListener(
                "change",
                updateSelectedCount
            );
        });


        /* ============================================================
           12. MESSAGE EVENTS
        ============================================================ */

        if (messageField) {
            messageField.addEventListener(
                "input",
                updateMessageCount
            );
        }


        /* ============================================================
           13. GENERAL VALIDATION EVENTS
           ------------------------------------------------------------
           Purpose:
           - Updates aria-invalid while the user edits form controls.
        ============================================================ */

        form.addEventListener(
            "input",
            handleControlInput
        );

        form.addEventListener(
            "change",
            handleControlInput
        );


        /* ============================================================
           14. FORM SUBMISSION
           ------------------------------------------------------------
           Current behaviour:
           - Validates required fields.
           - Rejects configured blocked terms.
           - Rejects honeypot submissions.
           - Stops when no backend endpoint has been connected.
           - Allows normal submission once a valid action URL is added.
        ============================================================ */

        form.addEventListener(
            "submit",
            function(event) {
                setStatus("", false);
                updateInvalidFields();


                /* ----------------------------------------------------
                   Required-field validation
                ---------------------------------------------------- */

                if (!form.checkValidity()) {
                    event.preventDefault();

                    setStatus(
                        "Please complete the required fields before submitting.",
                        true
                    );

                    form.reportValidity();
                    return;
                }


                /* ----------------------------------------------------
                   Gather text fields for blocked-language checking
                   ----------------------------------------------------
                   getFieldValue() is used instead of optional chaining,
                   preventing syntax such as ?.value from being altered
                   incorrectly by a formatter.
                ---------------------------------------------------- */

                const formText = [
                    getFieldValue("name"),
                    getFieldValue("organisation"),
                    getFieldValue("location"),
                    getFieldValue("message")
                ].join(" ");


                /* ----------------------------------------------------
                   Blocked-language validation
                ---------------------------------------------------- */

                const blockedTerm = findBlockedTerm(formText);

                if (blockedTerm) {
                    event.preventDefault();

                    setStatus(
                        "This enquiry contains language that cannot be submitted. Please revise the message.",
                        true
                    );

                    return;
                }


                /* ----------------------------------------------------
                   Honeypot spam check
                ---------------------------------------------------- */

                const honeypot = form.elements.namedItem(
                    "company_website"
                );

                if (
                    honeypot &&
                    typeof honeypot.value === "string" &&
                    honeypot.value.trim() !== ""
                ) {
                    event.preventDefault();

                    setStatus(
                        "The enquiry could not be submitted.",
                        true
                    );

                    return;
                }


                /* ----------------------------------------------------
                   Backend endpoint check
                ---------------------------------------------------- */

                const actionAttribute = form.getAttribute("action");

                const action = actionAttribute ?
                    actionAttribute.trim() :
                    "";

                if (!action) {
                    event.preventDefault();

                    setStatus(
                        "The form design is ready, but the secure email endpoint has not been connected yet.",
                        true
                    );

                    return;
                }


                /* ----------------------------------------------------
                   Submission-in-progress state
                   ----------------------------------------------------
                   This message appears when an endpoint exists and the
                   browser is about to submit the form normally.
                ---------------------------------------------------- */

                setStatus(
                    "Submitting your enquiry...",
                    false
                );
            }
        );


        /* ============================================================
           15. INITIAL STATE
        ============================================================ */

        updateSelectedCount();
        updateMessageCount();
        filterMembers();
    }


    /* ================================================================
       16. START MODULE
       ----------------------------------------------------------------
       Purpose:
       - Waits until the page HTML has been parsed.
    ================================================================ */

    document.addEventListener(
        "DOMContentLoaded",
        initContactForm
    );
})();