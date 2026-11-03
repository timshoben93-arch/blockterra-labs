import {
  Coins,
  Boxes,
  Brain,
  Smartphone,
  Globe,
  ShoppingCart,
  Send,
  Gamepad2,
  Cpu,
  Server,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: { title: string; desc: string }[];
  technologies: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "rwa-tokenization",
    title: "RWA Tokenization Platform",
    short: "RWA Tokenization",
    tagline: "Our platform for bringing real-world assets on-chain.",
    description:
      "TokenBrickLabs is building its own tokenization platform for real estate, treasuries, private credit, commodities, and funds. The current build covers permissioned token standards, identity hooks, and custody integrations. The platform is in development. A token on it is not legal title unless a specific instrument says so, and we do not operate an exchange or take discretionary custody.",
    icon: Coins,
    features: [
      { title: "Permissioned token standards", desc: "ERC-3643 / T-REX, ERC-1400, and custom transfer rules designed with counsel — not a legal-compliance certificate." },
      { title: "Asset lifecycle", desc: "Issuance, distribution, corporate actions, and redemptions as the administrator defines them. Secondary transfer only if the offering and venue allow it." },
      { title: "Identity hooks", desc: "Allowlists and accreditation checks wired to KYC/AML providers selected for each asset." },
      { title: "Custody integrations", desc: "MPC and HSM integrations with operational controls. TokenBrickLabs does not hold investor assets." },
    ],
    technologies: ["Solidity", "ERC-3643", "Chainlink", "Fireblocks", "The Graph"],
  },
  {
    slug: "blockchain-development",
    title: "Platform Protocol",
    short: "Platform Protocol",
    tagline: "The contracts and chain layer of our RWA platform.",
    description:
      "Protocol work at TokenBrickLabs goes into our own platform: permissioned contracts, chain integrations, and the review path around them. We build on existing EVM networks, and on Solana only where an asset design requires it.",
    icon: Boxes,
    features: [
      { title: "Platform contracts", desc: "Solidity contracts for issuance and transfer rules, with automated tests and room for an independent audit when the threat model requires it." },
      { title: "Chain selection", desc: "Ethereum and EVM L2s as the default settlement environment for the platform." },
      { title: "Cross-chain boundaries", desc: "Messaging and wrapped representations documented with conservative trust assumptions. Bridging does not create a new legal asset." },
      { title: "Upgrade and admin design", desc: "Pause, upgrade, and admin controls shaped for multisig or MPC, not a single developer key." },
    ],
    technologies: ["Solidity", "Rust", "Foundry", "EVM", "ERC-3643"],
  },
  {
    slug: "ai-ml-development",
    title: "Platform Analytics",
    short: "Platform Analytics",
    tagline: "Risk and operations signals on the platform’s own data.",
    description:
      "Analytics work supports the platform we are building: issuance monitoring, anomaly detection, and operator-facing summaries of on-chain activity. Models assist review. They are not valuations, and they are not investment advice.",
    icon: Brain,
    features: [
      { title: "Issuance monitoring", desc: "Surfaces for supply, transfer restrictions, and corporate-action events on the platform." },
      { title: "Anomaly detection", desc: "Signals for unusual transfer or admin activity that an operator should review." },
      { title: "Operator summaries", desc: "Readable status for people who run an asset, not a trading terminal." },
      { title: "Bounded models", desc: "Analytics stay downstream of the administrator’s NAV and servicing inputs." },
    ],
    technologies: ["TypeScript", "Python", "On-chain indexers", "PostgreSQL"],
  },
  {
    slug: "mobile-app-development",
    title: "Investor & Operator Apps",
    short: "Investor & Operator Apps",
    tagline: "Mobile surfaces for the platform, still in development.",
    description:
      "Application work is for our platform: investor status and operator actions on a phone, with the same identity and transfer rules as the contracts. These apps are part of the product build.",
    icon: Smartphone,
    features: [
      { title: "Investor status", desc: "Holdings, restrictions, and corporate-action notices once an asset is live on the platform." },
      { title: "Operator actions", desc: "Allowlist and servicing tasks that match the admin controls in the contracts." },
      { title: "Wallet connection", desc: "Wallet flows that respect permissioned transfer rules." },
      { title: "Same control environment", desc: "Empty states, errors, and confirmations designed to survive compliance review." },
    ],
    technologies: ["React Native", "TypeScript", "WalletConnect"],
  },
  {
    slug: "web-cms-development",
    title: "Issuer & Investor Portals",
    short: "Portals",
    tagline: "Web portals for running an asset on the platform.",
    description:
      "The platform includes web portals for issuers, operators, and investors. Editors and operators see documents, identity status, and lifecycle events in one place.",
    icon: Globe,
    features: [
      { title: "Operator console", desc: "The day-to-day surface for allowlists, corporate actions, and issuance status." },
      { title: "Investor portal", desc: "A read path for positions and restrictions tied to the same identity registry." },
      { title: "Document workflow", desc: "Offering and servicing documents kept next to the on-chain record they describe." },
      { title: "Access control", desc: "Roles that match who is allowed to administer an asset." },
    ],
    technologies: ["React", "TypeScript", "Tailwind"],
  },
  {
    slug: "ecommerce-development",
    title: "Primary Distribution",
    short: "Distribution",
    tagline: "How an issuance is allocated on the platform.",
    description:
      "Distribution on the platform is the primary path for an issuance: eligibility, allocation, and settlement according to the offering. It is not a retail storefront, and it is not a secondary market operated by TokenBrickLabs.",
    icon: ShoppingCart,
    features: [
      { title: "Eligibility", desc: "Allocation only for identities the allowlist already accepts." },
      { title: "Subscription flow", desc: "A primary issuance path defined by the offering documents, not an open order book." },
      { title: "Settlement events", desc: "Software records for allocation and funding status supplied by the administrator." },
      { title: "No exchange", desc: "TokenBrickLabs does not operate an ATS, broker-dealer, or secondary venue." },
    ],
    technologies: ["TypeScript", "Solidity", "ERC-3643"],
  },
  {
    slug: "telegram-mini-apps",
    title: "Investor Messaging",
    short: "Investor Messaging",
    tagline: "Notices and status for people on an issuance.",
    description:
      "Messaging work for the platform is operational: corporate-action notices, identity exceptions, and status updates to people already on an issuance. It is not a consumer mini-app or a game loop.",
    icon: Send,
    features: [
      { title: "Corporate-action notices", desc: "Coupons, redemptions, and document updates delivered to eligible holders." },
      { title: "Exception alerts", desc: "Operator alerts when an identity or transfer check fails." },
      { title: "Channel adapters", desc: "Email and messaging hooks around the same event log as the operator console." },
      { title: "No promotional token", desc: "Messages describe platform status. They are not an offer to buy an instrument." },
    ],
    technologies: ["TypeScript", "Node.js"],
  },
  {
    slug: "game-development",
    title: "Lifecycle Operations",
    short: "Lifecycle",
    tagline: "The servicing loop after an asset is issued.",
    description:
      "After issuance, the platform has to keep working: NAV inputs, coupons, redemptions, and the runbooks operators follow. That lifecycle is a core part of the product we are building. It is not a games practice.",
    icon: Gamepad2,
    features: [
      { title: "Corporate actions", desc: "Workflows for NAV inputs, coupons, and redemptions as the administrator defines them." },
      { title: "Runbooks", desc: "Written steps for pause, upgrade, and exception handling." },
      { title: "Shared event log", desc: "One record of what the platform did, visible to operators and reviewable later." },
      { title: "No independent valuation", desc: "The platform records inputs. It does not set NAV or promise liquidity." },
    ],
    technologies: ["TypeScript", "Solidity", "PostgreSQL"],
  },
  {
    slug: "iot-embedded-development",
    title: "Asset Attestations",
    short: "Attestations",
    tagline: "How off-chain asset facts enter the platform.",
    description:
      "Some assets on the platform depend on facts that live off-chain: custody attestations, inventory, or inspection records. We are building the path for signed inputs into the issuance record. A signed feed is evidence the administrator accepts — not proof that a token is the physical good.",
    icon: Cpu,
    features: [
      { title: "Signed inputs", desc: "Attestations from custodians or inspectors recorded against an issuance." },
      { title: "Clear provenance", desc: "Each input names who asserted it and when." },
      { title: "Operator review", desc: "Feeds can be held for review before they affect servicing." },
      { title: "Not the asset itself", desc: "An attestation does not convert a token into title to metal, crops, or equipment." },
    ],
    technologies: ["TypeScript", "Solidity", "HSM"],
  },
  {
    slug: "devops-services",
    title: "Platform Infrastructure",
    short: "Infrastructure",
    tagline: "The environments the platform is developed and run on.",
    description:
      "Infrastructure work is for the TokenBrickLabs platform: reproducible environments, deployment of contracts and APIs, and observability for issuance operations. We do not take discretionary custody of assets from this layer.",
    icon: Server,
    features: [
      { title: "Reproducible deploys", desc: "Contract and service releases with a written change record." },
      { title: "Chain connectivity", desc: "RPC, indexers, and health checks for the networks the platform uses." },
      { title: "Observability", desc: "Logs and alerts for failed transfers, admin actions, and dependency outages." },
      { title: "Scoped secrets", desc: "Credentials rotated and kept off developer laptops wherever practical." },
    ],
    technologies: ["Kubernetes", "Terraform", "Foundry", "Prometheus"],
  },
];

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
