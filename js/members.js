/* ================================================================
   SYSTIR MEMBER PROFILE DATA + RENDERER
   ----------------------------------------------------------------
   Purpose:
   - Allows one member.html file to display many different member profiles.
   - The selected profile is chosen from the page URL, for example:
     member.html?id=amelia-jones

   Why this exists:
   - Without this file, each performer would need a separate HTML file.
   - With this file, new members can be added by updating one data object.
   - Long biographies are stored as paragraph arrays so the page can render
     them as readable editorial sections instead of one heavy text block.
================================================================ */

/* ================================================================
   1. SHARED MEMBER HELPERS
   ----------------------------------------------------------------
   Purpose:
   - Keeps image naming consistent across every member profile.
   - Uses the naming convention:
     images/members/member-name-image1.png
     images/members/member-name-image2.png
     images/members/member-name-image3.png
     images/members/member-name-image4.png

   Image role:
   - image1 = main portrait / opening profile image
   - image2 = first supporting story image
   - image3 = second supporting story image
   - image4 = final centred paragraph backdrop image
================================================================ */

function buildMemberImages(memberId, memberName) {
    return [{
            src: `images/members/${memberId}-image1.png`,
            alt: `${memberName} portrait`,
            caption: `${memberName}`,
            placement: "main"
        },
        {
            src: `images/members/${memberId}-image2.jpeg`,
            alt: `${memberName} in performance`,
            caption: `${memberName} in performance`,
            placement: "story-1"
        },
        {
            src: `images/members/${memberId}-image3.png`,
            alt: `${memberName} profile image`,
            caption: `${memberName} profile image`,
            placement: "story-2"
        },
        {
            src: `images/members/${memberId}-image4.png`,
            alt: `${memberName} atmospheric backdrop image`,
            caption: `${memberName} backdrop image`,
            placement: "closing-backdrop"
        }
    ];
}

function buildPlaceholderBio(memberName) {
    return [
        `Biography placeholder for ${memberName}. Replace this paragraph with final performer details, background, credits, and links when available.`,
        `Additional paragraphs can be added as separate strings inside this bio array. This keeps the member page readable and allows images to be inserted between paragraph groups.`,
        `Use the images array for extra profile or performance images. Follow the naming convention member-name-image1.png, member-name-image2.png, member-name-image3.png, and member-name-image4.png.`
    ];
}

function buildDefaultStory() {
    return [{
            layout: "image-left",
            imagePlacement: "story-1",
            paragraphIndexes: [0, 1]
        },
        {
            layout: "image-right",
            imagePlacement: "story-2",
            paragraphIndexes: [2, 3, 4]
        },
        {
            layout: "text-only",
            paragraphIndexes: [5, 6, 7]
        }
    ];
}

function buildMemberProfile(memberId, memberName) {
    const images = buildMemberImages(memberId, memberName);

    return {
        name: memberName,
        role: "SYSTIR performer",
        image: images[0].src,
        caption: `${memberName} — SYSTIR performer`,
        quote: "Biography coming soon.",
        bio: buildPlaceholderBio(memberName),
        images: images,
        story: buildDefaultStory()
    };
}

/* ================================================================
   2. MEMBER DATA LIBRARY
   ----------------------------------------------------------------
   Each member is stored under a URL-friendly key.
   Example:
   "amelia-jones" connects to member.html?id=amelia-jones
================================================================ */

