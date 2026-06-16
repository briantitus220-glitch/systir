/* ================================================================
   SYSTIR LIVE EVENTS MODULE
   ----------------------------------------------------------------
   Purpose:
   - Stores and renders SYSTIR live/tour dates.
   - Keeps the event archive out of live.html.
   - Groups events by year and month.
   - Supports live search and filtering by year/availability/action.
   - Uses fixed event data slots so every event row can be styled
     consistently even when some information is missing.
   - Automatically labels past events as "Details" and future events
     as "Tickets".
   - Opens a small bilingual dropdown for past event details.

   Required HTML hooks:
   - <div id="liveEvents"></div>
   - <form id="liveEventsFilter"></form>
   - <input id="liveEventsSearch">
   - <select id="liveEventsYear">
   - <select id="liveEventsStatus">
================================================================ */

(function() {
        "use strict";

        /* ================================================================
           1. EVENT DATA
           ----------------------------------------------------------------
           Purpose:
           - This is the editable live/tour archive.
           - Each event uses the same fields so the rendered layout remains
             consistent.

           Field guide:
           - year: grouping year.
           - month: grouping month.
           - date: visible date/day text.
           - time: optional performance time.
           - country: country or region label.
           - title: event/festival/programme title.
           - venue: venue name or venue note.
           - city: city/location detail.
           - availability: future-only availability label, e.g. SOLD OUT / TBC.
           - actionLink: optional ticket URL. Use "#" until final.
           - detailsEnglish: optional English detail sentence for past events.
           - detailsLocal: optional local-language detail sentence.
           - detailsLanguage: optional label for the local-language sentence.

           Important:
           - actionLabel is not needed.
           - The module automatically displays:
             Past events   -> Details
             Future events -> Tickets
        ================================================================ */

        const liveEvents = [{
                year: "2026",
                month: "October",
                date: "01 October",
                time: "",
                country: "Germany",
                title: "Songs of the Living Land",
                venue: "Seminarkirche",
                city: "Mainz",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "German"
            },
            {
                year: "2026",
                month: "May",
                date: "24 May",
                time: "",
                country: "UK",
                title: "Swaledale Festival",
                venue: "",
                city: "Richmond, North Yorkshire",
                availability: "SOLD OUT",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: ""
            },

            {
                year: "2025",
                month: "October",
                date: "17 October",
                time: "",
                country: "China",
                title: "Dalian",
                venue: "Dalian Grand Theatre",
                city: "大连 Dalian",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "19 October",
                time: "",
                country: "China",
                title: "Shijiazhuang",
                venue: "Hebei Arts Center",
                city: "石家庄 Shijiazhuang",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "21 October",
                time: "",
                country: "China",
                title: "Fuding",
                venue: "Fuding Grand Theater",
                city: "福鼎 Fuding",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "23 October",
                time: "",
                country: "China",
                title: "Fuzhou",
                venue: "Fujian Grand Theater",
                city: "福州 Fuzhou",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "24 October",
                time: "",
                country: "China",
                title: "Shanghai Festival",
                venue: "Shanghai Urban Lawn Music Plaza",
                city: "上海 Shanghai",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "25 October",
                time: "",
                country: "China",
                title: "Shanghai Festival",
                venue: "Venue details to follow",
                city: "上海 Shanghai",
                availability: "TBC",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "October",
                date: "24 October",
                time: "",
                country: "China",
                title: "Liuzhou",
                venue: "Liuzhou Art Center",
                city: "柳州 Liuzhou",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Chinese"
            },
            {
                year: "2025",
                month: "September",
                date: "25/26 September",
                time: "",
                country: "Finland",
                title: "The Irish Festival of Oulu",
                venue: "",
                city: "Oulu",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Finnish"
            },
            {
                year: "2025",
                month: "August",
                date: "10 August",
                time: "",
                country: "Ireland",
                title: "The Venue at Walters",
                venue: "",
                city: "Dún Laoghaire",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2025",
                month: "July",
                date: "25 July",
                time: "",
                country: "Germany",
                title: "Mainzer Musiksommer",
                venue: "",
                city: "Mainz",
                availability: "SOLD OUT",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "German"
            },
            {
                year: "2025",
                month: "May",
                date: "09 May",
                time: "20:00",
                country: "Iceland",
                title: "Hannesarholt",
                venue: "",
                city: "Reykjavík",
                availability: "SOLD OUT",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Icelandic"
            },
            {
                year: "2025",
                month: "May",
                date: "10 May",
                time: "16:00",
                country: "Iceland",
                title: "Hallgrímskirkja í Saurbæ",
                venue: "",
                city: "Hvalfjörður",
                availability: "",
                actionLink: "#",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Icelandic"
            },
            {
                year: "2025",
                month: "March",
                date: "14 March",
                time: "",
                country: "Ireland",
                title: "The Lark",
                venue: "",
                city: "Balbriggan",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2025",
                month: "March",
                date: "15 March",
                time: "19:30",
                country: "Nth. Ireland",
                title: "Home of St Patrick’s Festival",
                venue: "St Patrick's Church of Ireland Cathedral",
                city: "Armagh",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: ""
            },
            {
                year: "2025",
                month: "January",
                date: "15–19 January",
                time: "",
                country: "Ireland",
                title: "Your Roots are Showing Conference",
                venue: "",
                city: "Killarney",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2025",
                month: "January",
                date: "24 January",
                time: "20:00",
                country: "Ireland",
                title: "Tradfest",
                venue: "",
                city: "Co. Dublin",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },

            {
                year: "2024",
                month: "August",
                date: "03 August",
                time: "",
                country: "Italy",
                title: "Luoghi della Voce Festival",
                venue: "Castello di Gombola",
                city: "Modena",
                availability: "SOLD OUT",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Italian"
            },
            {
                year: "2024",
                month: "February",
                date: "04 February",
                time: "",
                country: "Ireland",
                title: "Féile na mBan",
                venue: "The Kicking Donkey",
                city: "Bundoran, Co. Donegal",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2024",
                month: "January",
                date: "27 January",
                time: "",
                country: "Ireland",
                title: "The Lark Concert Hall",
                venue: "",
                city: "Balbriggan",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },

            {
                year: "2023",
                month: "December",
                date: "02 December",
                time: "",
                country: "Nth. Ireland",
                title: "Game of Thrones Studio",
                venue: "",
                city: "Banbridge",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: ""
            },
            {
                year: "2023",
                month: "October",
                date: "07 October",
                time: "",
                country: "Ireland",
                title: "Voices by the Sea",
                venue: "",
                city: "Galway",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2023",
                month: "August",
                date: "31 August",
                time: "20:00",
                country: "Ireland",
                title: "The Celtic World Forum",
                venue: "",
                city: "Balbriggan",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            },
            {
                year: "2023",
                month: "April",
                date: "21 April",
                time: "20:30",
                country: "Netherlands",
                title: "Tilburg",
                venue: "",
                city: "Tilburg",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "22 April",
                time: "20:00",
                country: "Netherlands",
                title: "De Verbeelding",
                venue: "",
                city: "Zeewolde",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "23 April",
                time: "14:00",
                country: "Netherlands",
                title: "De Lawei",
                venue: "",
                city: "Drachten",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "25 April",
                time: "20:15",
                country: "Netherlands",
                title: "Tivoli / Cloud 9",
                venue: "",
                city: "Utrecht",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "27 April",
                time: "20:15",
                country: "Belgium",
                title: "De Werft",
                venue: "",
                city: "Geel",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "28 April",
                time: "20:15",
                country: "Netherlands",
                title: "Tamboer",
                venue: "",
                city: "Hoogeveen",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "April",
                date: "29 April",
                time: "20:30",
                country: "Netherlands",
                title: "Junushoff",
                venue: "",
                city: "Wageningen",
                availability: "",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Dutch"
            },
            {
                year: "2023",
                month: "March",
                date: "31 March",
                time: "20:00",
                country: "Ireland",
                title: "IIMS Dublin",
                venue: "",
                city: "Balbriggan",
                availability: "SOLD OUT",
                actionLink: "",
                detailsEnglish: "",
                detailsLocal: "",
                detailsLanguage: "Irish"
            }
        ];


        /* ================================================================
           2. DOM TARGETS
           ----------------------------------------------------------------
           Purpose:
           - Finds the event archive and filter controls.
           - If the page does not contain #liveEvents, the script safely stops.
        ================================================================ */

        const liveEventsMount = document.getElementById("liveEvents");
        const searchInput = document.getElementById("liveEventsSearch");
        const yearSelect = document.getElementById("liveEventsYear");
        const statusSelect = document.getElementById("liveEventsStatus");
        const filterForm = document.getElementById("liveEventsFilter");

        if (!liveEventsMount) return;


        /* ================================================================
           3. DATE PARSING HELPERS
           ----------------------------------------------------------------
           Purpose:
           - Converts event year/month/date fields into a comparable Date.
           - Allows the module to decide whether an event is past or future.

           Notes:
           - For date ranges like "15–19 January", the first number is used.
           - For "25/26 September", the first number is used.
           - If a day cannot be found, the first day of the month is used.
        ================================================================ */

        const monthIndexes = {
            january: 0,
            february: 1,
            march: 2,
            april: 3,
            may: 4,
            june: 5,
            july: 6,
            august: 7,
            september: 8,
            october: 9,
            november: 10,
            december: 11
        };

        function getEventDay(event) {
            const dayMatch = String(event.date).match(/\d{1,2}/);

            if (!dayMatch) {
                return 1;
            }

            return Number(dayMatch[0]);
        }

        function getEventDate(event) {
            const year = Number(event.year);
            const month = monthIndexes[String(event.month).toLowerCase()];
            const day = getEventDay(event);

            if (!year || month === undefined) {
                return null;
            }

            return new Date(year, month, day);
        }

        function isPastEvent(event) {
            const eventDate = getEventDate(event);

            if (!eventDate) {
                return false;
            }

            const today = new Date();
            const startOfToday = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

            return eventDate < startOfToday;
        }

        function getActionLabel(event) {
            return isPastEvent(event) ? "Details" : "Tickets";
        }


        /* ================================================================
           4. EMPTY SLOT HELPER
           ----------------------------------------------------------------
           Purpose:
           - Gives empty data fields a consistent placeholder.
           - This keeps every event row visually balanced.
        ================================================================ */

        function renderSlotValue(value) {
            if (!value) {
                return `<span class="live-event__empty" aria-hidden="true">—</span>`;
            }

            return value;
        }


        /* ================================================================
           5. DETAILS HELPERS
           ----------------------------------------------------------------
           Purpose:
           - Builds stable IDs and fallback bilingual detail text.
           - Details are only used for past events.
        ================================================================ */

        function slugify(value) {
            return String(value)
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
        }

        function getEventId(event) {
            return slugify([
                event.year,
                event.month,
                event.date,
                event.country,
                event.title
            ].join("-"));
        }

        function getDefaultEnglishDetails(event) {
            const locationParts = [event.venue, event.city].filter(Boolean);
            const locationText = locationParts.length ? ` at ${locationParts.join(", ")}` : "";

            return `A SYSTIR performance${locationText} in ${event.country}.`;
        }

        function getDefaultLocalDetails(event) {
            const place = event.city || event.venue || event.country;

            const localDetailsByLanguage = {
                Chinese: `SYSTIR在${place}的演出。`,
                Dutch: `Een optreden van SYSTIR in ${place}.`,
                Finnish: `SYSTIRin konsertti paikassa ${place}.`,
                German: `Ein SYSTIR-Auftritt in ${place}.`,
                Icelandic: `SYSTIR tónleikar í ${place}.`,
                Irish: `Léiriú de chuid SYSTIR i ${place}.`,
                Italian: `Un’esibizione di SYSTIR a ${place}.`
            };

            return localDetailsByLanguage[event.detailsLanguage] || "";
        }

        function getLocalLanguageLabel(language) {
            const languageLabels = {
                Chinese: "中文",
                Dutch: "Nederlands",
                Finnish: "Suomi",
                German: "Deutsch",
                Icelandic: "Íslenska",
                Irish: "Gaeilge",
                Italian: "Italiano"
            };

            return languageLabels[language] || language;
        }

        function buildEventDetails(event) {
            if (!isPastEvent(event)) return "";

            const eventId = getEventId(event);
            const detailsId = `details-${eventId}`;

            const englishText = event.detailsEnglish || event.detailsText || getDefaultEnglishDetails(event);
            const localText = event.detailsLocal || getDefaultLocalDetails(event);
            const localLabel = event.detailsLanguage ? getLocalLanguageLabel(event.detailsLanguage) : "Local language";

            return `
        <div class="live-event-details" id="${detailsId}" hidden>
            <div class="live-event-details__inner">
                <p class="live-event-details__label">
                    Show details
                </p>

                <p class="live-event-details__text">
                    <span class="live-event-details__language">English:</span>
                    ${englishText}
                </p>

                ${localText ? `
                    <p class="live-event-details__text live-event-details__text--local">
                        <span class="live-event-details__language">${localLabel}:</span>
                        ${localText}
                    </p>
                ` : ""}
            </div>
        </div>
    `;
}


    /* ================================================================
       6. GROUP EVENTS BY YEAR AND MONTH
       ----------------------------------------------------------------
       Purpose:
       - Converts the flat event list into grouped sections.
       - This creates a clear structure:
         Year > Month > Event cards.
    ================================================================ */

    function groupEventsByYearAndMonth(events) {
        return events.reduce((groups, event) => {
            if (!groups[event.year]) {
                groups[event.year] = {};
            }

            if (!groups[event.year][event.month]) {
                groups[event.year][event.month] = [];
            }

            groups[event.year][event.month].push(event);

            return groups;
        }, {});
    }


    /* ================================================================
       7. SEARCH TEXT BUILDER
       ----------------------------------------------------------------
       Purpose:
       - Creates one searchable string per event.
       - This lets the search input match country, city, venue, title,
         month, year, future availability, generated action label,
         time, date, and detail text.
    ================================================================ */

    function getSearchText(event) {
        const availabilityText = isPastEvent(event) ? "" : event.availability;
        const actionLabel = getActionLabel(event);

        return [
            event.year,
            event.month,
            event.date,
            event.time,
            event.country,
            event.title,
            event.venue,
            event.city,
            availabilityText,
            actionLabel,
            event.detailsEnglish,
            event.detailsLocal,
            event.detailsLanguage
        ].join(" ").toLowerCase();
    }


    /* ================================================================
       8. FILTER EVENTS
       ----------------------------------------------------------------
       Purpose:
       - Reads the search/filter controls.
       - Returns only the events that match the selected values.

       Note:
       - The existing #liveEventsStatus select still works.
       - It checks future availability and generated action labels.
    ================================================================ */

    function getFilteredEvents() {
        const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : "";
        const selectedYear = yearSelect ? yearSelect.value : "";
        const selectedStatus = statusSelect ? statusSelect.value.toLowerCase() : "";

        return liveEvents.filter(event => {
            const matchesSearch = !searchValue || getSearchText(event).includes(searchValue);
            const matchesYear = !selectedYear || event.year === selectedYear;

            const availabilityText = isPastEvent(event) ? "" : event.availability;
            const eventStatusText = [
                availabilityText,
                getActionLabel(event)
            ].join(" ").toLowerCase();

            const matchesStatus = !selectedStatus || eventStatusText.includes(selectedStatus);

            return matchesSearch && matchesYear && matchesStatus;
        });
    }


    /* ================================================================
       9. BUILD EVENT ACTION
       ----------------------------------------------------------------
       Purpose:
       - Creates the fixed action slot.
       - Past events always display a Details button.
       - Future events with a URL display a Tickets link.
       - Future events without a URL display a disabled Tickets label.
    ================================================================ */

    function buildEventAction(event) {
        const isPast = isPastEvent(event);

        if (isPast) {
            const eventId = getEventId(event);
            const detailsId = `details-${eventId}`;

            return `
                <button
                    class="live-event__action-button"
                    type="button"
                    data-event-action="details"
                    aria-expanded="false"
                    aria-controls="${detailsId}"
                >
                    Details
                </button>
            `;
        }

        if (event.actionLink) {
            return `
                <a
                    class="live-event__action-link"
                    href="${event.actionLink}"
                    data-event-action="tickets"
                >
                    Tickets
                </a>
            `;
        }

        return `
            <span
                class="live-event__action-label live-event__action-label--disabled"
                data-event-action="tickets"
                aria-disabled="true"
            >
                Tickets
            </span>
        `;
    }


    /* ================================================================
       10. BUILD EVENT CARD
       ----------------------------------------------------------------
       Purpose:
       - Builds one event group using fixed slots:
         Date | Time | Details | Availability | Action

       Why:
       - Every event renders the same structure even when some fields are
         empty, making CSS styling more consistent and polished.
       - Availability is only shown for future events.
       - Past events can open a small details dropdown.
    ================================================================ */

    function buildEventCard(event) {
        const venueLine = event.venue ? `<p class="live-event__venue">${event.venue}</p>` : "";
        const cityLine = event.city ? `<p class="live-event__city">${event.city}</p>` : "";

        const availabilityValue = isPastEvent(event) ? "" : event.availability;
        const availability = renderSlotValue(availabilityValue);

        const action = buildEventAction(event);
        const details = buildEventDetails(event);

        return `
            <div class="live-event-group">
                <article class="live-event">
                    <div class="live-event__date">
                        ${renderSlotValue(event.date)}
                    </div>

                    <div class="live-event__time">
                        ${renderSlotValue(event.time)}
                    </div>

                    <div class="live-event__body">
                        <p class="live-event__country">${event.country}</p>

                        <h3 class="live-event__title">
                            ${event.title}
                        </h3>

                        ${venueLine}
                        ${cityLine}
                    </div>

                    <div class="live-event__availability">
                        ${availability}
                    </div>

                    <div class="live-event__action">
                        ${action}
                    </div>
                </article>

                ${details}
            </div>
        `;
    }


    /* ================================================================
       11. RENDER EMPTY STATE
       ----------------------------------------------------------------
       Purpose:
       - Displays a clear message when no filtered events match.
    ================================================================ */

    function renderEmptyState() {
        liveEventsMount.innerHTML = `
            <div class="live-events__empty">
                <p class="eyebrow">No results</p>

                <p>
                    No live dates match your current search or filter selection.
                </p>
            </div>
        `;
    }


    /* ================================================================
       12. DETAILS DROPDOWN BEHAVIOUR
       ----------------------------------------------------------------
       Purpose:
       - Opens/closes event detail panels.
       - Re-runs after every render because filtering rebuilds the archive.
    ================================================================ */


  function initialiseDetailsDropdowns() {
    const detailButtons = liveEventsMount.querySelectorAll(
        ".live-event__action-button[data-event-action='details']"
    );

    detailButtons.forEach(button => {
        button.addEventListener("click", () => {
            const panelId = button.getAttribute("aria-controls");
            const panel = panelId ? document.getElementById(panelId) : null;

            if (!panel) return;

            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));
            panel.hidden = isOpen;
        });
    });
}


    /* ================================================================
       13. RENDER EVENT ARCHIVE
       ----------------------------------------------------------------
       Purpose:
       - Builds the final grouped archive HTML.
       - Injects it into #liveEvents.
    ================================================================ */

    function renderLiveEvents(events = liveEvents) {
        if (!events.length) {
            renderEmptyState();
            return;
        }

        const groupedEvents = groupEventsByYearAndMonth(events);

        const archiveMarkup = Object.keys(groupedEvents).map(year => {
            const months = groupedEvents[year];

            const monthMarkup = Object.keys(months).map(month => {
                const eventCards = months[month].map(buildEventCard).join("");

                return `
                    <section class="live-events__month" aria-label="${month} ${year}">
                        <h3 class="live-events__month-title">
                            ${month}, ${year}
                        </h3>

                        <div class="live-events__list">
                            <div class="live-events__list-header" aria-hidden="true">
                                <span>Date</span>
                                <span>Time</span>
                                <span>Show</span>
                                <span>Availability</span>
     <span></span>
                            </div>

                            ${eventCards}
                        </div>
                    </section>
                `;
            }).join("");

            return `
                <section class="live-events__year" aria-label="${year} live dates">
                    <h2 class="live-events__year-title">
                        ${year}
                    </h2>

                    ${monthMarkup}
                </section>
            `;
        }).join("");

        liveEventsMount.innerHTML = archiveMarkup;
        initialiseDetailsDropdowns();
    }


    /* ================================================================
       14. APPLY FILTERS
       ----------------------------------------------------------------
       Purpose:
       - Re-renders the archive based on current filter values.
    ================================================================ */

    function applyFilters() {
        const filteredEvents = getFilteredEvents();
        renderLiveEvents(filteredEvents);
    }


    /* ================================================================
       15. FILTER EVENT LISTENERS
       ----------------------------------------------------------------
       Purpose:
       - Makes the search and filter controls interactive.
    ================================================================ */

    if (filterForm) {
        filterForm.addEventListener("submit", event => {
            event.preventDefault();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    if (yearSelect) {
        yearSelect.addEventListener("change", applyFilters);
    }

    if (statusSelect) {
        statusSelect.addEventListener("change", applyFilters);
    }


    /* ================================================================
       16. INITIALISE MODULE
       ----------------------------------------------------------------
       Purpose:
       - Renders the full archive when the page first loads.
    ================================================================ */

    renderLiveEvents();
})();