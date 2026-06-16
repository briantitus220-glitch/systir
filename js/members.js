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
        image: "images/gallery/systir-media-image.png",
        caption: "Amelia Jones — SYSTIR performer",
        bio: "Biography placeholder for Amelia Jones. Replace this text with final performer details, credits, and links when available."
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
