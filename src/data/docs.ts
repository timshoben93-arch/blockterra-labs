import { BookOpen, Eye, Cpu, Network, Boxes, Flag, type LucideIcon } from "lucide-react";

export type DocSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type DocChapter = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  intro: string;
  sections: DocSection[];
};

export const DOCS: DocChapter[] = [
  {
    slug: "challenges",
    number: "01",
    title: "Challenges",
    tagline: "Why tokenizing a real asset is a legal and operations problem, not a mint button.",
    icon: BookOpen,
    intro:
      "TokenBrickLabs is a professional-services studio. These notes describe constraints we meet on client engagements. They are not a description of a TokenBrickLabs blockchain, token, or public network.",
    sections: [
      {
        heading: "1.1 Legal interest versus on-chain record",
        body: [
          "A token can record or transfer a contractual claim only to the extent an offering document, SPV, fund, or other legal wrapper says it does. It is not, by itself, title to land, a REIT share, or a perfected security interest. Counsel for the issuer designs that wrapper. Software can encode transfer restrictions; it cannot create them.",
        ],
        bullets: [
          "Property, fund, and securities law sit outside the chain.",
          "Secondary transfer may be restricted or unavailable depending on the offering and venue.",
          "Servicing (coupons, NAV, redemptions) is an operations process that software can assist, not replace.",
        ],
      },
      {
        heading: "1.2 Identity, jurisdiction, and settlement",
        body: [
          "Permissioned token standards (for example ERC-3643 / T-REX or ERC-1400) let an issuer encode who may hold or receive an instrument. That is not a substitute for KYC/AML programs, broker-dealer or ATS status, or a transfer agent. Those are licensed or appointed functions of the client and its vendors.",
        ],
      },
      {
        heading: "1.3 What does not belong in a public whitepaper",
        body: [
          "Claims of a novel Layer-1, a native collateral token, guaranteed liquidity, or a measured Nakamoto coefficient are not part of how this studio operates. Client systems typically settle on existing networks (EVM chains and, where specified, Solana) under the client’s custody and administrator arrangements.",
        ],
      },
    ],
  },
  {
    slug: "vision",
    number: "02",
    title: "Vision",
    tagline: "What we build for issuers, and what we do not sell.",
    icon: Eye,
    intro:
      "The studio’s job is to design, implement, and help operate tokenization software that matches a counsel-approved structure — from first issuance through day-two workflows.",
    sections: [
      {
        heading: "2.1 What we aim to deliver",
        body: [
          "For each engagement: a written blueprint (asset, jurisdiction, parties), smart contracts and APIs that implement the agreed transfer rules, identity and allowlist integrations specified by the client, and operator tools for corporate actions the administrator actually runs.",
        ],
      },
      {
        heading: "2.2 What we do not claim",
        body: [
          "We do not issue a TokenBrickLabs security, BTL token, or 1:1 real-estate coin. We do not take discretionary custody of client or investor assets. We do not operate an exchange, ATS, or broker-dealer. Liquidity, if any, is a function of the client’s offering and venue — not of our website copy.",
        ],
      },
      {
        heading: "2.3 How identity and restrictions are implemented",
        body: [
          "Where the client’s counsel requires it, we implement on-chain allowlists, jurisdictional restrictions, and hooks for KYC/AML vendors the client selects. Those controls assist the client’s compliance program. They are not themselves that program.",
        ],
      },
      {
        heading: "2.4 Tooling we build per engagement",
        body: [
          "Typical deliveries include TypeScript APIs, operator consoles, and documentation for the client’s engineers. Public SDK names, live price/yield streams, or a global GraphQL subgraph for a TokenBrickLabs token are not products we currently operate.",
        ],
      },
    ],
  },
  {
    slug: "technology-foundations",
    number: "03",
    title: "Technology Foundations",
    tagline: "Permissioned tokens, identity hooks, and existing public chains.",
    icon: Cpu,
    intro:
      "Production issuances we work on use established virtual machines and token standards. We do not run a Cellular Automata consensus network.",
    sections: [
      {
        heading: "3.1 Chains and standards",
        body: [
          "Most work lands on Ethereum and EVM L2s, using permissioned or security-token patterns (ERC-3643 / T-REX, ERC-1400, or a custom equivalent) when the instrument requires transfer controls. Solana or other environments appear only when the client’s architecture already requires them.",
        ],
      },
      {
        heading: "3.2 Oracles, NAV, and corporate actions",
        body: [
          "NAV figures, coupons, and similar events originate from the fund administrator or other appointed party. Software can record, display, and trigger on those inputs. We do not treat an oracle feed as an independent valuation or as investment advice.",
        ],
      },
      {
        heading: "3.3 Review versus independent audit",
        body: [
          "We perform engineering review and automated tests. Independent third-party audit is a separate engagement the client commissions when the threat model requires it. TokenBrickLabs is not an audit firm.",
        ],
      },
    ],
  },
  {
    slug: "new-kind-of-network",
    number: "04",
    title: "Architecture",
    tagline: "How a typical client stack is structured.",
    icon: Network,
    intro:
      "A TokenBrickLabs engagement produces a client-operated stack, not a TokenBrickLabs public relay network or Proof-of-Relay blockchain.",
    sections: [
      {
        heading: "4.1 Layers we usually implement",
        body: [
          "On-chain: permissioned token, identity registry, and admin controls under the client’s keys or appointed custodian. Off-chain: APIs, KYC vendor integration, document and workflow services, and an operator portal. Custody: MPC or HSM providers the client contracts with — we integrate; we do not hold investor assets.",
        ],
      },
      {
        heading: "4.2 Settlement",
        body: [
          "Settlement finality is that of the underlying chain plus the legal books of the issuer. We do not offer a private consensus mechanism, uptime SLA as a public network, or a promised Nakamoto coefficient.",
        ],
      },
      {
        heading: "4.3 Multi-chain",
        body: [
          "If an issuance needs more than one environment, we document trust assumptions (bridges, messaging, wrapped representations) conservatively. Bridging does not create a new legal asset.",
        ],
      },
    ],
  },
  {
    slug: "consensus",
    number: "05",
    title: "Trust assumptions",
    tagline: "What must be true for a tokenized issuance to be operable — and what software cannot fix.",
    icon: Boxes,
    intro:
      "This chapter replaces an earlier research sketch of “Cellular Automata consensus.” TokenBrickLabs does not operate a novel consensus protocol. Issuances inherit the security model of the chain the client selects.",
    sections: [
      {
        heading: "5.1 Inherited chain security",
        body: [
          "If the client issues on Ethereum or an L2, liveness and safety are those of that network and its operators. We do not re-derive Byzantine agreement, majority-vote automata, or Proof-of-Work substitutes.",
        ],
      },
      {
        heading: "5.2 Keys and administrators",
        body: [
          "Admin keys, pause controls, and upgrade proxies are operational risk. We design them to match the client’s custody and governance policy (for example multisig or MPC). Compromise of those keys is not solved by a marketing consensus paper.",
        ],
      },
      {
        heading: "5.3 What we document for counsel",
        body: [
          "For each build we can provide: contract roles, who can transfer or force-transfer, how allowlists update, how corporate actions are submitted, and which vendors sit in the identity and custody path. That packet is for the client’s lawyers — not a public investment memorandum.",
        ],
      },
    ],
  },
  {
    slug: "conclusions",
    number: "06",
    title: "Conclusions",
    tagline: "A services studio, not a protocol token or a title registry.",
    icon: Flag,
    intro:
      "TokenBrickLabs helps funds, fintechs, and operators implement tokenization software that follows a structure their counsel has designed. We are not the first, only, or canonical “RWA protocol,” and we do not sell fractional legal ownership of real estate via a website.",
    sections: [
      {
        heading: "Outlook",
        body: [
          "Useful work, for us, is shipping reviewed code, identity integrations, and operator runbooks on chains that already exist. Claims of 1:1 SPV-backed studio tokens, internet-scale ownership transfer, or a foundational public network are out of scope for this site and for how we contract.",
        ],
      },
    ],
  },
];
