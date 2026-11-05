/**
 * Homepage featured video — industry overview of asset tokenization.
 *
 * Source: Binance Education — "Tokenized Assets, Explained in Under 4 Minutes"
 * https://www.youtube.com/watch?v=Zy6FrrtCQOE
 * Duration: 3:47 · Live-action studio presentation (host on camera)
 * Published: 31 Oct 2025
 *
 * Selected as the closest publicly available 3–5 minute live-action overview
 * covering tokenized assets, digital securities, real estate, funds/treasuries,
 * custody, settlement, liquidity and regulatory considerations. Institutional
 * panel recordings from Clearstream, DTCC, BNP Paribas and WEF are typically
 * 30–50+ minutes and exceed the requested runtime.
 */
export const FEATURED_VIDEO = {
  youtubeId: "Zy6FrrtCQOE",
  title: "Tokenized Assets, Explained in Under 4 Minutes",
  source: "Binance Education",
  duration: "3:47",
  url: "https://www.youtube.com/watch?v=Zy6FrrtCQOE",
  description:
    "A live-action overview of how real-world assets become digital tokens — covering ownership, fractional access, digital securities, custody-backed structures, settlement speed and the institutional market now forming around tokenized treasuries and funds.",
  topics: [
    { label: "Asset tokenization", covered: true },
    { label: "Digital securities", covered: true },
    { label: "Real estate", covered: true },
    { label: "Private markets", covered: true },
    { label: "Fixed income", covered: true },
    { label: "Infrastructure", covered: false },
    { label: "Compliance", covered: true },
    { label: "Custody and settlement", covered: true },
    { label: "Interoperability", covered: false },
    { label: "Lifecycle management", covered: true },
  ],
} as const;
