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
   1. MEMBER LIBRARY
   ----------------------------------------------------------------
   Purpose:
   - Contains the actual webpage content, including image paths and biographies

   Image role:
   - image1 = main portrait / opening profile image
   - image2 = first supporting story image
   - image3 = second supporting story image
   - image4 = final centred paragraph backdrop image
   Amelia has a preconstructed function based image path layout
   Ash has a hard coded image path layout (in the nterest of sharing images)
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
        images: [{
                src: "images/members/amelia-jones-image1.png",
                alt: "Ash McGlynn portrait",
                caption: "Ash McGlynn",
                placement: "main"
            },
            {
                src: "images/members/amelia-jones-image2.jpeg",
                alt: "SYSTIR performance image",
                caption: "SYSTIR in performance",
                placement: "story-1"
            },
            {
                src: "images/members/amelia-jones-image3.png",
                alt: "Ash McGlynn profile image",
                caption: "Ash McGlynn profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Ash McGlynn atmospheric backdrop image",
                caption: "Ash McGlynn backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: buildDefaultStory()
    },

    "ash-mcglynn": {
        name: "Ash McGlynn",
        role: "SYSTIR performer",
        image: "images/members/ash-mcglynn-image1.png",
        caption: "Ash McGlynn — SYSTIR performer",
        quote: "I never remember a time when music was not part of my life.",
        bio: [
            "Aisling, or Ash McGlynn, is from Dublin, Ireland, and has sung with ANÚNA since she first appeared on the album Christmas with ANÚNA in 2009 at the age of six. She travelled to China in 2018, performing at the Three Gorges Festival and representing Ireland as part of ANÚNA. The performance was broadcast on Chinese National Television.",

            "In 2019, Aisling appeared on Japan’s NHK TV as part of the legendary Nodojiman, singing the solo part of the classic anime theme “Mononoke Hime”. She is also a featured soloist on the latest ANÚNA album Eilífð.",

            "In June 2021, she was one of the soloists in the globe-spanning “Maalaulu”, commissioned as part of the Tampere Vocal Music Festival. She performed alongside ANÚNA, Finnish soprano Marjukka Tepponen, and Isaac S. Cates’ gospel group Ordained from Kansas City, USA.",

            "Aisling features as soloist on three songs on the soundtrack of the video game Chrono Cross: The Radical Dreamers Edition, composed by Yasunori Mitsuda and released in April 2022. Under the baton of conductor Eímear Noone, she has performed as a soloist with the Royal Philharmonic Orchestra at the Royal Albert Hall, and at the Concertgebouw in Amsterdam with the Antwerp Philharmonic Orchestra.",

            "In March 2023, Aisling featured in the lineup of Daughters of the Pirate Queen, singing with the National Symphony Orchestra of Ireland under the baton of Eímear Noone at Dublin’s National Concert Hall. The performance featured her own song, “The Blood of the Boar”.",

            "Aisling is featured on the soundtracks of two recent animé projects: Spice and Wolf: Merchant Meets the Wise Wolf, singing the music of Kevin Penkin, and the hugely successful Netflix series Delicious in Dungeon, alongside her sister Lauren, singing the music of Yasunori Mitsuda. She has also recorded an EP of her own work that will be released in the near future.",

            "I never remember a time when ANÚNA was not part of my life. There are pictures of me, just a few months old, lying in my little cot asleep in the Queen Elizabeth Hall in London. I remember travelling in the tour bus, playing with Hozier and the other singers, listening to them sing and talk about music and so many things I never thought would become part of my own little world.",

            "Then one day my Dad asked me to learn the song “Cúnnla” and recorded me in studio singing it. Suddenly, I was a recording artist with a video and a track on an album. It kind of snuck up on me in a way, and today I suppose I take things in my stride that others tell me are scary or nerve-wracking. But it has always just been the way for myself and my sister Lauren.",

            "Highlights of my time with ANÚNA include travelling to China and Japan, and recently being able to sing on the soundtrack of two video games with Yasunori Mitsuda. His beautiful music has been a hugely important part of my life, and I think that being part of SYSTIR also takes my musical journey on to a new level."
        ],
        images: [{
                src: "images/members/ash-mcglynn-image1.png",
                alt: "Ash McGlynn portrait",
                caption: "Ash McGlynn",
                placement: "main"
            },
            {
                src: "images/members/amelia-jones-image2.jpeg",
                alt: "SYSTIR performance image",
                caption: "SYSTIR in performance",
                placement: "story-1"
            },
            {
                src: "images/members/ash-mcglynn-image2.png",
                alt: "Ash McGlynn profile image",
                caption: "Ash McGlynn profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Ash McGlynn atmospheric backdrop image",
                caption: "Ash McGlynn backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [3, 4, 5]
            },
            {
                layout: "text-only",
                paragraphIndexes: [6, 7, 8]
            }
        ]
    },

    "judith-lyons": {
        name: "Judith Lyons",
        role: "SYSTIR performer",
        image: "images/members/judith-lyons-image1.png",
        caption: "Judith Lyons — SYSTIR performer",
        quote: "Biography coming soon.",
        bio: buildPlaceholderBio("Judith Lyons"),
        images: buildMemberImages("judith-lyons", "Judith Lyons"),
        story: buildDefaultStory()
    },

    "lauren-mcglynn": {
        name: "Lauren McGlynn",
        role: "SYSTIR performer",
        image: "images/members/lauren-mcglynn-image1.png",
        caption: "Lauren McGlynn — SYSTIR performer",
        quote: "I am so proud to be a part of SYSTIR.",
        bio: [
            "Lauren McGlynn has sung with ANÚNA since she first appeared on the album Illuminations in 2014. She is a member of SYSTIR and, at nineteen, the youngest member of the group. As well as singing with ANÚNA, she plays mandolin and violin, and has a keen interest in Irish traditional culture and language. Her sister Aisling is also part of ANÚNA.",

            "She appears on the soundtrack of the film Riverdance: The Animated Adventure as soloist on the songs “Lift the Wings” and “The Heart’s Cry”, both of which featured ANÚNA in the original productions of Riverdance in the early 1990s.",

            "In 2022, Lauren was a soloist on the soundtrack of Xenoblade Chronicles 3, singing the music of Japanese composer Yasunori Mitsuda. In 2023, she sang the title song of the video game Bayonetta Origins: Cereza and the Lost Demon. She also appears as a soloist on the Netflix animé Delicious in Dungeon, singing the music of Yasunori Mitsuda.",

            "I’ve grown up with ANÚNA as part of my life, travelling with the group, watching and listening to the way this strange and beautiful thing morphs and changes with time. Having my sister Aisling, mother, and father involved means we have four different perspectives.",

            "I suppose that is why ANÚNA moves forward, rather than standing still. I think Aisling and I have a very unique perspective on why the group is still going after so many years. I think that the way the group is now is the best I can remember, but maybe that is because it is more than twice as old as I am.",

            "ANÚNA has grown into many different forms, firstly M’ANAM, which I love due to the strong Icelandic connection. Iceland is a very special place, and the more time I spend there, the more I want to get to know the people and the landscape.",

            "I am so proud to be a part of SYSTIR. I have gone from watching these talented singers to working with them.",

            "I have also been incredibly lucky to work with so many people that I am in awe of, particularly Yasunori Mitsuda, who has been so kind to me. Working on Bayonetta Origins was an amazing experience. The song is very beautiful, and recording in Abbey Road Studios in London was a magical and unique experience for me.",

            "I can’t wait to see where ANÚNA goes, as I have a few solos on the new album Eilífð, and I am really excited to see where things move on from here."
        ],
        images: [{
                src: "images/members/lauren-mcglynn-image1.png",
                alt: "Ash McGlynn portrait",
                caption: "Ash McGlynn",
                placement: "main"
            },
            {
                src: "images/members/amelia-jones-image3.png",
                alt: "SYSTIR performance image",
                caption: "SYSTIR in performance",
                placement: "story-1"
            },
            {
                src: "images/members/lauren-mcglynn-image3.png",
                alt: "Ash McGlynn profile image",
                caption: "Ash McGlynn profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Ash McGlynn atmospheric backdrop image",
                caption: "Ash McGlynn backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [3, 4, 5]
            },
            {
                layout: "text-only",
                paragraphIndexes: [6, 7, 8]
            }
        ]
    },

    "lorna-breen": {
        name: "Lorna Breen",
        role: "SYSTIR performer",
        image: "images/members/lorna-breen-image1.png",
        caption: "Lorna Breen — SYSTIR performer",
        quote: "You must immerse yourself in the words and the story.",
        bio: [
            "Lorna Breen is a soprano from County Wicklow, Ireland. She is a classically trained singer, having completed a degree and master’s in Music Performance at the Royal Irish Academy of Music, graduating with Distinction.",

            "During her studies, she developed a strong interest in early music and song repertoire, as well as Irish airs and singing in the Irish language. She is a member of SYSTIR.",

            "My first performance with ANÚNA was in Clonard Monastery in March 2020, a few days before the first lockdown in Ireland due to Coronavirus. I had spent the previous months rehearsing with the group and familiarising myself with their ethos, which involves the unification of the breath and a high level of awareness of your fellow singers, even while physically distanced.",

            "You must immerse yourself in the words and the story in order to properly and authentically communicate with your audience.",

            "One of my first childhood singing teachers, Sara Clancy, had been a member of ANÚNA, so I had an awareness of the group from when I was about eleven years old.",

            "What has always struck me about SYSTIR is the beauty and purity of their sound, and the magical atmosphere they can create. When I got the opportunity to rehearse with them and be in and amongst this myself, it was a very special experience.",

            "I am so excited to continue to learn, immersing myself further and gaining a deeper understanding of the SYSTIR technique."
        ],
        images: [{
                src: "images/members/lorna-breen-image1.png",
                alt: "Ash McGlynn portrait",
                caption: "Ash McGlynn",
                placement: "main"
            },
            {
                src: "images/members/amelia-jones-image4.png",
                alt: "SYSTIR performance image",
                caption: "SYSTIR in performance",
                placement: "story-1"
            },
            {
                src: "images/members/lauren-mcglynn-image3.png",
                alt: "Ash McGlynn profile image",
                caption: "Ash McGlynn profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Ash McGlynn atmospheric backdrop image",
                caption: "Ash McGlynn backdrop image",
                placement: "closing-backdrop"
            }
        ],
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
                paragraphIndexes: [5, 6]
            }
        ]
    },

    "sara-weeda": {
        name: "Sara Weeda",
        role: "SYSTIR performer",
        image: "images/members/sara-weeda-image1.png",
        caption: "Sara Weeda — SYSTIR performer",
        quote: "Genres are arbitrary and music is music.",
        bio: [
            "Sara Weeda is a singer, instrumentalist, and songwriter from the Netherlands. She joined ANÚNA in 2013 after years of being a fan of the group. Seven years later, she was not only travelling the world to perform with the ensemble, but also working as production coordinator for the group and as one of the facilitators for ANÚNA’s educational work in the Netherlands.",

            "She is the featured soloist on ANÚNA’s recording of Enya’s “May it Be”, which has been streamed just under 250,000 times on Spotify. In 2022, it was announced that Sara features as soloist on two songs from the video game Xenoblade Chronicles III, singing compositions by Japanese composer Yasunori Mitsuda.",

            "She is a member of SYSTIR, SeeD Pagan Folk, and Crashing Bats.",

            "When I discovered Michael’s music, I was a fourteen-year-old goth who spent too much time on YouTube. I fell in love with the pure sound of the music, the mystical atmosphere, the connection to nature, and the image of a magical place called Ireland. It was a form of escapism from the very non-mystical landscape of my hometown, Rotterdam, in the Netherlands.",

            "I spent weeks analysing every detail: the drones, the haunting melodies, the harmonies, the rhythm, and how every song seemed to be both complex and simple at the same time.",

            "Growing up in a very musical home, singing and playing several instruments was natural to me. However, I did not see myself as a singer, because I had not had training at that time. Joining the group and learning about its ethos changed my view on being a musician and being a singer in a way that motivated me to become the artist I am now.",

            "One of the things that draws me not only to ANÚNA but to music in general is the storytelling aspect of it. The song creates a tiny universe and plot that only exists in the heads of the people who hear it.",

            "I spent my time off from ANÚNA between tours developing that aspect, both on my own and with my bands. SeeD comes closest to what ANÚNA does, even though it involves more instruments and less singing: our music is based around folklore, both existing and self-written tales. We are currently recording our third studio album and hope to return to festival stages around Europe in summer.",

            "Crashing Bats is a rock band whose music was once described by a reviewer as “what would happen if Muse’s Matthew Bellamy was abducted by Queens of the Stone Age and wrote new music with them”, and I do not know a better way to describe it. I have sometimes wondered why I do all these things: ensembles and bands in completely different genres, and freelance work for film composers, pop artists, progressive rock, and post-metal bands.",

            "But I realise now that genres are arbitrary and music is music. What I enjoy most about music is creating something, especially with other people: the magic of each person adding something to the whole to create the music, even more so when each person comes from a different musical background and has their own ideas and influences to bring into the group.",

            "That brings me back to a final note about ANÚNA. Musically, it feels like I was raised by this group: from a child who wanted to soak up the magic, to someone with my own passions and ideas that I can bring into the group and, hopefully, inspire others with."
        ],
        images: [{
                src: "images/members/sara-weeda-image1.png",
                alt: "Sara Weeda portrait",
                caption: "Sara Weeda",
                placement: "main"
            },
            {
                src: "images/gallery/systir-hero-image.png",
                alt: "Sara Weeda performance image",
                caption: "Sara Weeda in performance",
                placement: "story-1"
            },
            {
                src: "images/gallery/systir-live-image.png",
                alt: "Sara Weeda profile image",
                caption: "Sara Weeda profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Sara Weeda atmospheric backdrop image",
                caption: "Sara Weeda backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [3, 4, 5, 6]
            },
            {
                layout: "text-only",
                paragraphIndexes: [7, 8, 9, 10]
            }
        ]
    },

    "sara-di-bella": {
        name: "Sara Di Bella",
        role: "SYSTIR performer",
        image: "images/members/sara-di-bella-image1.png",
        caption: "Sara Di Bella — SYSTIR performer",
        quote: "To sing with ANÚNA you really need to be there.",
        bio: [
            "Crossing from Naples to Sicily in 1787, Goethe reflected on the novelty of seeing himself entirely surrounded by water. Until this happens, he said, you have no conception of the world or of your place in it. As a Sicilian, I want to say, proudly, that I have found my place in music.",

            "Sara Di Bella is a light-lyric soprano trained in opera singing, with a bachelor’s degree from the Music Conservatory in Trapani and a master’s degree from the Royal Irish Academy of Music in Dublin. She also has a degree in Musicology from Palermo University.",

            "Although trained as an opera singer, she has performed with many vocal ensembles including the JSB International Ensemble, the Tenso Chamber Choir, and Philharmonie de Paris. She also participated in the European tour of Joe Hisaishi, the renowned Japanese composer of film soundtracks.",

            "Recently, she recorded the soundtrack of the Harry Potter short film The House of Gaunt with an eight-voice ensemble. She currently lives in Paris, where she teaches singing, and is often asked to collaborate with the Europa Chor Akademie in Görlitz, Germany.",

            "Sara officially started her adventure with ANÚNA in 2013, even if the link had been established long before, when she heard an album for the first time. From a fan to a member, that is quite a journey.",

            "When I was little, at my grandparents’ house, my uncle used to play opera arias at the piano and I used to sing along with him. I loved singing and playing piano, so when I was six, my parents decided to send me to piano lessons. That was the first important step.",

            "The second was when, at the Conservatory, I went for the first time to choral lessons and was asked to sing a solo. I had no fear. I just felt that I was in the right place.",

            "The years passed, and I continued to train as a pianist while singing a lot in choirs and as a soloist. Then, one day, my choir teacher made me realise that I wanted to graduate as a pianist only to have the time to dedicate myself to singing lessons.",

            "The third important step was when I finally found the courage to stop my piano training and begin a new singing path: the best choice I have ever made.",

            "I started singing solos, doing concerts, and singing some opera roles, but my first love was always singing in choir, and I did it whenever I could, even if my singing teachers were not that happy about it.",

            "At some point, lost in all of this, I started looking for something different. I wanted to escape my own island to find something new that I could not get in the physical or musical horizon of my homeland.",

            "One day by the sea, many years ago, I was dreaming about the enchanted lands of Ireland while I was melting in Sicilian heat, and I found ANÚNA. They had something else: something deep and profound that could easily blend with my personal approach to music.",

            "This moment changed my life completely, again. After attending the first ANÚNA International Summer School, I met Michael McGlynn and began my adventure with the group. I moved to Ireland, started rehearsing, and soon began touring the world, bringing Michael McGlynn’s music into contact with different places and cultures.",

            "Singing with them made me realise a lot of things, as a performer, as a singer, and as an artist. To sing with ANÚNA you really need to be there.",

            "Singing with ANÚNA means being present, in the moment, through the breath. Being trained as an opera singer, sometimes you can get caught in your own mind, thinking a lot about technique and the best way to achieve the sound you are looking for.",

            "When you sing with ANÚNA, you become an entity with your fellow singers. You connect with them through the breath, stop overthinking, and start making music.",

            "Together we create an invisible but very solid energy and shape music with it. People in the audience can feel it; they are part of it, and that is why a live ANÚNA concert is always a unique experience.",

            "It is like an elastic band. We hold one end and the audience holds the other. Our performances are always different because our audience is always different, with different responses.",

            "We are a real performing group. We do not have walls, and we are not on a stage to create something flawless. We are not perfect, and that is the beauty in it: ANÚNA is human.",

            "In order to be real, we have to create a link with every single person who is listening to us."
        ],
        images: [{
                src: "images/members/sara-di-bella-image1.png",
                alt: "Sara Di Bella portrait",
                caption: "Sara Di Bella",
                placement: "main"
            },
            {
                src: "images/members/sara-di-bella-image2.png",
                alt: "Sara Di Bella performance image",
                caption: "Sara Di Bella in performance",
                placement: "story-1"
            },
            {
                src: "images/members/sara-di-bella-image3.png",
                alt: "Sara Di Bella profile image",
                caption: "Sara Di Bella profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "SYSTIR atmospheric backdrop image",
                caption: "SYSTIR backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2, 3, 4]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                layout: "text-only",
                paragraphIndexes: [13, 14, 15, 16, 17, 18, 19]
            }
        ]
    },

    "sigrid-algesten": {
        name: "Sigrid Algesten",
        role: "SYSTIR performer",
        image: "images/members/sigrid-algesten-image1.png",
        caption: "Sigrid Algesten — SYSTIR performer",
        quote: "When I sing, it feels like I let my soul out for a flight around the room.",
        bio: [
            "Sigrid Algesten is a member of SYSTIR.",

            "When I sing, it feels like I let my soul out for a flight around the room.",

            "When I sing with others, it feels like my soul expands and our conjoined voices could pierce through the stratosphere. For me, singing produces a very complex array of feelings, meanings, and thoughts. Delivering a message through song is not at all like talking or writing. It is so much stronger.",

            "Singing in a group to an audience puts yet another layer to it. I remember once locking eyes with an elderly man in the audience while performing. Neither of us could look away. He was a stranger to me, but he understood the message. He knew it all.",

            "The energy that flowed between us became firewood, and you could have reached out your hand and felt the warmth of that glow between the stage and the benches. Inevitably, we both had tears running down our faces.",

            "For me, that moment encompasses the magic of choir music. It is a conversation between singers and audience, telling messages and stories you cannot convey in any other way.",

            "I grew up on an island on the west coast of Sweden, secluded from any traffic or other man-made noises. Instead, we lived close to high mountains and caves that made the neighbours’ bull sound like a deity when his wails echoed over the valley.",

            "The caves and mountains were magical, but even more so the ocean that enclosed our island. I truly believe I was a mermaid in my past life, as I have always felt most at peace being surrounded by salt water.",

            "Preferably, I would be completely under the surface, eyes open without goggles, looking at the blur and the bubbles. My mum usually had to drag me from the beach while I begged her to stay, me with blue lips and mum shivering from the cold.",

            "Choir music has been imprinted in my DNA since birth, and even earlier than that, as my parents met at a choir festival. Growing up with highly musical parents, I learned how to read sheet music in parallel with learning the alphabet.",

            "We sang three-part melodies in the car, and early on I became accustomed to performing at various venues and events, as well as listening to hour-long rehearsals in cold churches. Choir music is home. It is the foundation of my very upbringing.",

            "Ever since I was six years old, I have sung in different choirs and have had the opportunity to perform in many different countries and languages, mostly as part of the Gothenburg Youth Choir, led by the nationally recognised and awarded Anne Johansson.",

            "It was also through choir that I had the privilege to perform with Bobby McFerrin at the Gothenburg Concert Hall. I have also been recognised as a soloist and have performed with the Gothenburg Wind Orchestra.",

            "When I first heard ANÚNA and Michael’s music in 2013, I became an instant fan girl. The effortlessness and divinity of their sound absolutely consumed me, and still does.",

            "Years later, in 2017, when I heard that Michael and members of ANÚNA were giving a workshop in Gothenburg with the Gothenburg Youth Choir, I was ecstatic beyond words. Then and there started the journey towards becoming ANÚNA’s first Swedish member in 2022.",

            "Growing up, I had dreams and plans of working with music full time, but in 2016 I unfortunately developed problems with tinnitus and hyperacusis, a hypersensitivity to sound, so I had to rethink.",

            "Now I am a social worker and a beach lifeguard, both of which I take great pride in. Being an ANÚNA member definitely takes the top spot, though."
        ],
        images: [{
                src: "images/members/sigrid-algesten-image1.png",
                alt: "Sigrid Algesten portrait",
                caption: "Sigrid Algesten",
                placement: "main"
            },
            {
                src: "images/gallery/systir-members-image.png",
                alt: "Sigrid Algesten performance image",
                caption: "Sigrid Algesten in performance",
                placement: "story-1"
            },
            {
                src: "images/gallery/systir-youtube-thumbnail.png",
                alt: "Sigrid Algesten profile image",
                caption: "Sigrid Algesten profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "SYSTIR atmospheric backdrop image",
                caption: "SYSTIR backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2, 3, 4, 5]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [6, 7, 8, 9, 10, 11, 12]
            },
            {
                layout: "text-only",
                paragraphIndexes: [13, 14, 15, 16]
            }
        ]
    },
    "sorcha-fenlon": {
        name: "Sorcha Fenlon",
        role: "SYSTIR performer",
        image: "images/members/sorcha-fenlon-image1.png",
        caption: "Sorcha Fenlon — SYSTIR performer",
        quote: "Music and the telling of the story.",
        bio: [
            "Sorcha Fenlon is a musical theatre actor and singer. She trained at the Irish College of Musical Theatre and the Royal Irish Academy of Music in Dublin. She is a member of SYSTIR.",

            "“Acting is behaving truthfully under imaginary circumstances.” — Sanford Meisner",

            "My journey in ANÚNA has been quite special. When I first joined the group in 2016, I thought of myself primarily as a singer. I was studying classical singing but could not quite figure out what I could bring or contribute to the group, because it was different.",

            "Suddenly, I realised that ANÚNA was not a choir and not simply a group of singers, but rather an ensemble of highly skilled musicians and artists sharing one experience. So where was I to fit?",

            "I took some time away from ANÚNA as I progressed through my own musical development. Having finished what was, to me, a very regimented classical training with a huge focus on vocal technique, I followed my heart into acting and musical theatre.",

            "I quickly realised that I was not a singer who could act, but an actor who could sing. I had found a freedom in my performance. I had that fire in the pit of my stomach when I could be someone else and tell their story through song and word.",

            "And I so desperately wanted to share and have that same experience singing with ANÚNA: communication, music, and the telling of the story.",

            "Some of my favourite ANÚNA songs are those set to poetry and stories, because together, as one breath and one voice, we inhabit that poem or story and bring it to life.",

            "It begins in that moment before our first breath and ends in that moment after our last note.",

            "Although these stories, emotions, and words are not our own to tell or feel, it is in our communication and in believing the truths in the words that make it real, and make what we do real.",

            "“I wish I sat on my true love’s knee, many a fond story he told to me. He told me things that ne’er shall be...” — Siúil a Rúin"
        ],
        images: [{
                src: "images/members/sorcha-fenlon-image1.png",
                alt: "Sorcha Fenlon portrait",
                caption: "Sorcha Fenlon",
                placement: "main"
            },
            {
                src: "images/members/sorcha-fenlon-image2.png",
                alt: "Sorcha Fenlon performance image",
                caption: "Sorcha Fenlon in performance",
                placement: "story-1"
            },
            {
                src: "images/members/sorcha-fenlon-image3.png",
                alt: "Sorcha Fenlon profile image",
                caption: "Sorcha Fenlon profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "SYSTIR atmospheric backdrop image",
                caption: "SYSTIR backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2, 3]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [4, 5, 6]
            },
            {
                layout: "text-only",
                paragraphIndexes: [7, 8, 9, 10]
            }
        ]
    },

    "stephanie-devlin": {
        name: "Stephanie Devlin",
        role: "SYSTIR performer",
        image: "images/members/stephanie-devlin-image1.png",
        caption: "Stephanie Devlin — SYSTIR performer",
        quote: "Biography coming soon.",
        bio: buildPlaceholderBio("Stephanie Devlin"),
        images: buildMemberImages("stephanie-devlin", "Stephanie Devlin"),
        story: buildDefaultStory()
    },

    "andrew-boushell": {
        name: "Andrew Boushell",
        role: "SYSTIR collaborator",
        image: "images/members/andrew-boushell-image1.png",
        caption: "Andrew Boushell — SYSTIR collaborator",
        quote: "It is an ensemble like no other.",
        bio: [
            "Andrew Boushell is a multi-instrumentalist and singer from Dublin. He is a graduate of D.I.T. Conservatory of Music and Drama, the Royal College of Music, and Operastudio Vlaanderen, Belgium.",

            "Andrew’s concert career has brought him to venues including the National Concert Hall, Dublin; St George’s Hanover Square, London; Brugge Concertgebouw, Bruges; De Singel, Antwerp; and Handel Halle, Germany. His repertoire includes Puccini’s Messa di Gloria, Rossini’s Petite Messe Solennelle, Elgar’s The Apostles, and Bach’s St John and St Matthew Passions.",

            "Most recently, Andrew completed an MA in Ethnomusicology at U.C.C., with a thesis entitled “Politics, Song, and the Proletariat: An Exploration of Irish Diasporic Identity in the UK”. Andrew is a member of M’ANAM.",

            "Like many people brought up in Ireland during the nineties, my first exposure to ANÚNA came courtesy of Riverdance at Eurovision 1994. The lyrical beauty of that performance immersed the world in an Irish sound, the like of which had never been witnessed. In that moment, Ireland and Irish culture was catapulted into the mainstream, providing the catalyst for a subsequent Irish cultural renaissance.",

            "ANÚNA managed, and continues, to create a liminal space for both performers and audience members alike. The performances transport both musician and listener to very individual spaces, wherein temporal sequences and actualities dissolve, and new empirical expressions and positions emerge.",

            "Having recently become involved with the wider ANÚNA Collective, I am excited to see what the future brings through SYSTIR. It is an ensemble like no other, with friendly, talented, and most importantly passionate individuals coming together to create something special.",

            "SYSTIR feels like an ideal instance of modern-day communitas. Anthropologist Victor Turner labelled communitas as “a matter of giving recognition to an essential and generic human bond, without which there could be no society”.",

            "For me, SYSTIR provides a platform to express and interact with my own sense of Irishness alongside like-minded people, while also promoting the best of Irish music and culture to the world at large."
        ],
        images: [{
                src: "images/members/andrew-boushell-image1.png",
                alt: "Ash McGlynn portrait",
                caption: "Ash McGlynn",
                placement: "main"
            },
            {
                src: "images/gallery/systir-youtube-thumbnail.png",
                alt: "SYSTIR performance image",
                caption: "SYSTIR in performance",
                placement: "story-1"
            },
            {
                src: "images/gallery/systir-members-image.png",
                alt: "Ash McGlynn profile image",
                caption: "Ash McGlynn profile image",
                placement: "story-2"
            },
            {
                src: "images/members/ash-mcglynn-image4.png",
                alt: "Ash McGlynn atmospheric backdrop image",
                caption: "Ash McGlynn backdrop image",
                placement: "closing-backdrop"
            }
        ],
        story: [{
                layout: "image-left",
                imagePlacement: "story-1",
                paragraphIndexes: [0, 1, 2]
            },
            {
                layout: "image-right",
                imagePlacement: "story-2",
                paragraphIndexes: [3, 4, 5]
            },
            {
                layout: "text-only",
                paragraphIndexes: [6, 7]
            }
        ]
    },

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
            <button
                class="member-profile__story-image-button media-tile__image-button"
                type="button"
                aria-label="Open ${escapeHtml(image.caption)} fullscreen"
                data-fullscreen-caption="${escapeHtml(image.caption)}"
            >
                <img
                    class="member-profile__story-image-media"
                    src="${escapeHtml(image.src)}"
                    alt="${escapeHtml(image.alt)}"
                    loading="lazy"
                />
            </button>

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

        const portraitButton = imageTarget.closest(".media-tile__image-button");

        if (portraitButton) {
            portraitButton.setAttribute("data-fullscreen-caption", member.caption);
            portraitButton.setAttribute("aria-label", `Open ${member.caption} fullscreen`);
        }
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