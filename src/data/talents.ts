import {
  Code2,
  Globe2,
  Server,
  Layout,
  Brain,
  Smartphone,
  Briefcase,
  ClipboardList,
  Package,
  Settings,
  ShieldCheck,
  Network,
  Blocks,
  PenTool,
  Palette,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export const DEPARTMENTS = ["Engineering", "Design", "Product", "Go-to-market", "Operations"] as const;
export type Department = (typeof DEPARTMENTS)[number];

export type Talent = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  department: Department;
  location: string;
  employmentType: string;
  requisitionId?: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  reportsTo?: string;
  extraSections?: { heading: string; body: string }[];
  niceToHave?: string[];
  benefits?: string[];
  techStack?: { category: string; items: string[] }[];
};

const STUDIO_INTRO =
  "TokenBrickLabs is a Seattle-based blockchain studio that designs, audits, and ships production Real-World Asset tokenization — issuance, identity, custody, and settlement rails for funds, fintechs, and operators. We hire globally and build for institutional security, compliance, and day-two operations, not slide-deck prototypes.";

const SHARED_BENEFITS = [
  "Opportunity to work at the bleeding edge of Web3 / crypto / DeFi.",
  "Flexible working conditions.",
  "Remote work location.",
  "Offer token/equity packages.",
  "Sponsored global events and travel.",
  "Annual global 2-week offsite.",
  "Signing and performance bonuses.",
  "Competitive remuneration (attractive salary, benefits, and incentives, including tokens and bonus opportunities).",
];

const ENGINEERING_CULTURE = {
  heading: "Engineering Organization & Culture",
  body: "At TokenBrickLabs, we are engineering the institutional standard for Real-World Asset tokenization. Our mission is to ship platforms centered on security and compliance, requiring a commitment to technical excellence that extends beyond simply delivering code. As a global organization, we set a high bar for those driven to do their best work alongside world-class peers.\n\nWe value engineers who treat development as a craft and own the outcome from concept to deployment. We expect our teams to bring structure to ambiguity and shape the frameworks that support our studio. We refuse to compromise on quality and seek problem solvers who thrive on high-impact technical challenges.",
};

const DESIGN_CULTURE = {
  heading: "Design Organization & Culture",
  body: "At TokenBrickLabs, design is how institutional complexity becomes operable. Issuance, identity, and custody only work if operators and investors can see the system clearly. We hold a high bar for craft, systems thinking, and written rationale — not slide-deck aesthetics.\n\nWe look for designers who treat product surfaces as part of the control environment: every empty state, error, and confirmation has to survive legal and compliance review. We work remotely, document decisions, and partner tightly with engineering and product.",
};

const PRODUCT_CULTURE = {
  heading: "Product Organization & Culture",
  body: "At TokenBrickLabs, product is the sequencing of contracts, identity, custody, and the operator workflows that keep an issuance alive after launch. We do not ship theater. We ship systems institutions can run.\n\nProduct managers here write clearly, cut scope without losing the risk surface, and stay close to engineering. We expect you to bring structure to ambiguous tokenization work and to own outcomes from discovery through day-two operations.",
};

const GTM_CULTURE = {
  heading: "Go-to-market Organization & Culture",
  body: "At TokenBrickLabs, go-to-market is how we put production tokenization in front of funds, fintechs, and operators who already have a fiduciary duty. We sell rigor — audits, controls, and operable rails — not a prototype narrative.\n\nWe look for people who can hold a technical conversation, structure a deal, and leave a room with a sequencing of work rather than a vague “next step.” High ownership, written follow-through, and respect for compliance are non-negotiable.",
};

const OPERATIONS_CULTURE = {
  heading: "Operations Organization & Culture",
  body: "At TokenBrickLabs, operations is the delivery system around protocol, product, and partners. Audits, releases, and issuance calendars do not tolerate loose coordination.\n\nWe look for operators who make work visible, surface risk early, and keep remote teams honest about dates. Ceremony is light; accountability is not.",
};

const aboutRole = (paragraph: string) => `${STUDIO_INTRO}\n\n${paragraph}`;

const jdExtras = (
  reportsTo: string,
  culture: { heading: string; body: string },
  teamHeading: string,
  teamBody: string,
) => [
  { heading: "Reports to:", body: reportsTo },
  culture,
  { heading: teamHeading, body: teamBody },
];

