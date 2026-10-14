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
    title: "RWA Tokenization Services",
    short: "RWA Tokenization",
    tagline: "Bring real-world assets on-chain with permissioned token software.",
    description:
      "We design and ship tokenization platforms for real estate, treasuries, private credit, commodities and funds — permissioned token standards, identity-vendor hooks, and integrations with custodians the client appoints. Tokens are not legal title unless the offering says so; we do not operate an exchange or take discretionary custody.",
    icon: Coins,
    features: [
      { title: "Permissioned token standards", desc: "ERC-3643 / T-REX, ERC-1400 and custom transfer rules as specified with counsel — not a legal-compliance certificate." },
      { title: "Asset lifecycle software", desc: "Issuance, distribution, corporate actions, and redemptions as the administrator defines them. Secondary transfer only if the offering and venue allow it." },
      { title: "Identity vendor hooks", desc: "Allowlists and accreditation checks wired to KYC/AML providers the client selects." },
      { title: "Custody integrations", desc: "MPC and HSM integrations with operational controls. TokenBrickLabs does not hold investor assets." },
    ],
    technologies: ["Solidity", "ERC-3643", "Chainlink", "Fireblocks", "The Graph"],
  },
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    short: "Blockchain Development",
    tagline: "Custom L1/L2, smart contracts and protocol engineering.",
    description:
      "From bespoke app-chains and rollups to high-assurance smart contracts, our protocol engineers build secure, scalable systems across EVM, Solana, Cosmos and Move ecosystems.",
    icon: Boxes,
    features: [
      { title: "Smart Contracts", desc: "Solidity, Rust and Move contracts with rigorous testing and support for third-party audits the client commissions." },
      { title: "Custom Rollups & App-Chains", desc: "OP Stack, Arbitrum Orbit, Cosmos SDK and Polygon CDK deployments." },
      { title: "Cross-Chain Bridges", desc: "Secure messaging and asset bridges with conservative trust assumptions." },
      { title: "Protocol R&D", desc: "Consensus, MEV, ZK and cryptographic protocol research and prototyping." },
    ],
    technologies: ["Solidity", "Rust", "Move", "Cosmos SDK", "OP Stack", "Foundry"],
  },
  {
    slug: "ai-ml-development",
    title: "AI & ML Development",
    short: "AI & ML Development",
    tagline: "Production AI systems, agents and on-chain intelligence.",
    description:
      "We build LLM-powered products, intelligent agents and ML pipelines — including specialized models for risk, compliance and on-chain analytics that act on verifiable data.",
    icon: Brain,
    features: [
      { title: "LLM Applications", desc: "RAG, fine-tuning and evaluation pipelines for domain-specific assistants." },
      { title: "AI Agents", desc: "Tool-using agents that interact with APIs, contracts and data warehouses." },
      { title: "ML Pipelines", desc: "Feature stores, training infra and real-time inference at scale." },
      { title: "On-chain Analytics", desc: "Anomaly detection, risk scoring and predictive models on blockchain data." },
    ],
    technologies: ["PyTorch", "LangChain", "OpenAI", "Hugging Face", "Vector DBs"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short: "Mobile App Development",
    tagline: "Native and cross-platform apps users actually love.",
    description:
      "We craft performant iOS and Android apps — native or cross-platform — with deep integrations for wallets, payments, biometrics and real-time data.",
    icon: Smartphone,
    features: [
      { title: "iOS & Android Native", desc: "Swift and Kotlin apps tuned for performance and platform conventions." },
      { title: "React Native & Flutter", desc: "Single codebase, shared design system, native-feel UX." },
      { title: "Wallet & Payments", desc: "WalletConnect, Apple/Google Pay and on-ramps integrated cleanly." },
      { title: "Offline & Realtime", desc: "Sync engines, push notifications and resilient offline-first flows." },
    ],
    technologies: ["Swift", "Kotlin", "React Native", "Flutter", "WalletConnect"],
  },
  {
    slug: "web-cms-development",
    title: "Web & CMS Development",
    short: "Web & CMS Development",
    tagline: "Marketing sites, portals and headless CMS platforms.",
    description:
      "High-performance websites and content platforms built on modern stacks — from marketing sites to complex multi-tenant portals with editor-friendly CMS workflows.",
    icon: Globe,
    features: [
      { title: "Headless CMS", desc: "Sanity, Contentful, Strapi and Payload integrations tailored to editors." },
      { title: "Performance & SEO", desc: "Core Web Vitals, structured data and edge-rendered pages." },
      { title: "Design Systems", desc: "Reusable component libraries with Storybook and tokens." },
      { title: "Internationalization", desc: "Multi-language, multi-region content with localized routing." },
    ],
    technologies: ["Next.js", "React", "Sanity", "Contentful", "Tailwind"],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    short: "E-commerce Development",
    tagline: "Conversion-focused storefronts and commerce platforms.",
    description:
      "We build custom storefronts and headless commerce solutions on Shopify, Medusa and bespoke stacks — optimized for conversion, scale and merchandising flexibility.",
    icon: ShoppingCart,
    features: [
      { title: "Headless Storefronts", desc: "Shopify Hydrogen, Medusa and custom Next.js storefronts." },
      { title: "Checkout Optimization", desc: "A/B-tested flows, payment routing and abandoned cart recovery." },
      { title: "ERP & PIM Integration", desc: "Connect inventory, pricing and product data across systems." },
      { title: "Crypto Payments", desc: "Stablecoin and token-gated commerce with on-chain receipts." },
    ],
    technologies: ["Shopify", "Medusa", "Stripe", "Next.js", "Algolia"],
  },
  {
    slug: "telegram-mini-apps",
    title: "Telegram Mini Apps Development",
    short: "Telegram Mini Apps",
    tagline: "Viral-ready Mini Apps with on-chain mechanics.",
    description:
      "We design and ship Telegram Mini Apps — from social games and tap-to-earn experiences to wallets and DeFi front-ends — fully integrated with TON and EVM ecosystems.",
    icon: Send,
    features: [
      { title: "TON Integration", desc: "TON Connect, jettons and on-chain logic for native Telegram UX." },
      { title: "Game Mechanics", desc: "Leaderboards, quests, referrals and reward loops that scale." },
      { title: "Bots & Backends", desc: "High-throughput bots with queues, caching and analytics." },
      { title: "Wallet Flows", desc: "Seamless onboarding with embedded and external wallet support." },
    ],
    technologies: ["TypeScript", "TON", "Telegram SDK", "Node.js", "Redis"],
  },
  {
    slug: "game-development",
    title: "Game Development",
    short: "Game Development",
    tagline: "Web3 games and immersive interactive experiences.",
    description:
      "From casual web games to full Unity titles with on-chain assets, we build engaging gameplay loops, asset economies and backend infrastructure for live operations.",
    icon: Gamepad2,
    features: [
      { title: "Unity & Unreal", desc: "Cross-platform titles with optimized rendering and networking." },
      { title: "Web & HTML5 Games", desc: "Lightweight games built with PixiJS, Phaser and WebGL." },
      { title: "On-chain Assets", desc: "Optional on-chain items and in-game currencies as the client’s product defines — not a claim of legal title to property." },
      { title: "LiveOps Backends", desc: "Matchmaking, leaderboards, telemetry and anti-cheat." },
    ],
    technologies: ["Unity", "Unreal", "PixiJS", "Phaser", "Photon"],
  },
  {
    slug: "iot-embedded-development",
    title: "IoT & Embedded Development",
    short: "IoT & Embedded Development",
    tagline: "Connected devices with secure cloud and on-chain bridges.",
    description:
      "We design firmware, gateways and cloud platforms for IoT fleets — including secure attestation and bridges that anchor device data on-chain for tokenized assets.",
    icon: Cpu,
    features: [
      { title: "Firmware Engineering", desc: "Embedded C/C++ and Rust on ARM, ESP32 and RISC-V targets." },
      { title: "Edge Gateways", desc: "Linux gateways with OTA, secure boot and remote diagnostics." },
      { title: "IoT Cloud Platforms", desc: "AWS IoT, Azure IoT and custom MQTT brokers at scale." },
      { title: "Device-to-Chain Bridges", desc: "Signed device attestations published to smart contracts." },
    ],
    technologies: ["C/C++", "Rust", "FreeRTOS", "MQTT", "AWS IoT"],
  },
  {
    slug: "devops-services",
    title: "DevOps Development Services",
    short: "DevOps Development",
    tagline: "Reliable, observable, cost-efficient cloud infrastructure.",
    description:
      "We build modern platform engineering foundations — Kubernetes, IaC, CI/CD and observability — to ship faster with confidence and stay resilient at scale.",
    icon: Server,
    features: [
      { title: "Kubernetes Platforms", desc: "Production-grade clusters with GitOps, policies and autoscaling." },
      { title: "Infrastructure as Code", desc: "Terraform, Pulumi and reusable modules across environments." },
      { title: "CI/CD Pipelines", desc: "Fast, secure pipelines with progressive delivery and rollbacks." },
      { title: "Observability & SRE", desc: "Metrics, logs, traces and SLOs that drive real reliability." },
    ],
    technologies: ["Kubernetes", "Terraform", "ArgoCD", "Prometheus", "AWS / GCP"],
  },
];

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
