import {
  BookOpen,
  Cpu,
  Handshake,
  Network,
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
    slug: "rwa-research-intelligence",
    title: "RWA Research & Intelligence",
    short: "Research & Intelligence",
    tagline: "Independent research, market intelligence and technical analysis of real-world asset tokenization.",
    description:
      "We research how tokenized real-world assets are structured, regulated and operated across asset classes and jurisdictions. Our work supports financial institutions, asset owners and technology platforms that need clear, platform-neutral analysis — not product marketing. Outputs may include research briefings, market and regulatory reviews, commercial-model assessments and publications. We do not publish fabricated findings or claim regulated investment advice.",
    icon: BookOpen,
    features: [
      {
        title: "Asset tokenization research",
        desc: "Structured analysis of how specific asset classes can be represented, administered and transferred through tokenized models.",
      },
      {
        title: "Market and industry analysis",
        desc: "Coverage of institutional adoption trends, infrastructure developments and competitive dynamics in tokenized markets.",
      },
      {
        title: "Legal and regulatory research",
        desc: "Jurisdiction-aware review of classification questions, disclosure themes and operating constraints — coordinated with qualified counsel where required.",
      },
      {
        title: "Investment and commercial models",
        desc: "Evaluation of issuance, distribution, servicing and partnership economics without presenting investment recommendations.",
      },
      {
        title: "Institutional adoption trends",
        desc: "Research into how banks, asset managers and market infrastructures approach pilots, procurement and operating models.",
      },
      {
        title: "Reports and publications",
        desc: "Briefings and research notes intended for senior executives and technical decision-makers. Published findings are limited to verified or clearly provisional content.",
      },
    ],
    technologies: ["Market analysis", "Regulatory research", "Asset-class studies", "Briefings"],
  },
  {
    slug: "technology-architecture",
    title: "Technology & Architecture Research",
    short: "Technology & Architecture",
    tagline: "Technical evaluation of blockchain infrastructure, token standards and digital securities systems.",
    description:
      "We assess tokenization architectures, smart-contract requirements, custody and settlement options, identity and compliance rails, and interoperability approaches. The goal is objective technical evaluation that helps institutions and platforms choose and design infrastructure — not to sell a proprietary end-to-end issuance product. We collaborate with specialist technology providers where implementation is required.",
    icon: Cpu,
    features: [
      {
        title: "Blockchain infrastructure evaluation",
        desc: "Comparative assessment of public, permissioned and hybrid ledger designs against institutional operating requirements.",
      },
      {
        title: "Token standards and smart contracts",
        desc: "Analysis of permissioned token standards, transfer controls and contract architectures suited to digital securities workflows.",
      },
      {
        title: "Digital securities infrastructure",
        desc: "Research into issuance, registry, corporate-action and investor-servicing components of institutional tokenization stacks.",
      },
      {
        title: "Custody and settlement solutions",
        desc: "Review of digital-asset custody models, key management patterns and settlement design — without claiming custodial authority.",
      },
      {
        title: "Identity and compliance infrastructure",
        desc: "Evaluation of eligibility, KYC/AML hooks, allowlisting and transfer-restriction approaches for institutional use cases.",
      },
      {
        title: "Interoperability and integration",
        desc: "Research on connecting ledgers, registries, custodians, administrators and enterprise systems with clear trust boundaries.",
      },
    ],
    technologies: ["DLT evaluation", "Token standards", "Custody models", "Integration design"],
  },
  {
    slug: "platform-collaboration",
    title: "Platform Collaboration & Development",
    short: "Platform Collaboration",
    tagline: "Supporting product strategy, technical specifications, proofs of concept and pilot initiatives with technology partners.",
    description:
      "We work with tokenization platforms and infrastructure providers on assessments, product strategy, technical specifications, integration opportunities and proof-of-concept design. TokenBrickLabs is platform-neutral: we help advance institutional-grade solutions through collaboration rather than positioning ourselves as a competing full-stack issuance venue or exchange.",
    icon: Handshake,
    features: [
      {
        title: "Technology platform assessments",
        desc: "Structured reviews of platform capabilities against institutional requirements, asset-class needs and operating models.",
      },
      {
        title: "Product strategy support",
        desc: "Guidance on roadmap priorities, buyer personas and commercial packaging for institutional tokenization offerings.",
      },
      {
        title: "Technical specifications",
        desc: "Requirements and architecture notes that translate financial-market needs into implementable technical designs.",
      },
      {
        title: "Integration opportunities",
        desc: "Identification of custody, identity, data, administration and settlement connections that matter for production use.",
      },
      {
        title: "Proof-of-concept design",
        desc: "Scoped PoC definitions with success criteria, assumptions, participants and evaluation methods.",
      },
      {
        title: "Pilot project collaboration",
        desc: "Support for controlled pilots that test legal, operational and technical readiness without overstating outcomes.",
      },
    ],
    technologies: ["PoC design", "Product strategy", "Technical specs", "Pilot support"],
  },
  {
    slug: "ecosystem-development",
    title: "Ecosystem Development & Partnerships",
    short: "Ecosystem Development",
    tagline: "Connecting asset owners, financial institutions, technology providers and research partners around tokenized markets.",
    description:
      "We help build productive relationships across the tokenized-asset ecosystem: strategic technology partnerships, financial-institution collaboration, asset-owner engagement, workshops and standards-oriented initiatives. Partnerships described on this site are illustrative of how we work unless a specific relationship is separately confirmed.",
    icon: Network,
    features: [
      {
        title: "Strategic technology partnerships",
        desc: "Introductions and structured collaboration with infrastructure, custody, compliance and integration specialists.",
      },
      {
        title: "Financial institution collaboration",
        desc: "Engagement models for banks and market infrastructures exploring tokenization research, pilots and architecture options.",
      },
      {
        title: "Asset owner engagement",
        desc: "Support for real estate, private markets and other asset owners evaluating whether tokenization creates operational or capital-markets value.",
      },
      {
        title: "Workshops and roundtables",
        desc: "Executive briefings and working sessions that bring legal, technology and business stakeholders into one conversation.",
      },
      {
        title: "Research institution partnerships",
        desc: "Collaboration opportunities with academic and industry research groups on tokenization themes.",
      },
      {
        title: "Standards and interoperability",
        desc: "Participation in discussions that improve consistency across token standards, data models and operating practices.",
      },
    ],
    technologies: ["Partnerships", "Workshops", "Standards dialogue", "Ecosystem mapping"],
  },
];

export const getServiceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
