// ============================================================
//  Site content — edit everything here
// ------------------------------------------------------------
//  This is the single place non-developers should touch to tell
//  the story. Replace the placeholder images and synthetic
//  messages before publishing, and update each `alt` so it
//  honestly describes the real photo that ships.
//
//  Where do the image files live?
//   All images live in ONE flat folder: `public/images/`.
//   No subfolders — every photo sits directly inside it. Drop
//   each file in using the exact filename shown in the `src` /
//   `image` values below (for example: `01-before-1996.jpg`,
//   `column-1-photo-1.jpg`, `marquee-1.jpg`).
//   Recommended format: .jpg — landscape, ~1600px wide for the
//   timeline photos, ~1000px wide for the wall & marquee. If
//   you use a different extension (.png / .webp), change the
//   matching src / image value below so the extension matches.
//
//   Note: the scrolling road backdrop is loaded from Unsplash,
//   not from `public/images/`. To swap it for a local photo,
//   edit ROAD_IMG in `src/components/RoadCanvas.tsx` and
//   `src/components/Journey.tsx`.
//
//  Guardrails:
//   • Do not add private personal info, sensitive company data,
//     PHI/PII, or any photo/message without the person's consent.
//   • Keep every image `alt` accurate to the real, final image.
// ============================================================

/** A photo with descriptive alt text (required for accessibility). */
export type Photo = {
  src: string
  alt: string
}

/** One chapter in the scrolling life & career timeline. */
export type Chapter = {
  year: string
  title: string
  text: string
  image: string
  alt: string
}

/** A tribute message from a colleague. */
export type Message = {
  name: string
  role: string
  text: string
}

// ------------------------------------------------------------
//  Timeline chapters (Life & career journey section)
// ------------------------------------------------------------
export const chapters: Chapter[] = [
  {
    year: 'Before 1996',
    title: 'The years before',
    text: 'A career already in motion — the education, the earlier work, the quiet lessons that shaped the way she would show up, listen, and lead for the rest of her life.',
    image: '/images/01-before-1996.jpg',
    alt: 'Portrait evoking the early years of Zoukhra’s career, before she joined the team.',
  },
  {
    year: '1996',
    title: 'The day she joined us',
    text: 'She walked in with a steady hand and a full toolkit, and by the end of that first week the team already sensed something rare: someone who cared as much about the people as the work.',
    image: '/images/02-1996-day-she-joined.jpg',
    alt: 'Zoukhra in her first year with the team.',
  },
  {
    year: '1996 – 2016',
    title: 'Two decades of quiet excellence',
    text: 'Release after release, project after project, she became the person you called when something had to be right. Mentor to many, teacher by example, and the calm center of more launches than any of us can count.',
    image: '/images/03-1996-2016-quiet-excellence.jpg',
    alt: 'Zoukhra working alongside colleagues during two decades of projects and launches.',
  },
  {
    year: '2016 – 2026',
    title: 'The wisdom years',
    text: 'In the last decade she became something more than a colleague — a trusted voice in the hardest rooms, a steady friend on the ordinary days, and the person whose judgment we quietly measured our own against.',
    image: '/images/04-2016-2026-wisdom-years.jpg',
    alt: 'Zoukhra offering guidance and mentorship in recent years.',
  },
  {
    year: '2026 →',
    title: 'A well-earned horizon',
    text: 'Nearly thirty years with us, a full career before it, and now the road opens onto something slower and brighter: family, travel, rest, and all the good things that were patient enough to wait for her.',
    image: '/images/05-2026-horizon.jpg',
    alt: 'An open road stretching toward the horizon, representing the journey ahead.',
  },
]