const systirMembers = {
    "amelia-jones": {
        name: "Amelia Jones",
        role: "SYSTIR performer",
        image: "images/members/amelia-jones-image1.png",
        caption: "Amelia Jones — SYSTIR performer",
        quote: "All that is needed is the words and the breath; the music will take care of the rest.",
        bio: [
            "The first time I sang as part of a choir was the moment I decided to pursue a singing career. I had experienced powerful moments through singing before, but my first rehearsal with a university group at the age of nineteen was on another level. Singing with others felt like a revelation. I immediately felt safe and secure, yet electric and liberated, and part of something far bigger than myself.",

            "The law and arts degree I was half-heartedly pursuing did not last long after that moment. I decided to audition for the Classical Singing course at WAAPA, a performing arts school in Western Australia. My favourite part of my studies was singing with the vocal ensemble. We would stretch and roll around on the floor like babies, then sing Rheinberger. In the middle of so much operatic repertoire, I began to yearn for other genres. I adored art song, and wanted to sing it without constant vibrato, occasionally adding an expressive glide, folk ornament, or breathy tone — not just for effect, but to tell the story honestly and stay true to how the song made me feel. Regardless of those motivations, I got told off rather a lot in singing lessons.",

            "Around this time, I first discovered ANÚNA. I had chosen to sing “My Lagan Love” in a workshop and searched for recordings until I found the track on Invocation. I was blown away by the effortless purity of the singers, the harmonies that made the hair on the back of my neck stand up, and the extraordinary storytelling quality of Michael McGlynn’s writing and singing.",

            "I kept ANÚNA close to my heart for the best part of a decade. Listening brought me peace and inspiration, and made me feel somehow connected to my heritage and close to home. In the present day, I enjoy a diverse performance career in the UK that encompasses oratorio, baroque, and contemporary music. I also record and improvise vocals for video games, anime, documentaries, and other media. Highlights include singing Enya’s Watermark album with full orchestra, and performing music from video games with my chamber ensemble, Sonaris.",

            "Many years ago, I had the opportunity to record a beautiful vocal line for an indie game called Hollow Knight. I receive messages from people in various languages who tell me very special things: that the song gets their children ready for bed every evening, that it was played at a loved one’s funeral, or that it calms rescue kittens when they become hyperactive. These messages remind me of the incredible power of music to bring people, and even kittens, together. They also bring me back to the powerful effect ANÚNA had on me.",

            "I never thought I would have the opportunity to meet Michael and ANÚNA, to sing with them, or to have the privilege of becoming a member and being endlessly inspired by everyone in the group. Every singer is bursting with authenticity and has something unique and beautiful to share. Singing with ANÚNA is an unmatched experience, where connection and presence in the moment are key. It is extraordinary to have Michael there as composer and director, as well as so many experienced members who can tell us the stories behind the music.",

            "The voices, and Michael’s writing, capture a humanness I do not find anywhere else. It feels ancient, yet immediate, and always truthful. There is nothing else like it.",

            "All that is needed is the words and the breath; the music will take care of the rest."
        ],
        images: buildMemberImages("amelia-jones", "Amelia Jones"),
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [2, 3, 4]
            },
            {
                layout: "text-only",
                paragraphIndexes: [5, 6, 7]
            }
        ]
    },

    "ash-mcglynn": buildMemberProfile("ash-mcglynn", "Ash McGlynn"),
    "judith-lyons": buildMemberProfile("judith-lyons", "Judith Lyons"),
    "lauren-mcglynn": buildMemberProfile("lauren-mcglynn", "Lauren McGlynn"),
    "lorna-breen": buildMemberProfile("lorna-breen", "Lorna Breen"),
    "sara-weeda": buildMemberProfile("sara-weeda", "Sara Weeda"),
    "sara-di-bella": buildMemberProfile("sara-di-bella", "Sara Di Bella"),
    "sigrid-algesten": buildMemberProfile("sigrid-algesten", "Sigrid Algesten"),
    "sorcha-fenlon": buildMemberProfile("sorcha-fenlon", "Sorcha Fenlon"),
    "stephanie-devlin": buildMemberProfile("stephanie-devlin", "Stephanie Devlin")
};

/* ================================================================
   3. READ SELECTED MEMBER FROM URL
   ----------------------------------------------------------------
   URLSearchParams reads the ?id= part of the browser URL.
   Fallback behaviour:
   - If no id is provided, load Amelia Jones as a safe default.
   - If an invalid id is provided, also load Amelia Jones.
================================================================ */

function getSelectedMember() {
    const urlParameters = new URLSearchParams(window.location.search);
    const requestedMemberId = urlParameters.get("id") || "amelia-jones";

    return systirMembers[requestedMemberId] || systirMembers["amelia-jones"];
}

/* ================================================================
   4. SMALL HTML ESCAPE HELPER
   ----------------------------------------------------------------
   Purpose:
   - Keeps generated profile HTML safe if biography text contains symbols.
   - Data is still authored locally, but escaping prevents accidental markup
     breakage from ampersands, angle brackets, or quote characters.
================================================================ */

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* ================================================================
   5. IMAGE LOOKUP HELPERS
   ----------------------------------------------------------------
   Purpose:
   - Finds the image assigned to a story section.
   - Falls back safely if a member only has a main image for now.
================================================================ */

function getImageByPlacement(member, placement) {
    const images = Array.isArray(member.images) ? member.images : [];

    return images.find(function(image) {
        return image.placement === placement;
    });
}

function buildStoryImageCard(image, modifierClass) {
    if (!image) {
        return "";
    }

    return `
        <figure class="member-profile__story-image ${modifierClass}">
            <img
                class="member-profile__story-image-media"
                src="${escapeHtml(image.src)}"
                alt="${escapeHtml(image.alt)}"
                loading="lazy"
            />

            <figcaption class="member-profile__story-image-caption">
                ${escapeHtml(image.caption)}
            </figcaption>
        </figure>
    `;
}

