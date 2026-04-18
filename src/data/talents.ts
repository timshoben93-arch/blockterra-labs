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
  type LucideIcon,
} from "lucide-react";

export type Talent = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
};

const PROJECT_CONTEXT =
  "BlockTerraLab is building a Real-World Asset (RWA) platform that enables fractional ownership of real estate through blockchain tokenization, enhanced with AI-driven personalization and immersive 3D property exploration.";

export const TALENTS: Talent[] = [
  {
    slug: "solidity-smart-contract-developer",
    title: "Solidity / Smart Contract Developer",
    short: "Solidity / Smart Contract Dev",
    tagline: "Design and ship secure tokenization contracts for fractional real estate.",
    icon: Code2,
    overview: `${PROJECT_CONTEXT} As a Solidity / Smart Contract Developer, you will architect and implement the on-chain backbone of our fractional real-estate tokenization protocol — including compliant token standards, vaults, marketplaces and revenue distribution.`,
    responsibilities: [
      "Design, implement and audit Solidity smart contracts for RWA tokenization (ERC-3643, ERC-1400, ERC-20/721/1155).",
      "Build fractional ownership vaults, distribution and rent-payout mechanisms for tokenized real estate.",
      "Integrate on-chain identity, KYC/AML whitelists and jurisdiction-aware transfer rules.",
      "Write comprehensive tests (Foundry / Hardhat), perform gas optimization and prepare contracts for third-party audits.",
      "Collaborate with backend and frontend engineers to expose contract functionality through clean SDKs and APIs.",
    ],
    qualifications: [
      "3+ years of professional Solidity experience with shipped mainnet contracts.",
      "Deep understanding of EVM internals, gas optimization and common security pitfalls (reentrancy, oracle manipulation, MEV).",
      "Hands-on experience with Foundry, Hardhat, OpenZeppelin and upgradeable proxy patterns.",
      "Familiarity with RWA / tokenization standards (ERC-3643, ERC-1400) and DeFi primitives.",
      "Bonus: experience with audits, formal verification, or Chainlink oracles.",
    ],
  },
  {
    slug: "web3-developer",
    title: "Web3 Developer",
    short: "Web3 Developer",
    tagline: "Bridge users, wallets and contracts into a seamless RWA experience.",
    icon: Globe2,
    overview: `${PROJECT_CONTEXT} As a Web3 Developer, you will build the dApp layer that connects investors to tokenized properties — wallets, transactions, indexing and on-chain data flows.`,
    responsibilities: [
      "Develop dApp features using ethers.js / viem / wagmi and integrate WalletConnect and major wallets.",
      "Implement transaction flows for buying, selling and managing fractional real-estate tokens.",
      "Build subgraphs (The Graph) and indexers to surface on-chain activity and portfolio data.",
      "Work closely with smart contract engineers to design contract interfaces and ABIs.",
      "Ensure resilient UX around chain reorgs, gas estimation, signature flows and error handling.",
    ],
    qualifications: [
      "2+ years building production dApps on EVM chains.",
      "Strong TypeScript and React skills with wagmi / viem / ethers.js.",
      "Experience with The Graph, Alchemy/Infura, and multi-chain deployments.",
      "Solid understanding of EIP-712 signatures, account abstraction and wallet UX patterns.",
      "Bonus: experience with RWA, DeFi, or compliance-driven token flows.",
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    short: "Backend Developer",
    tagline: "Power the off-chain core of our RWA platform.",
    icon: Server,
    overview: `${PROJECT_CONTEXT} As a Backend Developer, you will design and build the APIs, services and data pipelines that power property listings, KYC, payments, AI personalization and on-chain orchestration.`,
    responsibilities: [
      "Design and build scalable REST/GraphQL APIs and microservices.",
      "Implement KYC/AML integrations, payment rails (fiat & stablecoin) and document workflows.",
      "Develop services that orchestrate on-chain transactions and reconcile on-chain/off-chain state.",
      "Build robust data models for properties, investors, valuations and distributions.",
      "Own observability, performance and security of backend systems.",
    ],
    qualifications: [
      "4+ years of backend engineering with Node.js, Go, or Python.",
      "Strong experience with PostgreSQL, Redis and message queues (Kafka, RabbitMQ, SQS).",
      "Proficiency with Docker, Kubernetes and cloud platforms (AWS / GCP).",
      "Solid grasp of authentication, authorization and secure API design.",
      "Bonus: experience integrating with blockchain nodes, KYC providers, or payment processors.",
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    short: "Frontend Developer",
    tagline: "Craft a beautiful, trustworthy investor experience.",
    icon: Layout,
    overview: `${PROJECT_CONTEXT} As a Frontend Developer, you will build the investor-facing web application — property discovery, portfolio dashboards, KYC onboarding and immersive 3D exploration.`,
    responsibilities: [
      "Implement responsive, accessible UI using React, TypeScript and Tailwind CSS.",
      "Build dashboards for portfolio performance, distributions and transaction history.",
      "Integrate with backend APIs and on-chain SDKs in collaboration with Web3 engineers.",
      "Partner with design to ship a polished, conversion-focused investor experience.",
      "Maintain a reusable component library and design system.",
    ],
    qualifications: [
      "3+ years of frontend experience with React and TypeScript.",
      "Strong skills in Tailwind CSS, modern state management and performance tuning.",
      "Experience with data-heavy dashboards, charts and complex forms.",
      "Eye for design, accessibility and motion.",
      "Bonus: experience with Web3 dApps, Three.js / React Three Fiber, or fintech UIs.",
    ],
  },
  {
    slug: "ai-ml-developer",
    title: "AI / ML Developer",
    short: "AI / ML Developer",
    tagline: "Personalize the way investors discover real-world assets.",
    icon: Brain,
    overview: `${PROJECT_CONTEXT} As an AI / ML Developer, you will design recommendation systems, valuation models and AI-driven assistants that personalize how investors discover and evaluate tokenized properties.`,
    responsibilities: [
      "Build recommendation and personalization models for property discovery.",
      "Develop valuation and risk-scoring models using market and on-chain data.",
      "Design and ship LLM-powered assistants with retrieval-augmented generation (RAG).",
      "Own data pipelines, feature stores and model monitoring in production.",
      "Collaborate with product and backend teams to integrate models via APIs.",
    ],
    qualifications: [
      "3+ years of ML engineering with Python, PyTorch or TensorFlow.",
      "Experience with recommender systems, NLP and/or time-series forecasting.",
      "Hands-on experience with LLMs, embeddings, vector databases and RAG.",
      "Strong MLOps fundamentals — training infra, deployment and monitoring.",
      "Bonus: experience in real estate, fintech or on-chain analytics.",
    ],
  },
  {
    slug: "mobile-app-developer",
    title: "Mobile App Developer",
    short: "Mobile App Developer",
    tagline: "Put fractional real estate in every investor's pocket.",
    icon: Smartphone,
    overview: `${PROJECT_CONTEXT} As a Mobile App Developer, you will design and build our iOS and Android apps so investors can browse properties, manage portfolios and explore 3D listings on the go.`,
    responsibilities: [
      "Build cross-platform mobile apps using React Native or Flutter (or native iOS/Android).",
      "Implement secure wallet flows, biometrics and KYC onboarding on mobile.",
      "Integrate 3D property tours and rich media for immersive exploration.",
      "Optimize for performance, offline support and push notifications.",
      "Collaborate with backend, design and QA to ship reliable releases.",
    ],
    qualifications: [
      "3+ years of mobile development experience.",
      "Strong skills in React Native, Flutter, Swift or Kotlin.",
      "Experience publishing apps to the App Store and Google Play.",
      "Familiarity with mobile security, biometrics and secure storage.",
      "Bonus: experience with WalletConnect, fintech apps, or AR/3D content.",
    ],
  },
  {
    slug: "bd-manager",
    title: "Business Development Manager",
    short: "BD Manager",
    tagline: "Grow our network of property partners and institutional investors.",
    icon: Briefcase,
    overview: `${PROJECT_CONTEXT} As a BD Manager, you will drive partnerships with real-estate developers, asset managers and institutional investors to bring high-quality assets and capital onto the platform.`,
    responsibilities: [
      "Identify, pitch and close partnerships with real-estate sponsors and institutional investors.",
      "Build and manage a structured pipeline of deals from prospecting to close.",
      "Represent BlockTerraLab at industry events, conferences and partner meetings.",
      "Work with legal and product teams to structure compliant tokenization deals.",
      "Own KPIs around partnerships, AUM onboarded and revenue.",
    ],
    qualifications: [
      "5+ years in business development, sales or partnerships in fintech, real estate or Web3.",
      "Strong network in real estate, asset management or institutional crypto.",
      "Excellent communication, negotiation and storytelling skills.",
      "Comfort with deal structuring, term sheets and basic financial modeling.",
      "Bonus: prior experience launching RWA, tokenization or alternative-asset products.",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    short: "Project Manager",
    tagline: "Keep cross-functional RWA delivery on time and on quality.",
    icon: ClipboardList,
    overview: `${PROJECT_CONTEXT} As a Project Manager, you will coordinate engineering, design, product and external partners to deliver complex tokenization, AI and 3D features end-to-end.`,
    responsibilities: [
      "Plan and run delivery cycles across engineering, design, product and partners.",
      "Maintain roadmaps, milestones and clear status reporting to leadership.",
      "Identify risks, dependencies and blockers — and drive them to resolution.",
      "Run rituals (standups, planning, retros) that keep teams focused and unblocked.",
      "Coordinate releases, audits and partner integrations.",
    ],
    qualifications: [
      "4+ years managing software delivery in fintech, Web3 or complex SaaS.",
      "Strong command of Agile/Scrum and modern PM tooling (Jira, Linear, Notion).",
      "Excellent stakeholder management and written communication.",
      "Comfort with technical concepts in blockchain, AI and platform engineering.",
      "Bonus: PMP, Scrum Master or PSPO certifications.",
    ],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    short: "Product Manager",
    tagline: "Define what we build for investors, sponsors and partners.",
    icon: Package,
    overview: `${PROJECT_CONTEXT} As a Product Manager, you will own product strategy and execution for key surfaces — investor experience, tokenization workflows, AI personalization and 3D exploration.`,
    responsibilities: [
      "Own product vision, roadmap and KPIs for assigned surfaces.",
      "Talk to investors, sponsors and partners to deeply understand needs.",
      "Translate insights into crisp PRDs, user stories and success metrics.",
      "Partner with design, engineering and BD to ship and iterate on features.",
      "Use analytics and experimentation to continuously improve outcomes.",
    ],
    qualifications: [
      "4+ years of product management in fintech, Web3, real estate or marketplaces.",
      "Strong analytical skills and comfort with data tools (SQL, Amplitude, Mixpanel).",
      "Proven track record shipping consumer or B2B2C products at scale.",
      "Excellent communication and prioritization in ambiguous environments.",
      "Bonus: experience with RWA, tokenization, or AI-driven product surfaces.",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    short: "DevOps Engineer",
    tagline: "Build the reliable, secure infra that institutions trust.",
    icon: Settings,
    overview: `${PROJECT_CONTEXT} As a DevOps Engineer, you will design and operate the cloud, CI/CD and observability foundations that keep our RWA platform secure, compliant and always-on.`,
    responsibilities: [
      "Design and manage cloud infrastructure on AWS or GCP using Terraform.",
      "Operate Kubernetes clusters with GitOps, autoscaling and policy enforcement.",
      "Build secure, fast CI/CD pipelines with progressive delivery and rollbacks.",
      "Implement observability — metrics, logs, traces — and SLOs for critical services.",
      "Champion security best practices, secret management and compliance readiness.",
    ],
    qualifications: [
      "4+ years of DevOps / SRE experience in production environments.",
      "Strong skills with Kubernetes, Terraform and a major cloud (AWS / GCP / Azure).",
      "Experience with CI/CD (GitHub Actions, ArgoCD) and observability stacks (Prometheus, Grafana, OpenTelemetry).",
      "Solid networking, Linux and security fundamentals.",
      "Bonus: experience operating blockchain nodes or fintech-grade compliance environments.",
    ],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    short: "QA Engineer",
    tagline: "Guard the quality bar where money meets blockchain.",
    icon: ShieldCheck,
    overview: `${PROJECT_CONTEXT} As a QA Engineer, you will design and execute test strategies that ensure our tokenization, payment and investor flows are accurate, secure and reliable.`,
    responsibilities: [
      "Design test plans and automated test suites across web, mobile and APIs.",
      "Build end-to-end tests for critical investor flows (KYC, purchase, distributions).",
      "Validate on-chain interactions on testnets and staging environments.",
      "Drive regression, performance and security testing in CI.",
      "Partner with engineering to improve quality processes and shift testing left.",
    ],
    qualifications: [
      "3+ years of QA / test automation experience in web and mobile products.",
      "Strong skills with Playwright, Cypress, Detox or Appium.",
      "Experience testing APIs, payment flows and complex stateful systems.",
      "Solid understanding of CI/CD and test infrastructure.",
      "Bonus: experience testing dApps, fintech, or RWA platforms.",
    ],
  },
];

export const getTalentBySlug = (slug: string) =>
  TALENTS.find((t) => t.slug === slug);
