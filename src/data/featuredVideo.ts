/**
 * Homepage featured video — self-hosted ecosystem reel (also used as hero ambient).
 *
 * Source: Royalty-free Mixkit + Pexels footage of people in financial / business
 * discussions. Compiled into a single ~3:45 MP4 for continuous looping without
 * YouTube registration or third-party login walls.
 *
 * Files: /hero-rwa-background.mp4 (desktop), /hero-rwa-background-mobile.mp4
 */
export const FEATURED_VIDEO = {
  src: "/hero-rwa-background.mp4",
  poster: "/hero-rwa-poster.jpg",
  title: "Institutional dialogue around tokenized real-world assets",
  source: "Industry atmosphere reel",
  duration: "3:45",
  description:
    "A continuous look at people engaged in financial discussion — the setting in which digital securities, real estate, private markets and fixed-income structures are evaluated as tokenized assets.",
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
