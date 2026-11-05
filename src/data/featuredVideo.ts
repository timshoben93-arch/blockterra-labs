/**
 * Homepage featured / hero ambient video.
 *
 * Source: Binance Education — "Tokenized Assets, Explained in Under 4 Minutes"
 * https://www.youtube.com/watch?v=Zy6FrrtCQOE
 * Duration: 3:47 · Live-action studio presentation (host on camera)
 * Published: 31 Oct 2025
 *
 * Closest publicly available professional live-action briefing in the 3–5 minute
 * range covering asset tokenization, digital securities, real estate, fixed
 * income / treasuries, custody, settlement and programmable lifecycle events.
 * Deeper institutional panels (DTCC, Clearstream, Euroclear, WEF) typically run
 * 20–50+ minutes and exceed the requested runtime.
 */
export const FEATURED_VIDEO = {
  youtubeId: "Zy6FrrtCQOE",
  title: "Tokenized Assets, Explained in Under 4 Minutes",
  source: "Binance Education",
  duration: "3:47",
  url: "https://www.youtube.com/watch?v=Zy6FrrtCQOE",
  description:
    "A polished live-action studio briefing on how real-world assets become digital tokens — covering ownership, fractional access, digital securities, custody-backed structures, settlement speed and the institutional market forming around tokenized treasuries, funds and real estate.",
  topics: [
    { label: "Asset tokenization", covered: true },
    { label: "Digital securities", covered: true },
    { label: "Real estate", covered: true },
    { label: "Private markets", covered: true },
    { label: "Fixed income", covered: true },
    { label: "Infrastructure", covered: false },
    { label: "Compliance", covered: false },
    { label: "Custody and settlement", covered: true },
    { label: "Interoperability", covered: false },
    { label: "Lifecycle management", covered: true },
  ],
} as const;
