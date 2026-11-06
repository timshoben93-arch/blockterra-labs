/**
 * Hero background — self-hosted MP4 only (never YouTube embed / never login wall).
 * Topical RWA tokenization film (~4:00 muted loop). YouTube originals are bot-gated
 * for automated download; this cut is sourced from a public BitChute RWA explainer
 * (“Real World Asset Tokenization - How Will RWAs Reshape Finance”), trimmed + muted.
 *
 * Ecosystem films below remain separate click-to-play RWA Avaitar YouTube explainers.
 */
export const HERO_VIDEO = {
  src: "/videos/hero-background.mp4",
  srcMobile: "/videos/hero-background-mobile.mp4",
  poster: "/videos/hero-poster.jpg",
} as const;

export const FEATURED_VIDEO = {
  youtubeId: "PfWi4GWwhCQ",
  title: "RWA Tokenization: From Real-World Asset to Structured Digital Capital",
  source: "RWA Avaitar",
  duration: "4:10",
  url: "https://www.youtube.com/watch?v=PfWi4GWwhCQ",
  description:
    "A four-minute institutional overview of real-world asset tokenization — from asset qualification and commercial objectives through legal, regulatory and custody design to issuance, distribution, settlement and ongoing servicing.",
  topics: [
    { label: "Asset tokenization", covered: true },
    { label: "Digital securities", covered: true },
    { label: "Real estate", covered: true },
    { label: "Private markets", covered: true },
    { label: "Fixed income", covered: false },
    { label: "Infrastructure", covered: false },
    { label: "Compliance", covered: true },
    { label: "Custody and settlement", covered: true },
    { label: "Interoperability", covered: false },
    { label: "Lifecycle management", covered: true },
  ],
} as const;

/** Additional topical RWA shorts (same channel) — no desk/street ambience. */
export const RWA_VIDEO_LIBRARY = [
  {
    youtubeId: "YmFKylOfCh8",
    title: "What Is Asset Tokenization? The Shift to Digital Ownership",
    duration: "1:37",
    focus: "Asset tokenization",
  },
  {
    youtubeId: "TUL15TS5P9U",
    title: "How Custody Protects Tokenized Real-World Assets",
    duration: "1:03",
    focus: "Custody",
  },
  {
    youtubeId: "IPO_98M_5b0",
    title: "Tokenized Real Estate: Where Is the Property Stored?",
    duration: "1:40",
    focus: "Real estate",
  },
  {
    youtubeId: "W6kQ3bRH6gQ",
    title: "The Architecture of Trust behind credible digital markets",
    duration: "2:11",
    focus: "Institutional infrastructure",
  },
] as const;
