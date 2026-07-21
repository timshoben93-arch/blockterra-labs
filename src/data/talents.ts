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
  reportsTo?: string;
  extraSections?: { heading: string; body: string }[];
  niceToHave?: string[];
  benefits?: string[];
  techStack?: { category: string; items: string[] }[];
};

const PROJECT_CONTEXT =
  "TokenBrickLabs is building a Real-World Asset (RWA) platform that enables fractional ownership of real estate through blockchain tokenization, enhanced with AI-driven personalization and immersive 3D property exploration.";

export const TALENTS: Talent[] = [
  {
    slug: "blockchain-architect",
    title: "Blockchain Architect",
    short: "Blockchain Architect",
    tagline: "Architect the secure, scalable Web3 core of our RWA platform.",
    icon: Network,
    overview:
      "We’re looking for a Blockchain Architect to help design and build the core Web3 infrastructure behind this project. This role sits at the intersection of smart contract architecture, backend integration, and product scalability — working closely with our engineering, product, and DevOps teams to bring secure, production-ready blockchain features to life.",
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
  },
  {
    slug: "solidity-smart-contract-developer",
    title: "Blockchain Developer (Smart Contracts)",
    short: "Blockchain Developer (Smart Contracts)",
    tagline: "",
    icon: Code2,
    overview:
      "TokenBrickLabs is an institutionally focused global digital asset platform that provides market infrastructure and information services. These include: TokenBrickLabs Exchange – a regulated and institutionally focused digital assets spot and derivatives exchange, integrating a high-performance central limit order book matching engine with automated market making to provide deep and predictable liquidity. TokenBrickLabs Exchange is regulated in Germany, Hong Kong, and Gibraltar. TokenBrickLabs Indices – a collection of tradable proprietary and single-asset benchmarks and indices that track the performance of digital assets for global institutions in the digital assets and traditional finance industries. TokenBrickLabs Data – a broad suite of digital assets market data and analytics, providing real-time insights into prices, trends, and market dynamics. TokenBrickLabs Insights – a digital asset media and events provider covering news and insights about digital assets, the underlying markets, policy, and blockchain technology.",
    extraSections: [
      {
        heading: "Reports to:",
        body: "Director, Engineering",
      },
      {
        heading: "Engineering Organization & Culture",
        body: "At TokenBrickLabs, we are engineering the institutional standard for the digital asset industry. Our mission is to build a platform centered on security and compliance, requiring a commitment to technical excellence that extends beyond simply delivering code. As a global organization, we set a high bar for those driven to do their best work alongside world-class peers.\n\nWe value engineers who treat development as a craft and own the outcome from concept to deployment. We expect our teams to bring structure to ambiguity and shape the frameworks that support our global organization. We refuse to compromise on quality and seek problem solvers who thrive on high-impact technical challenges.",
      },
      {
        heading: "The Team: Clearing Engineering",
        body: "The Clearing Engineering Team builds the mission-critical infrastructure for TokenBrickLabs Clearing. We mitigate systemic risk through automated default management and ensure operational integrity via high-precision data validation. Our proprietary netting algorithms drive capital efficiency and market velocity, reducing liquidity requirements while accelerated settlement cycles provide participants with faster access to funds. We solve complex distributed systems challenges on a modern cloud-native stack, rejecting \"good enough\" in favor of the engineering rigor required to operate within highly regulated jurisdictions.",
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
    overview: `${PROJECT_CONTEXT} As a Web3 Developer, you will build the dApp layer that connects investors to tokenized properties — wallets, transactions, indexing and on-chain data flows.`,
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
      "Familiarity with Node.js or backend APIs is a plus.",
      "Ability to work in a fast-moving, product-focused environment.",
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
      "Represent TokenBrickLabs at industry events, conferences and partner meetings.",
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
    tagline: "Lead the vision bridging blockchain, gaming, and real estate.",
    icon: Package,
    overview:
      "This is a technology platform focused on tokenizing real-world assets (RWA) — starting with real estate — by combining blockchain, AI, and data-driven insights. Our goal is to make real estate investment more transparent, efficient, and accessible through modern technology.\n\nWe’re looking for a visionary Product Manager to lead the strategy, planning, and execution of this platform — a next-generation ecosystem combining blockchain, gaming, and real estate. The Product Manager will act as the bridge between business, design, and engineering, ensuring smooth delivery of features that align with our long-term vision.",
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
