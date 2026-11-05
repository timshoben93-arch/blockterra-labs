/**
 * Homepage RWA tokenization videos.
 *
 * Selected for topical coverage of real-world asset tokenization — not ambient
 * office/street B-roll and not music-led montage. Hosted via YouTube privacy
 * embeds (no TokenBrickLabs account / no publisher registration wall).
 *
 * Primary film (4:10): institutional journey from asset qualification through
 * legal/custody design to issuance, settlement and servicing.
 * Supporting shorts: tokenization definition, custody, tokenized real estate,
 * and institutional trust architecture.
 *
 * Source: RWA Avaitar (Geneva) — institutional RWA education channel.
 */
export const HERO_VIDEO = {
  youtubeId: "PfWi4GWwhCQ",
  title: "RWA Tokenization: From Real-World Asset to Structured Digital Capital",
  duration: "4:10",
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