// ------------------------------------------------------------
//  Team messages (From the team section)
// ------------------------------------------------------------
// Placeholder tributes — real messages from the team will slot in here.
export const messages: Message[] = [
  {
    name: 'Kumar Ritesh Raj',
    role: 'Manager Development',
    text: `Zoukhra, it has been an incredible journey working with you over the past 18 years. Your deep knowledge, dedication, and willingness to always help have made a lasting impact on all of us and on PFM.
Thank you for all the memories, support, and countless contributions over the years. You will truly be missed!
Wishing you a **very happy, healthy, and fulfilling retirement**. Enjoy this wonderful new chapter of life—you’ve certainly earned it! 🌷😊
**All the very best, Zoukhra!**`,
  },
  {
    name: 'Betsy Sampson',
    role: 'Senior Software Engineer',
    text: 'Zoukhra, Congratulations on your retirement! I’m not sure what we will do without you! I am really going to miss you! I remember one of the first times we worked together. You were helping me debug an appointment scheduling issue using Serenji. At the same time, I was trying to help Meredith with some calculus extra credit. That’s when we realized we both majored in Mathematics in college. We did enough on her extra credit problem that she was able to keep her grant and stay at UVM. 😊 I can’t even count how many times you have helped me since then. Thank you! It has been so lovely getting to know you over the years. Please stay in touch. I want to know how you are doing. I’ll keep you updated on how Melody is doing and I’ll let you know the next time I’m on-call so you can wish me a nice, boring evening (thank you, Jeff). Enjoy your retirement and extra time with your family. You deserve it! I wish you all the best for the future, wherever it takes you.',
  },
  {
    name: 'Braj Chandra Jha',
    role: 'Expert Software Engineer',
    text: `Dear Zoukhra,

As you begin this well-deserved new chapter of retirement, I want to take a moment to express my sincere gratitude and appreciation for everything you have meant to our team over the years.

Thank you for your friendship, support, and the countless ways you have helped me throughout our years of working together. While we will certainly miss your presence and expertise, I am truly happy that you now have the opportunity to enjoy a well-earned retirement.

Wishing you good health, happiness, relaxation, and many wonderful adventures in the years ahead. May this new chapter bring you as much joy and fulfillment as you have brought to so many of us.

Congratulations on your retirement, Zoukhra. You have truly earned it.

With deepest gratitude and warmest wishes,`,
  },
  {
    name: 'Jigar Gandhi',
    role: 'Associate Manager Development',
    text: `Thank you for building the technical foundation we all rely on today.
Your code, architecture, and wisdom set the highest standard for our PFM team. We truly have big shoes to fill.
It was an honor to work under your guidance.
Thank you for being the ultimate pillar of our tech stack. Your patience during crunch times and your brilliance during codding and reviews made all the difference.
Wishing you the absolute best on your next big adventure!

Thanks & Regards`,
  },
  {
    name: 'Hitesh Joshi',
    role: 'Associate Software Engineer',
    text: `Dear Zoukhra,
    Nearly thirty years for you, just over three for me, and every one of mine you’ve been the person I brought my hardest problems to. Every debugging session, tracing a bug down to its root. Every code review, finding exactly where a change belonged and how it would ripple. Every patient explanation of the **why**. **All of it made me a better engineer.**

I hope retirement gives back all the time you gave to the rest of us — slow mornings, time with family, and wherever the road takes you next. Thank you for all of it.`,
  },
  {
    name: 'Gaurav Mathur',
    role: 'Expert Quality Engineer',
    text: `Dear Zoukhra,
It is hard to imagine our workplace without you!
Thank you for all the wonderful moments, your constant support, your helpful advice, and, most importantly, for being such a great person to work with. You have made the workplace brighter simply by being part of our team.
Retirement is not an ending—it is the beginning of a new adventure, with more time for family, friends, travel, hobbies, and all the things that make you happy.
**We will miss you, but we are excited for you and this wonderful journey ahead. Thank you for being an amazing colleague and an even better teammate.**
Wishing you a joyful, peaceful, and truly memorable retirement!`,
  },
  {
    name: 'Rajan Singh',
    role: 'Expert Quality Engineer',
    text: `On the occasion of your retirement, I wish to extend my sincere congratulations and deepest appreciation for the exemplary service and guidance you have provided throughout your distinguished career.
Your journey has been marked by tireless hard work and has served as a true inspiration to all of us. You have been a pillar of strength for the PFM team. Having had the privilege of working alongside you on numerous occasions, I have consistently admired your unwavering dedication to delivering work of the highest quality.
Thank you for the invaluable contribution and support you have always offered.
I wish you a most fulfilling retirement and every happiness in the years ahead.
With warm regards,`,
  },
  {
    name: 'HiteshKumar Prajapati',
    role: 'Quality Engineer',
    text: `Wishing you a very happy and fulfilling retirement!
It has been a pleasure working with you and learning from your experience.
Your guidance and presence will truly be missed.
May this new chapter bring you lots of happiness, peace, and wonderful memories.
Enjoy your well-deserved retirement! 🌷`,
  },
  {
    name: 'Anuj Prajapati',
    role: 'Associate Software Engineer',
    text: 'Wishing you a very happy and fulfilling retirement! It has been a pleasure working with you and learning from your experience and guidance. Your support, kindness, and positive presence will truly be missed. Thank you for all your contributions and for being an inspiration to those around you. May this new chapter of your life bring you lots of happiness, good health, and wonderful moments with your loved ones. Wishing you a beautiful and relaxing retirement! 🌷',
  },
  {
    name: 'Sagar Sharma',
    role: 'Associate Software Engineer',
    text: 'Dear Zoukhra,\n\nCongratulations on your retirement after 30 wonderful years of dedicated service! Although I had the chance to work with you only once, I truly wish I had more opportunities to learn from your experience and wisdom.\n\nWishing you a happy, peaceful, and fulfilling retirement. You will surely be missed. All the very best for this beautiful new chapter!',
  },
]

// ------------------------------------------------------------
//  Photo wall — three parallax columns + a scrolling marquee
// ------------------------------------------------------------
export const photoColumns: Photo[][] = [
  [
    {
      src: '/images/column-1-photo-1.jpg',
      alt: 'A candid moment with Zoukhra and the team.',
    },
    {
      src: '/images/column-1-photo-2.jpg',
      alt: 'Colleagues gathered at a team event.',
    },
  ],
  [
    {
      src: '/images/column-2-photo-1.jpg',
      alt: 'Zoukhra at work during a project.',
    },
    {
      src: '/images/column-2-photo-2.jpg',
      alt: 'A warm portrait from a team celebration.',
    },
  ],
  [
    {
      src: '/images/column-3-photo-1.jpg',
      alt: 'A relaxed moment between colleagues.',
    },
    {
      src: '/images/column-3-photo-2.jpg',
      alt: 'Friends from the team sharing a laugh.',
    },
  ],
]

export const photoMarquee: Photo[] = [
  {
    src: '/images/marquee-1.jpg',
    alt: 'An open road at golden hour.',
  },
  {
    src: '/images/marquee-2.jpg',
    alt: 'A quiet portrait from the early years.',
  },
  {
    src: '/images/marquee-3.jpg',
    alt: 'Zoukhra with colleagues at her desk.',
  },
  {
    src: '/images/marquee-4.jpg',
    alt: 'A team gathering.',
  },
  {
    src: '/images/marquee-5.jpg',
    alt: 'A smiling portrait from a celebration.',
  },
  {
    src: '/images/marquee-6.jpg',
    alt: 'Colleagues together at an event.',
  },
]
