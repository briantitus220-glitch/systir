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
================================================================ */

/* ================================================================
   1. MEMBER DATA LIBRARY
   ----------------------------------------------------------------
   Each member is stored under a URL-friendly key.
   Example:
   "amelia-jones" connects to member.html?id=amelia-jones
================================================================ */

const systirMembers = {
    "amelia-jones": {
        name: "Amelia Jones",
        role: "SYSTIR performer",
        image: "images/members/amelia-jones-image.png",
        caption: "Amelia Jones — SYSTIR performer",
        bio: `The first time I sang as part of a choir was the moment I decided to pursue a singing career. I had experienced powerful moments through singing before, but my first rehearsal with a university group at the age of nineteen was on another level. Singing with others felt like a revelation. I immediately felt safe and secure, yet electric and liberated, and part of something far bigger than myself.
The law and arts degree I was half-heartedly pursuing did not last long after that moment. I decided to audition for the Classical Singing course at WAAPA, a performing arts school in Western Australia. My favourite part of my studies was singing with the vocal ensemble. We would stretch and roll around on the floor like babies, then sing Rheinberger. In the middle of so much operatic repertoire, I began to yearn for other genres. I adored art song, and wanted to sing it without constant vibrato, occasionally adding an expressive glide, folk ornament, or breathy tone — not just for effect, but to tell the story honestly and stay true to how the song made me feel. Regardless of those motivations, I got told off rather a lot in singing lessons.

Around this time, I first discovered ANÚNA. I had chosen to sing “My Lagan Love” in a workshop and searched for recordings until I found the track on Invocation. I was blown away by the effortless purity of the singers, the harmonies that made the hair on the back of my neck stand up, and the extraordinary storytelling quality of Michael McGlynn’s writing and singing.

I kept ANÚNA close to my heart for the best part of a decade. Listening brought me peace and inspiration, and made me feel somehow connected to my heritage and close to home. In the present day, I enjoy a diverse performance career in the UK that encompasses oratorio, baroque, and contemporary music. I also record and improvise vocals for video games, anime, documentaries, and other media. Highlights include singing Enya’s Watermark album with full orchestra, and performing music from video games with my chamber ensemble, Sonaris.

Many years ago, I had the opportunity to record a beautiful vocal line for an indie game called Hollow Knight. I receive messages from people in various languages who tell me very special things: that the song gets their children ready for bed every evening, that it was played at a loved one’s funeral, or that it calms rescue kittens when they become hyperactive. These messages remind me of the incredible power of music to bring people, and even kittens, together. They also bring me back to the powerful effect ANÚNA had on me.

I never thought I would have the opportunity to meet Michael and ANÚNA, to sing with them, or to have the privilege of becoming a member and being endlessly inspired by everyone in the group. Every singer is bursting with authenticity and has something unique and beautiful to share. Singing with ANÚNA is an unmatched experience, where connection and presence in the moment are key. It is extraordinary to have Michael there as composer and director, as well as so many experienced members who can tell us the stories behind the music.

The voices, and Michael’s writing, capture a humanness I do not find anywhere else. It feels ancient, yet immediate, and always truthful. There is nothing else like it.

All that is needed is the words and the breath; the music will take care of the rest.`
    },

    "ash-mcglynn": {
        name: "Ash McGlynn",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Ash McGlynn — SYSTIR performer",
        bio: "Biography placeholder for Ash McGlynn. Replace this text with final performer details, credits, and links when available."
    },

    "judith-lyons": {
        name: "Judith Lyons",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Judith Lyons — SYSTIR performer",
        bio: "Biography placeholder for Judith Lyons. Replace this text with final performer details, credits, and links when available."
    },

    "lauren-mcglynn": {
        name: "Lauren McGlynn",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Lauren McGlynn — SYSTIR performer",
        bio: "Biography placeholder for Lauren McGlynn. Replace this text with final performer details, credits, and links when available."
    },

    "lorna-breen": {
        name: "Lorna Breen",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Lorna Breen — SYSTIR performer",
        bio: "Biography placeholder for Lorna Breen. Replace this text with final performer details, credits, and links when available."
    },

    "sara-weeda": {
        name: "Sara Weeda",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Sara Weeda — SYSTIR performer",
        bio: "Biography placeholder for Sara Weeda. Replace this text with final performer details, credits, and links when available."
    },

    "sara-di-bella": {
        name: "Sara Di Bella",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Sara Di Bella — SYSTIR performer",
        bio: "Biography placeholder for Sara Di Bella. Replace this text with final performer details, credits, and links when available."
    },

    "sigrid-algesten": {
        name: "Sigrid Algesten",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Sigrid Algesten — SYSTIR performer",
        bio: "Biography placeholder for Sigrid Algesten. Replace this text with final performer details, credits, and links when available."
    },

    "sorcha-fenlon": {
        name: "Sorcha Fenlon",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Sorcha Fenlon — SYSTIR performer",
        bio: "Biography placeholder for Sorcha Fenlon. Replace this text with final performer details, credits, and links when available."
    },

    "stephanie-devlin": {
        name: "Stephanie Devlin",
        role: "SYSTIR performer",
        image: "images/gallery/systir-media-image.png",
        caption: "Stephanie Devlin — SYSTIR performer",
        bio: "Biography placeholder for Stephanie Devlin. Replace this text with final performer details, credits, and links when available."
    }
};

/* ================================================================
   2. READ SELECTED MEMBER FROM URL
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
   3. RENDER MEMBER PROFILE
   ----------------------------------------------------------------
   Finds the placeholders in member.html and fills them with the selected
   member's data.
================================================================ */

function renderMemberProfile() {
    const member = getSelectedMember();

    const nameTarget = document.querySelector("[data-member-name]");
    const roleTarget = document.querySelector("[data-member-role]");
    const bioTarget = document.querySelector("[data-member-bio]");
    const imageTarget = document.querySelector("[data-member-image]");
    const captionTarget = document.querySelector("[data-member-caption]");

    if (nameTarget) {
        nameTarget.textContent = member.name;
    }

    if (roleTarget) {
        roleTarget.textContent = member.role;
    }

    if (bioTarget) {
        bioTarget.textContent = member.bio;
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
   4. BOOT
   ----------------------------------------------------------------
   defer ensures this file runs after HTML parsing, but DOMContentLoaded
   keeps the logic explicit and safe.
================================================================ */

document.addEventListener("DOMContentLoaded", renderMemberProfile);