export const TALENTS: Talent[] = [
  {
    slug: "blockchain-architect",
    title: "Blockchain Architect",
    short: "Blockchain Architect",
    tagline: "Architect the secure, scalable Web3 core of our RWA platform.",
    icon: Network,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001234",
    overview: aboutRole(
      "As a Blockchain Architect, you will own the on-chain architecture of that stack: contract boundaries, upgrade paths, multi-chain strategy, and the security model that issuance and custody products depend on. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Director, Engineering",
      ENGINEERING_CULTURE,
      "The Team: Protocol Architecture",
      "Protocol Architecture sets the contract and systems design for TokenBrickLabs issuances. We define token standards, identity hooks, upgradeability, and how protocol work lands in backend and operator products. The bar is production: audit-ready, gas-aware, and operable in regulated jurisdictions.",
    ),
    responsibilities: [
      "Design and implement smart contract architecture for NFT-based property ownership, transfers, and fractionalization.",
      "Build and maintain contracts using Solidity (Hardhat), ensuring security, upgradeability, and gas efficiency.",
      "Integrate blockchain functionality with backend services and frontend apps.",
      "Define and manage on-chain/off-chain data interactions (IPFS, metadata, ownership records).",
      "Support multi-chain strategy (Ethereum / Polygon) and evaluate L2 scaling solutions.",
      "Collaborate with product and legal teams on tokenization models and compliance.",
      "Prepare code for audits and implement security best practices.",
      "Contribute to wallet integration and Web3 authentication flows.",
    ],
    qualifications: [
      "2+ years of experience in blockchain or backend engineering.",
      "Strong experience with Solidity and smart contract development.",
      "Experience with Hardhat or Truffle and contract deployment.",
      "Understanding of Ethereum ecosystem and token standards (ERC-721, ERC-1155).",
      "Familiarity with Web3 integrations (Ethers.js or Web3.js).",
      "Experience with backend systems (Node.js or Python preferred).",
      "Understanding of security patterns and audit preparation.",
      "Ability to work in fast-paced startup environments.",
    ],
    niceToHave: [
      "Experience designing upgradeable, permissioned, or RWA token systems.",
      "Prior work preparing protocols for external security audits.",
      "Familiarity with L2s, account abstraction, or institutional custody models.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Blockchain", items: ["Solidity", "Ethereum", "Polygon", "Arbitrum"] },
      { category: "Smart Contract Development", items: ["Hardhat", "Foundry", "OpenZeppelin", "Ethers.js"] },
      { category: "Architecture", items: ["ERC-721", "ERC-1155", "Upgradeability", "Multisig"] },
      { category: "Infrastructure", items: ["AWS", "Docker", "GitHub Actions"] },
    ],
  },
  {
    slug: "protocol-engineer",
    title: "Protocol Engineer",
    short: "Protocol Engineer",
    tagline: "Build the on-chain protocol that tokenized issuances actually run on.",
    icon: Blocks,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001248",
    overview: aboutRole(
      "As a Protocol Engineer, you will own the on-chain protocol layer of that stack: permissioned token mechanics, identity and transfer rules, lifecycle events, and the test harnesses that keep issuances audit-ready. You sit between architecture and product engineering — shipping protocol, not just reviewing it. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Director, Engineering",
      ENGINEERING_CULTURE,
      "The Team: Protocol Engineering",
      "The Protocol Engineering team builds the smart-contract and on-chain infrastructure behind TokenBrickLabs issuances. We design permissioned token standards, transfer rules, identity rails, and lifecycle events (NAV, coupons, redemptions) that operations teams can actually run. We solve complex distributed-systems problems on a modern stack, rejecting “good enough” in favor of the engineering rigor required in regulated jurisdictions.",
    ),
    responsibilities: [
      "Design, implement, and maintain the core issuance protocol — permissioned tokens, identity hooks, and transfer restrictions.",
      "Specify and ship lifecycle events: NAV updates, coupons, corporate actions, and redemptions.",
      "Write protocol specs, invariants, and test vectors that architecture, audits, and product can share.",
      "Build Foundry/Hardhat suites: unit, fuzz, invariant, and fork tests against realistic issuance flows.",
      "Own upgrade paths, pause/admin controls, and multisig operational procedures.",
      "Integrate protocol surfaces with backend indexers, oracles, and operator APIs.",
      "Prepare releases for external security audits and drive remediation to close.",
      "Evaluate L2 and app-chain trade-offs when a new issuance needs different settlement assumptions.",
    ],
    qualifications: [
      "3+ years of protocol or smart-contract engineering in production.",
      "Strong Solidity (or Move/Rust) with Hardhat or Foundry, including fuzzing and invariant testing.",
      "Deep familiarity with token standards and permissioned models (ERC-20, ERC-721, ERC-3643 / T-REX or equivalent).",
      "Understanding of upgradeability, access control, and operational security (multisig, timelocks).",
      "Ability to write clear protocol documentation and work with auditors.",
      "Comfort collaborating with backend, architecture, and legal on compliance-mapped transfer rules.",
    ],
    niceToHave: [
      "Prior work on RWA, security-token, or DeFi protocol teams.",
      "Experience with oracles, account abstraction, or cross-chain messaging.",
      "Familiarity with formal methods, Slither, Echidna, or similar tooling.",
      "Contributions to public protocol repos or EIPs.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Protocol", items: ["Solidity", "ERC-3643 / T-REX", "OpenZeppelin", "Upgradeability"] },
      { category: "Testing & Security", items: ["Foundry", "Hardhat", "Fuzzing", "Invariant tests"] },
      { category: "Chains", items: ["Ethereum", "Polygon", "Arbitrum"] },
      { category: "Integration", items: ["Ethers.js", "Node.js", "Oracles"] },
    ],
  },
  {
    slug: "solidity-smart-contract-developer",
    title: "Blockchain Developer (Smart Contracts)",
    short: "Blockchain Developer (Smart Contracts)",
    tagline: "Design and ship production smart contracts for tokenized assets.",
    icon: Code2,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001233",
    overview:
      "TokenBrickLabs is a Seattle-based blockchain studio that designs, audits, and ships production Real-World Asset tokenization — issuance, identity, custody, and settlement rails for funds, fintechs, and operators. We hire globally and build for institutional security, compliance, and day-two operations, not slide-deck prototypes.\n\nAs a Blockchain Developer (Smart Contracts), you will own the Solidity layer of that stack: permissioned tokens, transfer restrictions, and the contract surfaces that investor and issuer products depend on.",
    extraSections: [
      {
        heading: "Reports to:",
        body: "Director, Engineering",
      },
      {
        heading: "Engineering Organization & Culture",
        body: "At TokenBrickLabs, we are engineering the institutional standard for Real-World Asset tokenization. Our mission is to ship platforms centered on security and compliance, requiring a commitment to technical excellence that extends beyond simply delivering code. As a global organization, we set a high bar for those driven to do their best work alongside world-class peers.\n\nWe value engineers who treat development as a craft and own the outcome from concept to deployment. We expect our teams to bring structure to ambiguity and shape the frameworks that support our studio. We refuse to compromise on quality and seek problem solvers who thrive on high-impact technical challenges.",
      },
      {
        heading: "The Team: Protocol Engineering",
        body: "The Protocol Engineering team builds the smart-contract and on-chain infrastructure behind TokenBrickLabs issuances. We design permissioned token standards, transfer rules, identity rails, and lifecycle events (NAV, coupons, redemptions) that operations teams can actually run. We solve complex distributed-systems problems on a modern stack, rejecting “good enough” in favor of the engineering rigor required in regulated jurisdictions.",
      },
    ],
    responsibilities: [
      "Design and develop smart contracts using Solidity.",
      "Build tokenization and asset management contracts for real-world assets.",
      "Implement investor permissions, transfer restrictions, and compliance controls.",
      "Integrate smart contracts with backend services and frontend applications.",
      "Develop and maintain contract deployment scripts and tooling.",
      "Write comprehensive unit and integration tests.",
      "Conduct security reviews and participate in external audits.",
      "Optimize contracts for gas efficiency and scalability.",
      "Collaborate with the engineering team on blockchain architecture and roadmap planning.",
    ],
    qualifications: [
      "3–5+ years of software development experience.",
      "Strong proficiency in Solidity and Ethereum smart contract development.",
      "Experience with ERC-20, ERC-721, and ERC-1155 standards.",
      "Familiarity with permissioned token standards and compliance-focused tokenization models.",
      "Experience with Hardhat, Foundry, or Truffle.",
      "Strong understanding of smart contract security best practices.",
      "Experience testing and deploying contracts on Ethereum-compatible networks.",
      "Understanding of blockchain fundamentals, wallets, and transaction flows.",
      "Strong debugging and problem-solving skills.",
    ],
    niceToHave: [
      "Experience building RWA, DeFi, or tokenization platforms.",
      "Knowledge of ERC-1400, ERC-3643, or other security token standards.",
      "Experience with multisig wallets and treasury management.",
      "Familiarity with Chainlink or oracle integrations.",
      "Understanding of KYC/AML and compliance workflows.",
      "Experience with audit preparation and remediation.",
    ],
    benefits: [
      "Opportunity to work at the bleeding edge of Web3 / crypto / DeFi.",
      "Flexible working conditions.",
      "Remote work location.",
      "Offer token/equity packages.",
      "Sponsored global events and travel.",
      "Annual global 2-week offsite.",
      "Signing and performance bonuses.",
      "Competitive remuneration (attractive salary, benefits, and incentives, including tokens and bonus opportunities).",
    ],
    techStack: [
      { category: "Blockchain", items: ["Solidity", "Ethereum", "Polygon", "Arbitrum"] },
      { category: "Smart Contract Development", items: ["Hardhat", "Foundry", "OpenZeppelin", "Ethers.js"] },
      { category: "Backend Integration", items: ["Node.js", "TypeScript", "REST APIs"] },
      { category: "Infrastructure", items: ["AWS", "Docker", "GitHub Actions"] },
      { category: "Database", items: ["PostgreSQL", "Redis"] },
    ],
  },
  {
    slug: "web3-developer",
    title: "Web3 Developer",
    short: "Web3 Developer",
    tagline: "Bridge users, wallets and contracts into a seamless RWA experience.",
    icon: Globe2,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001235",
    overview: aboutRole(
      "As a Web3 Developer, you will own the dApp layer of that stack: wallets, signatures, indexing, and the transaction flows that connect investors and issuers to tokenized assets. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Product Engineering (Web3)",
      "Product Engineering (Web3) connects protocol surfaces to investor and issuer products. We integrate wallets, transaction UX, and on-chain reads so operators can run issuances without treating the chain as a black box. We optimize for security, gas, and a mental model that non-crypto stakeholders can actually follow.",
    ),
    responsibilities: [
      "Develop and deploy smart contracts for property tokenization (NFTs), ownership transfer, and transaction flows.",
      "Integrate blockchain interactions into the frontend using Web3.js / Ethers.js (wallets, transactions, signatures).",
      "Work closely with backend and frontend teams to connect on-chain logic with off-chain services.",
      "Support multi-chain setups (Ethereum / Polygon) and optimize for gas, security, and scalability.",
      "Contribute to architecture decisions around tokenization, payments, and ownership models.",
    ],
    qualifications: [
      "2–4 years of experience in Web3 or blockchain development.",
      "Strong experience with Solidity and tools like Hardhat.",
      "Hands-on experience integrating wallets (MetaMask, WalletConnect).",
      "Good understanding of Ethereum ecosystem, tokens (ERC-721 / ERC-1155), and transaction flows.",
      "Ability to work in a fast-moving, product-focused environment.",
    ],
    niceToHave: [
      "Familiarity with Node.js or backend APIs.",
      "Experience with indexing (The Graph, custom indexers) or account abstraction.",
      "Prior work on fintech or RWA investor products.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Blockchain", items: ["Solidity", "Ethereum", "Polygon", "WalletConnect"] },
      { category: "Client Integration", items: ["Ethers.js", "viem", "Wagmi", "TypeScript"] },
      { category: "Frontend", items: ["React", "Next.js"] },
      { category: "Tooling", items: ["Hardhat", "Foundry"] },
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    short: "Backend Developer",
    tagline: "Power the off-chain core of our RWA platform.",
    icon: Server,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001236",
    overview: aboutRole(
      "As a Backend Developer, you will own the off-chain core of that stack: APIs, services, and data pipelines that power listings, KYC, payments, and on-chain orchestration for operators and investors. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Platform Engineering",
      "Platform Engineering builds the services that sit between protocol, identity, and product. We design APIs, reconciliation, and workflow systems that issuers can run after launch — KYC, payments, documents, and state that must match the chain. Reliability and auditability matter as much as feature velocity.",
    ),
    responsibilities: [
      "Design and build scalable REST/GraphQL APIs and microservices.",
      "Implement KYC/AML integrations, payment rails (fiat and stablecoin), and document workflows.",
      "Develop services that orchestrate on-chain transactions and reconcile on-chain/off-chain state.",
      "Build robust data models for properties, investors, valuations, and distributions.",
      "Own observability, performance, and security of backend systems.",
    ],
    qualifications: [
      "4+ years of backend engineering with Node.js, Go, or Python.",
      "Strong experience with PostgreSQL, Redis, and message queues (Kafka, RabbitMQ, SQS).",
      "Proficiency with Docker, Kubernetes, and cloud platforms (AWS / GCP).",
      "Solid grasp of authentication, authorization, and secure API design.",
    ],
    niceToHave: [
      "Experience integrating blockchain nodes, KYC providers, or payment processors.",
      "Background in fintech ledgering, reconciliation, or workflow engines.",
      "Familiarity with event-driven architectures and idempotent payment flows.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Languages", items: ["TypeScript", "Node.js", "Go", "Python"] },
      { category: "APIs & Services", items: ["REST", "GraphQL", "gRPC"] },
      { category: "Data", items: ["PostgreSQL", "Redis", "Kafka"] },
      { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes"] },
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    short: "Frontend Developer",
    tagline: "Craft a beautiful, trustworthy investor experience.",
    icon: Layout,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001237",
    overview: aboutRole(
      "As a Frontend Developer, you will own the investor- and issuer-facing web surfaces: property discovery, portfolio dashboards, KYC onboarding, and the high-clarity flows that make tokenization feel as considered as a top-tier fintech. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Product Engineering (Web)",
      "Product Engineering (Web) ships the applications operators and investors use every day. We partner with design on a coherent system, integrate backend and Web3 SDKs, and treat accessibility and empty/error states as part of the product — not polish after launch.",
    ),
    responsibilities: [
      "Implement responsive, accessible UI using React, TypeScript, and Tailwind CSS.",
      "Build dashboards for portfolio performance, distributions, and transaction history.",
      "Integrate with backend APIs and on-chain SDKs in collaboration with Web3 engineers.",
      "Partner with design to ship a polished, conversion-focused investor experience.",
      "Maintain a reusable component library and design system.",
    ],
    qualifications: [
      "3+ years of frontend experience with React and TypeScript.",
      "Strong skills in Tailwind CSS, modern state management, and performance tuning.",
      "Experience with data-heavy dashboards, charts, and complex forms.",
      "Eye for design, accessibility, and motion.",
    ],
    niceToHave: [
      "Experience with Web3 dApps, Three.js / React Three Fiber, or fintech UIs.",
      "Prior work on design-system implementation with engineers and designers.",
      "Familiarity with WCAG and complex form/KYC flows.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
      { category: "State & Data", items: ["TanStack Query", "Zustand", "REST APIs"] },
      { category: "Quality", items: ["Playwright", "Storybook", "Accessibility (WCAG)"] },
      { category: "Web3 (as needed)", items: ["viem", "Wagmi"] },
    ],
  },
  {
    slug: "ai-ml-developer",
    title: "AI / ML Developer",
    short: "AI / ML Developer",
    tagline: "Personalize the way investors discover real-world assets.",
    icon: Brain,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001238",
    overview: aboutRole(
      "As an AI / ML Developer, you will own recommendation, valuation, and assistant systems that help investors discover and evaluate tokenized properties — with production monitoring, not notebook demos. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Applied Intelligence",
      "Applied Intelligence builds models and LLM surfaces that sit on TokenBrickLabs product data: discovery, risk signals, and operator assistants. We ship through APIs, own evaluation, and refuse to treat generative features as ungrounded chat. Retrieval, permissions, and auditability come first.",
    ),
    responsibilities: [
      "Build recommendation and personalization models for property discovery.",
      "Develop valuation and risk-scoring models using market and on-chain data.",
      "Design and ship LLM-powered assistants with retrieval-augmented generation (RAG).",
      "Own data pipelines, feature stores, and model monitoring in production.",
      "Collaborate with product and backend teams to integrate models via APIs.",
    ],
    qualifications: [
      "3+ years of ML engineering with Python, PyTorch, or TensorFlow.",
      "Experience with recommender systems, NLP, and/or time-series forecasting.",
      "Hands-on experience with LLMs, embeddings, vector databases, and RAG.",
      "Strong MLOps fundamentals — training infra, deployment, and monitoring.",
    ],
    niceToHave: [
      "Experience in real estate, fintech, or on-chain analytics.",
      "Familiarity with evaluation harnesses and permissioned retrieval.",
      "Prior production work on ranking or risk models.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "ML", items: ["Python", "PyTorch", "scikit-learn"] },
      { category: "LLMs & Retrieval", items: ["Embeddings", "Vector DBs", "RAG"] },
      { category: "Data", items: ["PostgreSQL", "Feature pipelines", "On-chain datasets"] },
      { category: "Serving", items: ["FastAPI", "AWS", "Docker"] },
    ],
  },
  {
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    short: "Mobile App Developer",
    tagline: "Put fractional real estate in every investor's pocket.",
    icon: Smartphone,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time / Part-time",
    requisitionId: "JR2001239",
    overview: aboutRole(
      "As a Mobile App Developer, you will own iOS and Android experiences so investors can browse assets, manage portfolios, and complete high-stakes flows — KYC, wallets, and distributions — on the go. The role is open as full-time or part-time.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Product Engineering (Mobile)",
      "Product Engineering (Mobile) extends TokenBrickLabs products beyond the desktop operator console. We treat biometrics, secure storage, and store-release discipline as part of the control environment. The same issuance and portfolio truths must hold on a phone as they do on the web.",
    ),
    responsibilities: [
      "Build cross-platform mobile apps using React Native or Flutter (or native iOS/Android).",
      "Implement secure wallet flows, biometrics, and KYC onboarding on mobile.",
      "Integrate 3D property tours and rich media for immersive exploration.",
      "Optimize for performance, offline support, and push notifications.",
      "Collaborate with backend, design, and QA to ship reliable releases.",
    ],
    qualifications: [
      "3+ years of mobile development experience.",
      "Strong skills in React Native, Flutter, Swift, or Kotlin.",
      "Experience publishing apps to the App Store and Google Play.",
      "Familiarity with mobile security, biometrics, and secure storage.",
    ],
    niceToHave: [
      "Experience with WalletConnect, fintech apps, or AR/3D content.",
      "Prior work on offline-first or high-security consumer finance apps.",
      "Familiarity with React Native New Architecture or native modules.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Mobile", items: ["React Native", "Swift", "Kotlin"] },
      { category: "Security", items: ["Biometrics", "Secure storage", "WalletConnect"] },
      { category: "Release", items: ["App Store", "Google Play", "CI"] },
      { category: "Backend", items: ["REST APIs", "TypeScript"] },
    ],
  },
  {
    slug: "bd-manager",
    title: "Business Development Manager",
    short: "BD Manager",
    tagline: "Grow our network of property partners and institutional investors.",
    icon: Briefcase,
    department: "Go-to-market",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001240",
    overview: aboutRole(
      "As a Business Development Manager, you will own partnerships with real-estate sponsors, asset managers, and institutional investors — bringing assets and capital onto rails we can actually operate after close.",
    ),
    extraSections: jdExtras(
      "Head of Growth",
      GTM_CULTURE,
      "The Team: Partnerships",
      "Partnerships originates and structures TokenBrickLabs issuances with sponsors and allocators. We work with legal and product so a signed term sheet maps to a deliverable stack — contracts, identity, custody — not a vague integration. Pipeline discipline and written deal rooms are how we scale.",
    ),
    responsibilities: [
      "Identify, pitch, and close partnerships with real-estate sponsors and institutional investors.",
      "Build and manage a structured pipeline of deals from prospecting to close.",
      "Represent TokenBrickLabs at industry events, conferences, and partner meetings.",
      "Work with legal and product teams to structure compliant tokenization deals.",
      "Own KPIs around partnerships, AUM onboarded, and revenue.",
    ],
    qualifications: [
      "5+ years in business development, sales, or partnerships in fintech, real estate, or Web3.",
      "Strong network in real estate, asset management, or institutional crypto.",
      "Excellent communication, negotiation, and storytelling skills.",
      "Comfort with deal structuring, term sheets, and basic financial modeling.",
    ],
    niceToHave: [
      "Prior experience launching RWA, tokenization, or alternative-asset products.",
      "Existing relationships with funds, issuers, or regulated intermediaries.",
      "Familiarity with securities tokenization and cross-border distribution.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Pipeline", items: ["CRM", "Deal rooms", "Notion"] },
      { category: "Materials", items: ["Issuance briefs", "Financial models"] },
      { category: "Domain", items: ["RWA", "Real estate", "Institutional crypto"] },
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    short: "Project Manager",
    tagline: "Keep cross-functional RWA delivery on time and on quality.",
    icon: ClipboardList,
    department: "Operations",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001241",
    overview: aboutRole(
      "As a Project Manager, you will coordinate engineering, design, product, and external partners so tokenization, audits, and releases land on time — with risk visible before it becomes a date miss.",
    ),
    extraSections: jdExtras(
      "Director, Operations",
      OPERATIONS_CULTURE,
      "The Team: Delivery",
      "Delivery keeps TokenBrickLabs issuances and platform work sequenced across protocol, product, and vendors. We run roadmaps, audit calendars, and partner integrations with written status — not status theater. The job is to make dependencies and quality bars explicit.",
    ),
    responsibilities: [
      "Plan and run delivery cycles across engineering, design, product, and partners.",
      "Maintain roadmaps, milestones, and clear status reporting to leadership.",
      "Identify risks, dependencies, and blockers — and drive them to resolution.",
      "Run rituals (standups, planning, retros) that keep teams focused and unblocked.",
      "Coordinate releases, audits, and partner integrations.",
    ],
    qualifications: [
      "4+ years managing software delivery in fintech, Web3, or complex SaaS.",
      "Strong command of Agile/Scrum and modern PM tooling (Jira, Linear, Notion).",
      "Excellent stakeholder management and written communication.",
      "Comfort with technical concepts in blockchain, AI, and platform engineering.",
    ],
    niceToHave: [
      "PMP, Scrum Master, or PSPO certifications.",
      "Experience coordinating security audits or regulated-product launches.",
      "Prior work with globally distributed engineering teams.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Delivery", items: ["Linear", "Jira", "Notion"] },
      { category: "Communication", items: ["Written status", "Async rituals"] },
      { category: "Domain", items: ["Audits", "Releases", "Partner integrations"] },
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    short: "Product Manager",
    tagline: "Lead the vision bridging blockchain, gaming, and real estate.",
    icon: Package,
    department: "Product",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001242",
    overview: aboutRole(
      "As a Product Manager, you will own strategy, planning, and execution for TokenBrickLabs products — translating issuance, identity, and custody into requirements engineering and design can ship, and operators can run.",
    ),
    extraSections: jdExtras(
      "Head of Product",
      PRODUCT_CULTURE,
      "The Team: Product",
      "Product sits between business, design, and engineering. We turn tokenization models into sequenced work: investor flows, issuer consoles, and the compliance surfaces in between. We measure what ships, write the spec, and stay in the room when legal and protocol disagree.",
    ),
    responsibilities: [
      "Collaborate with engineering, design, blockchain, and AI teams to translate business goals into clear product requirements and user stories.",
      "Lead end-to-end product lifecycle from ideation, specification, and development to launch and iteration.",
      "Conduct market research, competitive analysis, and user interviews to gather insights and validate assumptions.",
      "Monitor product performance through KPIs and user feedback; drive continuous improvement and feature enhancements.",
      "Manage stakeholder communication and ensure alignment across business, tech, and marketing teams.",
    ],
    qualifications: [
      "Proven experience as a Product Manager, preferably in blockchain, gaming, fintech, or real estate tech.",
      "Strong understanding of Web3 ecosystems, tokenomics, NFTs, and DeFi platforms.",
      "Excellent communication and leadership skills with cross-functional teams.",
      "Ability to balance big-picture vision with detailed execution.",
      "Familiarity with agile methodologies and product management tools (Jira, Trello, Notion).",
    ],
    niceToHave: [
      "Experience shipping regulated or compliance-heavy products.",
      "Familiarity with RWA issuance, KYC/AML, or custody workflows.",
      "Comfort writing technical specs alongside engineering.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Product", items: ["Linear", "Notion", "FigJam"] },
      { category: "Analytics", items: ["KPIs", "User interviews", "Funnels"] },
      { category: "Domain", items: ["RWA", "Web3", "Fintech"] },
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    short: "DevOps Engineer",
    tagline: "Build the reliable, secure infra that institutions trust.",
    icon: Settings,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001243",
    overview: aboutRole(
      "As a DevOps Engineer, you will own cloud, CI/CD, and observability so TokenBrickLabs platforms stay secure, compliant, and operable — the substrate institutions expect before they put capital on-chain.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Infrastructure & Reliability",
      "Infrastructure & Reliability runs the environments protocol and product ship into. We treat Terraform, Kubernetes, secrets, and SLOs as part of the control plane. Progressive delivery, audit logs, and least privilege are how we earn the right to host issuance workloads.",
    ),
    responsibilities: [
      "Design and manage cloud infrastructure on AWS or GCP using Terraform.",
      "Operate Kubernetes clusters with GitOps, autoscaling, and policy enforcement.",
      "Build secure, fast CI/CD pipelines with progressive delivery and rollbacks.",
      "Implement observability — metrics, logs, traces — and SLOs for critical services.",
      "Champion security best practices, secret management, and compliance readiness.",
    ],
    qualifications: [
      "4+ years of DevOps / SRE experience in production environments.",
      "Strong skills with Kubernetes, Terraform, and a major cloud (AWS / GCP / Azure).",
      "Experience with CI/CD (GitHub Actions, ArgoCD) and observability stacks (Prometheus, Grafana, OpenTelemetry).",
      "Solid networking, Linux, and security fundamentals.",
    ],
    niceToHave: [
      "Experience operating blockchain nodes or fintech-grade compliance environments.",
      "Familiarity with SOC 2, ISO 27001, or similar control frameworks.",
      "Prior work on GitOps, policy-as-code, or secrets platforms.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Cloud", items: ["AWS", "GCP", "Terraform"] },
      { category: "Orchestration", items: ["Kubernetes", "ArgoCD", "GitHub Actions"] },
      { category: "Observability", items: ["Prometheus", "Grafana", "OpenTelemetry"] },
      { category: "Security", items: ["IAM", "Secrets", "Policy-as-code"] },
    ],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    short: "QA Engineer",
    tagline: "Guard the quality bar where money meets blockchain.",
    icon: ShieldCheck,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001244",
    overview: aboutRole(
      "As a QA Engineer, you will own test strategy for tokenization, payments, and investor flows — so money, identity, and on-chain state stay correct under change.",
    ),
    extraSections: jdExtras(
      "Engineering Manager",
      ENGINEERING_CULTURE,
      "The Team: Quality Engineering",
      "Quality Engineering is embedded with product and protocol squads. We automate the paths that move capital and identity, validate contracts on testnets, and shift testing left in CI. “Looks fine in staging” is not a release criterion when settlement is involved.",
    ),
    responsibilities: [
      "Design test plans and automated test suites across web, mobile, and APIs.",
      "Build end-to-end tests for critical investor flows (KYC, purchase, distributions).",
      "Validate on-chain interactions on testnets and staging environments.",
      "Drive regression, performance, and security testing in CI.",
      "Partner with engineering to improve quality processes and shift testing left.",
    ],
    qualifications: [
      "3+ years of QA / test automation experience in web and mobile products.",
      "Strong skills with Playwright, Cypress, Detox, or Appium.",
      "Experience testing APIs, payment flows, and complex stateful systems.",
      "Solid understanding of CI/CD and test infrastructure.",
    ],
    niceToHave: [
      "Experience testing dApps, fintech, or RWA platforms.",
      "Familiarity with contract testing or testnet orchestration.",
      "Background in performance or security testing.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Automation", items: ["Playwright", "Cypress", "API tests"] },
      { category: "Mobile", items: ["Detox", "Appium"] },
      { category: "CI", items: ["GitHub Actions", "Test reporting"] },
      { category: "Domain", items: ["KYC", "Payments", "Testnets"] },
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    short: "Product Designer",
    tagline: "Shape the product surfaces investors and issuers use every day.",
    icon: PenTool,
    department: "Design",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001245",
    overview: aboutRole(
      "As a Product Designer, you will own end-to-end product design — from problem framing and information architecture to high-fidelity systems — so tokenization, KYC, and portfolio flows feel as considered as a top-tier fintech.",
    ),
    extraSections: jdExtras(
      "Head of Product",
      DESIGN_CULTURE,
      "The Team: Product Design",
      "Product Design owns the surfaces investors, issuers, and operators use. We turn ambiguous asset and compliance requirements into structure, then into a system engineering can implement. We prototype, test with real users, and present rationale — not just screens — to founders and legal partners.",
    ),
    responsibilities: [
      "Lead design for investor, issuer, and operator journeys across web (and later mobile).",
      "Translate ambiguous asset and compliance requirements into clear product structure.",
      "Build and maintain a coherent design system used by engineering and marketing.",
      "Prototype flows for issuance, onboarding, and portfolio management; test with real users.",
      "Partner with Product, Engineering, and Legal so visual decisions survive regulatory review.",
      "Present work with rationale — not just screens — to founders and cross-functional partners.",
    ],
    qualifications: [
      "5+ years of product design for complex web products (fintech, marketplace, or B2B SaaS preferred).",
      "A portfolio that shows systems thinking, not only visual polish.",
      "Expert in Figma: components, variants, auto-layout, and documentation for engineers.",
      "Comfortable running lightweight research and turning findings into product changes.",
      "Strong written communication; you can write specs designers and engineers both use.",
      "Experience collaborating in a remote, high-ownership environment.",
    ],
    niceToHave: [
      "Prior work on dashboards, KYC/AML, or wealth/investment products.",
      "Motion and prototyping (Figma, Principle, or code).",
      "Familiarity with Web3 wallets and on-chain mental models.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Design", items: ["Figma", "FigJam", "Prototyping"] },
      { category: "Systems", items: ["Design tokens", "Components", "Documentation"] },
      { category: "Research", items: ["Usability tests", "Journey maps"] },
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    short: "UI/UX Designer",
    tagline: "Craft accessible, high-clarity interfaces for tokenized markets.",
    icon: Palette,
    department: "Design",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001246",
    overview: aboutRole(
      "As a UI/UX Designer, you will own interaction patterns, visual hierarchy, and usability across property discovery, onboarding, and operational tools — with a bar that matches global consumer-fintech products.",
    ),
    extraSections: jdExtras(
      "Product Designer",
      DESIGN_CULTURE,
      "The Team: Product Design",
      "UI/UX on the Product Design team raises craft on every state: empty, loading, error, success. We map journeys, specify for frontend, and treat accessibility as a shipping requirement. High-stakes financial flows do not get a pass for unclear hierarchy.",
    ),
    responsibilities: [
      "Design interface states (empty, loading, error, success) for high-stakes financial flows.",
      "Map user journeys and wireframes for KYC, purchase, and distribution experiences.",
      "Raise visual craft: typography, spacing, color, and component consistency.",
      "Run usability reviews and synthesize feedback into iteration plans.",
      "Produce production-ready specs, redlines, and assets for frontend engineers.",
      "Champion accessibility (WCAG) and inclusive design in every surface you touch.",
    ],
    qualifications: [
      "3+ years of UI/UX design shipped to production.",
      "Portfolio demonstrating interaction design, visual systems, and before/after thinking.",
      "Strong Figma craft and an eye for detail at 1x and 2x.",
      "Working knowledge of accessibility, responsive layouts, and design-to-dev handoff.",
      "Ability to work from product briefs without waiting for pixel-perfect direction.",
    ],
    niceToHave: [
      "Experience with design systems or contributing to component libraries.",
      "Basic HTML/CSS familiarity for tighter collaboration with frontend.",
      "Motion design or 3D/property visualization work.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Design", items: ["Figma", "Prototyping", "Redlines"] },
      { category: "Quality", items: ["WCAG", "Responsive layouts", "Handoff"] },
      { category: "Craft", items: ["Typography", "Color", "Motion"] },
    ],
  },
  {
    slug: "engineering-manager",
    title: "Engineering Manager",
    short: "Engineering Manager",
    tagline: "Lead a multi-disciplinary squad shipping production RWA infrastructure.",
    icon: UsersRound,
    department: "Engineering",
    location: "Remote · Global",
    employmentType: "Full-time",
    requisitionId: "JR2001247",
    overview: aboutRole(
      "As an Engineering Manager, you will lead a squad spanning protocol, backend, and product engineering. You set the delivery bar, grow people, and keep the technical standard high enough for institutional partners — without becoming a bottleneck.",
    ),
    extraSections: jdExtras(
      "Chief Technology Officer",
      ENGINEERING_CULTURE,
      "The Team: Engineering Leadership",
      "Engineering Managers at TokenBrickLabs lead remote squads that ship issuance infrastructure. You hire and coach ICs, sequence work with Product, and stay close enough to TypeScript, Solidity, and cloud to make sound calls. You represent engineering in leadership forums and protect focus when tokenization work is ambiguous.",
    ),
    responsibilities: [
      "Lead a remote engineering team: hiring, coaching, performance, and career paths.",
      "Own delivery against the product roadmap — scope, sequencing, and quality.",
      "Create clarity in ambiguous tokenization and compliance work; protect focus.",
      "Partner with Product and Design on trade-offs; represent engineering in leadership forums.",
      "Uphold engineering practices: reviews, testing, incident response, and documentation.",
      "Stay close enough to the stack (TypeScript, Solidity, cloud) to make sound technical calls.",
    ],
    qualifications: [
      "7+ years in software engineering, including 2+ years managing engineers.",
      "Track record shipping production systems in fintech, infrastructure, or similarly regulated domains.",
      "Ability to hire and retain strong ICs; you know what excellent looks like.",
      "Excellent written communication and comfort with async, global teams.",
      "Enough technical depth to review architecture and unblock without taking over the work.",
    ],
    niceToHave: [
      "Experience with blockchain, custody, or payments platforms.",
      "Prior role at a high-growth startup or a large product organization.",
      "Familiarity with SOC 2, ISO 27001, or similar control environments.",
    ],
    benefits: SHARED_BENEFITS,
    techStack: [
      { category: "Delivery", items: ["Linear", "GitHub", "Written RFCs"] },
      { category: "Stack fluency", items: ["TypeScript", "Solidity", "AWS"] },
      { category: "Practices", items: ["Code review", "Incidents", "Hiring"] },
    ],
  },
];

export const getTalentBySlug = (slug: string) => TALENTS.find((t) => t.slug === slug);
