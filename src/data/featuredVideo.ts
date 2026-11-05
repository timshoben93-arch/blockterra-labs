/**
 * Homepage videos — self-hosted MP4s (no YouTube / no registration wall).
 *
 * Compiled from royalty-free Mixkit + Pexels live-action footage of people in
 * financial and institutional discussion settings. Served from /videos so
 * playback works without third-party login or account prompts.
 */
export const HERO_VIDEO = {
  src: "/videos/hero-background.mp4",
  srcMobile: "/videos/hero-background-mobile.mp4",
  poster: "/videos/hero-poster.jpg",
  duration: "3:45",
} as const;

export const FEATURED_VIDEO = {
  src: "/videos/ecosystem-overview.mp4",
  poster: "/videos/ecosystem-poster.jpg",
  title: "Institutional dialogue across the tokenized asset economy",
  source: "Self-hosted industry atmosphere reel",
  duration: "4:00",
  description:
    "A four-minute live-action look at people engaged in financial discussion — the professional setting in which digital securities, real estate, private markets, fixed income and related tokenization themes are evaluated.",
  topics: [
    { label: "Asset tokenization", covered: true },
    { label: "Digital securities", covered: true },
    { label: "Real estate", covered: true },
    { label: "Private markets", covered: true },
    { label: "Fixed income", covered: true },
    { label: "Infrastructure", covered: false },
    { label: "Compliance", covered: false },
    { label: "Custody and settlement", covered: false },
    { label: "Interoperability", covered: false },
    { label: "Lifecycle management", covered: false },
  ],
} as const;