/* ================================================================
   6. BIOGRAPHY PARAGRAPH HELPERS
   ----------------------------------------------------------------
   Purpose:
   - Converts selected biography paragraphs into real <p> elements.
   - Story sections use paragraph indexes so content can be re-ordered
     visually without duplicating biography text.
================================================================ */

function buildParagraphHtml(paragraph) {
    return `<p class="member-profile__paragraph">${escapeHtml(paragraph)}</p>`;
}

function getParagraphsByIndex(member, indexes) {
    const paragraphs = Array.isArray(member.bio) ? member.bio : [member.bio];

    return indexes
        .map(function(index) {
            return paragraphs[index];
        })
        .filter(function(paragraph) {
            return Boolean(paragraph);
        });
}

function buildStoryCopyHtml(member, indexes) {
    return getParagraphsByIndex(member, indexes)
        .map(buildParagraphHtml)
        .join("");
}

/* ================================================================
   7. STORY SECTION TEMPLATE
   ----------------------------------------------------------------
   Purpose:
   - Renders alternating editorial rows:
     image left / text right;
     text left / image right;
     centred text-only closing section.
================================================================ */

function buildStorySectionHtml(member, section) {
    const layout = section.layout || "text-only";
    const copyHtml = buildStoryCopyHtml(member, section.paragraphIndexes || []);
    const image = getImageByPlacement(member, section.imagePlacement);

    if (layout === "image-left") {
        return `
            <section class="member-profile__story-section member-profile__story-section--image-left">
                ${buildStoryImageCard(image, "member-profile__story-image--left")}

                <div class="member-profile__story-copy">
                    ${copyHtml}
                </div>
            </section>
        `;
    }

    if (layout === "image-right") {
        return `
            <section class="member-profile__story-section member-profile__story-section--image-right">
                <div class="member-profile__story-copy">
                    ${copyHtml}
                </div>

                ${buildStoryImageCard(image, "member-profile__story-image--right")}
            </section>
        `;
    }

    const backdropImage = getImageByPlacement(member, "closing-backdrop");

    const backdropStyle = backdropImage ?
        ` style="background-image: linear-gradient(180deg, rgba(7, 13, 11, 0.72), rgba(7, 13, 11, 0.58)), url('${escapeHtml(backdropImage.src)}');"` :
        "";

    return `
    <section class="member-profile__story-section member-profile__story-section--text-only"${backdropStyle}>
        <div class="member-profile__story-copy">
            ${copyHtml}
        </div>
    </section>
`;
}

/* ================================================================
   8. STORY TEMPLATE
   ----------------------------------------------------------------
   Purpose:
   - Renders the member's configured story sections.
   - Falls back to a default alternating structure if no custom story exists.
================================================================ */

function buildStoryHtml(member) {
    const story = Array.isArray(member.story) ? member.story : buildDefaultStory();

    return story
        .map(function(section) {
            return buildStorySectionHtml(member, section);
        })
        .join("");
}

/* ================================================================
   9. RENDER MEMBER PROFILE
   ----------------------------------------------------------------
   Finds the placeholders in member.html and fills them with the selected
   member's data.
================================================================ */

function renderMemberProfile() {
    const member = getSelectedMember();

    const nameTarget = document.querySelector("[data-member-name]");
    const roleTarget = document.querySelector("[data-member-role]");
    const quoteTarget = document.querySelector("[data-member-quote]");
    const storyTarget = document.querySelector("[data-member-story]");
    const imageTarget = document.querySelector("[data-member-image]");
    const captionTarget = document.querySelector("[data-member-caption]");

    if (nameTarget) {
        nameTarget.textContent = member.name;
    }

    if (roleTarget) {
        roleTarget.textContent = member.role;
    }

    if (quoteTarget) {
        quoteTarget.textContent = member.quote || "";
    }

    if (storyTarget) {
        storyTarget.innerHTML = buildStoryHtml(member);
    }

    if (imageTarget) {
        imageTarget.src = member.image;
        imageTarget.alt = member.caption;
    }

    if (captionTarget) {
        captionTarget.textContent = member.caption;
    }

    document.title = `SYSTIR | ${member.name}`;
}

/* ================================================================
   10. BOOT
   ----------------------------------------------------------------
   defer ensures this file runs after HTML parsing, but DOMContentLoaded
   keeps the logic explicit and safe.
================================================================ */

document.addEventListener("DOMContentLoaded", renderMemberProfile);