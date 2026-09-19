export const WHITEPAPER = {
  version: "2.0",
  date: "September 2026",
  title: "TokenBrickLabs Company White Paper",
  subtitle: "Production tokenization rails for real-world assets",
  classification: "Company White Paper",
  pages: 20,
  classificationLine: "Confidentiality: public company paper · not an offering memorandum",
} as const;

export type WhitepaperBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string };

export type WhitepaperSection = {
  id: string;
  number: string;
  title: string;
  blocks: WhitepaperBlock[];
};

export const WHITEPAPER_SECTIONS: WhitepaperSection[] = [
  {
    id: "executive-summary",
    number: "01",
    title: "Executive summary and company positioning",
    blocks: [
      {
        type: "p",
        text: "TokenBrickLabs is a Seattle-based blockchain studio that designs, audits, and deploys production tokenization stacks for funds, fintechs, and asset operators. The company was founded in 2025. Headquarters is at 1208 2nd Avenue, Seattle, WA 98101. The studio is remote-first and hires globally. Public contact issupport@tokenbricklabs.com. Discovery is offered as a thirty-minute call whose intended output is a written sequence of contracts, identity, custody, and a realistic launch window.",
      },
      {
        type: "p",
        text: "Positioning on the official site is institutional, not consumer crypto marketing. The homepage proposition is: tokenize real assets, and ship rails institutions can operate. Issuance is treated as an operations problem — transfer rules, investor identity, custody, net asset value (NAV), coupons, redemptions, and secondary settlement — rather than a weekend smart-contract demo. TokenBrickLabs sits between protocol engineering and fund operations so neither side has to pretend to be the other. The intended reader already has an asset, counsel, and a deadline.",
      },
      {
        type: "p",
        text: "Leadership listed on the company surface is a Chief Executive Officer, a Chief Technology Officer, and a Tech Lead. Culture language on careers is craft over theater, high ownership with low ceremony, and written decisions. Engineering, design, product, go-to-market, and operations roles are posted as remote, with a mix of full-time and full-time/part-time requisitions in protocol, product, and platform engineering.",
      },
      {
        type: "h3",
        text: "What this paper is",
      },
      {
        type: "p",
        text: "This document is the company white paper. It restates, in a single 20-page operating narrative, the architecture and commercial model published across the TokenBrickLabs website: company, services, engagement models, industries, delivery process, careers, and the six-chapter technical documentation. It is not a private placement memorandum, not an audit report, and not an offer to sell securities. Technical protocol papers remain the source for Cellular Automata consensus mathematics; this paper cites that research as direction, not as a live mainnet claim.",
      },
      {
        type: "h3",
        text: "One-page thesis",
      },
      {
        type: "ul",
        items: [
          "Structure first: offering, jurisdictions, and transfer rules before code hardens.",
          "Issue on permissioned standards: ERC-3643 / T-REX and, where the instrument requires it, ERC-1400, with identity rails that match the PPM.",
          "Operate after launch: NAV, coupons, corporate actions, and secondary transfers as first-class events, with MPC/HSM custody and administrator integrations.",
          "Engage as a fund stack or as an embedded RWA engine (APIs and SDKs), not as a one-size protocol pitch.",
          "Leave runbooks: monitoring, investor onboarding, and operational procedures the client keeps after the studio leaves.",
        ],
      },
    ],
  },
  {
    id: "problem-market",
    number: "02",
    title: "RWA tokenization problem and market architecture",
    blocks: [
      {
        type: "p",
        text: "Real-world asset (RWA) tokenization fails in two directions at once. On the market side, sponsors need fractional ownership, faster settlement, and a shared ledger for servicing events — without breaking securities law, transfer-agent duties, or custody policy. On the infrastructure side, general-purpose chains and peer-to-peer networks were not designed for financial custody or regulatory-compliant ownership transfer. The TokenBrickLabs documentation describes classic P2P limits: lookup overhead that is acceptable for file sharing but problematic for real-time settlement; Sybil risk without identity or staking; NAT and bandwidth asymmetry that reduce effective participation. Those constraints become operational when the instrument is a fund share or a fractional property interest.",
      },
      {
        type: "p",
        text: "The commercial failure mode is theater: a ticker without transfer restrictions that match the offering documents; an investor portal without an administrator; a demo contract that does not survive contact with counsel. TokenBrickLabs’s published answer is to encode jurisdiction and identity at the contract layer, and to treat NAV, coupons, and redemptions as protocol and operations events rather than spreadsheet afterthoughts.",
      },
      {
        type: "h3",
        text: "Market architecture (operating layers)",
      },
      {
        type: "p",
        text: "The site does not publish a TAM model. The architecture it implies is a stack of layers that already exist in regulated markets and must remain intact when the ledger moves on-chain:",
      },
      {
        type: "ul",
        items: [
          "Legal wrapper — SPV, fund, or REIT-style vehicle; offering documents; transfer restrictions; fiduciary duties.",
          "Identity and eligibility — KYC/AML, accreditation, jurisdiction, allowlists that match the PPM.",
          "Issuance token — permissioned standard (ERC-3643 / T-REX, ERC-1400, or custom) with on-chain transfer rules.",
          "Custody — MPC and HSM integrations with operational controls, not a hot wallet as the control plane.",
          "Servicing — NAV oracles, coupons, corporate actions, redemptions, documents, and administrator hooks.",
          "Secondary and liquidity — restricted transfers, settlement, oracles, and market infrastructure only after identity rules still hold.",
          "Observation — monitoring, audit trails, risk signals, and runbooks for day-two operations.",
        ],
      },
      {
        type: "p",
        text: "TokenBrickLabs’s studio role is to engineer the on-chain and off-chain rails that sit inside this architecture — not to replace counsel, the transfer agent, or the custodian. The product is sequenced work: structure, issue, operate.",
      },
    ],
  },
  {
    id: "platform-architecture",
    number: "03",
    title: "Platform and technical architecture",
    blocks: [
      {
        type: "p",
        text: "The production stack has three coupled planes. The protocol plane holds permissioned tokens, identity hooks, upgrade paths, pause and admin controls, and lifecycle events. The platform plane holds APIs, reconciliation, KYC and payment orchestration, documents, and state that must match the chain. The product plane holds issuer consoles, investor portals, and (where required) mobile surfaces for discovery, portfolio, KYC, and distributions.",
      },
      {
        type: "p",
        text: "A representative issuance on the homepage is a permissioned Class A office in Seattle: ERC-3643 / T-REX, EVM settlement with MPC custody, KYC and accreditation, and corporate actions expressed as NAV and coupons. Settlement is described as multi-chain on EVM and Solana for the embedded engine. Smart-contract work is specified in Solidity, with Move and Rust in assurance and L1/L2 engineering. Indexing and reads use The Graph or equivalent custom indexers. Oracles (including Chainlink-class feeds) support NAV and servicing events.",
      },
      {
        type: "h3",
        text: "Reference planes",
      },
      {
        type: "ul",
        items: [
          "Protocol — ERC-3643 / T-REX or ERC-1400 token; identity registry; compliance modules; upgradeability; multisig and timelock operations.",
          "Identity — on-chain identity, accreditation checks, jurisdiction-aware whitelists, transfer restriction modules.",
          "Custody and keys — MPC / HSM partner integrations; operational controls; no improvised bridge trust.",
          "Servicing — NAV updates, coupons, corporate actions, redemptions as contract and API events.",
          "Platform APIs — REST (and GraphQL where indexed analytics require it) for issuance and settlement; TypeScript and Rust SDKs.",
          "Product — investor and issuer web; optional mobile; wallet flows (Ethers.js / viem / WalletConnect) only where the offering allows self-custody UX.",
          "Control environment — CI, tests, monitoring, audit logs, runbooks; independent audit path when risk warrants it.",
        ],
      },
      {
        type: "p",
        text: "L1/L2 engineering is offered where throughput or app-chain isolation is required: rollups and app-chains (including OP Stack, Arbitrum Orbit, Cosmos SDK, Polygon CDK in the services catalog) and conservative bridge design. TokenBrickLabs’s published bias is not to invent a new trust assumption for a single issuance. Chain selection is an architecture decision in the Discover/Architect phases, not a slogan.",
      },
      {
        type: "p",
        text: "Developer-facing surfaces for operators include REST APIs for issuance and settlement events, TypeScript and Rust SDKs, and pluggable KYC and transfer restrictions. The technical papers additionally describe a longer-range toolkit (BTL.js, OpenAPI REST gateway, WebSocket streams, GraphQL subgraph). Until those interfaces are contracted in an engagement, they should be read as protocol-research direction plus studio SDK practice, not as a public SLA.",
      },
    ],
  },
  {
    id: "token-standards",
    number: "04",
    title: "ERC-3643 / T-REX and ERC-1400",
    blocks: [
      {
        type: "p",
        text: "Homepage and services copy name ERC-3643 / T-REX and ERC-1400 as the permissioned standards TokenBrickLabs implements. Both exist because vanilla ERC-20 (and even ERC-721 / ERC-1155 for property-style units) does not encode who may hold, who may receive, or which jurisdictions are eligible. RWA issuance that ignores this gap pushes compliance into a PDF and hopes the chain never violates it.",
      },
      {
        type: "h3",
        text: "ERC-3643 / T-REX",
      },
      {
        type: "p",
        text: "ERC-3643 (T-REX — Token for Regulated EXchanges) is a permissioned token architecture: an identity registry, claim issuers, a compliance contract, and a token that refuses transfers that fail on-chain rules. TokenBrickLabs’s published use is jurisdictional transfer rules, investor permissions, and issuance that maps to real jurisdictions. Typical modules in a T-REX-style deployment include country restrictions, max-holder or max-balance rules, and time or lockup constraints — always derived from the offering, not from a generic template.",
      },
      {
        type: "h3",
        text: "ERC-1400",
      },
      {
        type: "p",
        text: "ERC-1400 is a security-token framework with partitions (tranches), forced transfers for corporate actions or court orders, and document linkage. It is cited on the TokenBrickLabs site as a complementary standard where the instrument needs tranche logic or transfer-agent-style overrides that ERC-20 cannot express. Selection between ERC-3643, ERC-1400, and a custom permissioned standard is an Architect-phase decision: it depends on the PPM, the transfer agent, and the administrator, not on fashion.",
      },
      {
        type: "h3",
        text: "Implementation posture",
      },
      {
        type: "ul",
        items: [
          "Transfer rules are specified in writing with counsel before they are coded.",
          "Identity claims are issued by named claim issuers; the token does not ‘know’ a person, it knows attested claims.",
          "Upgradeability, pause, and admin are explicit operational procedures (multisig, timelock), not hidden owner keys.",
          "Tests include failing transfers: ineligible investor, wrong jurisdiction, lockup, frozen account — not only happy-path mint and transfer.",
        ],
      },
    ],
  },
  {
    id: "identity-kyc",
    number: "05",
    title: "Identity, KYC, accreditation and transfer controls",
    blocks: [
      {
        type: "p",
        text: "The working surface published on the site lists identity first: accreditation, KYC, and allowlists that match the PPM. On-chain identity, transfer restrictions, and ERC-3643 / T-REX implementations are a named service line. Without this layer, a permissioned token is an expensive ERC-20.",
      },
      {
        type: "p",
        text: "The control loop is: (1) off-chain KYC/AML and accreditation against the offering’s investor categories; (2) issuance of on-chain identity claims by a claim issuer the contracts trust; (3) transfer checks that read those claims plus jurisdiction and lockup modules; (4) ongoing refresh, freeze, and revocation when eligibility changes. TokenBrickLabs’s platform engineering copy includes KYC/AML integrations and workflow systems issuers can run after launch. Pluggable KYC is a feature of the embedded RWA engine so operators are not forced onto a single vendor.",
      },
      {
        type: "ul",
        items: [
          "Eligibility is a property of the offering, not of the chain: US accredited, non-US professional, or other categories as counsel defines.",
          "Allowlists and identity registries must be operable by the administrator, not only by the original developer.",
          "Failed transfers should produce an auditable reason (ineligible, blocked country, exceeded cap), not a generic revert.",
          "Wallet UX (signatures, WalletConnect) is subordinated to identity: a connected wallet that is not claimed is not an investor.",
        ],
      },
      {
        type: "p",
        text: "TokenBrickLabs does not, on the public site, claim to be a licensed KYC provider or a transfer agent. The studio implements rails that map to those parties. Diligence of the KYC vendor, the claim-issuer key ceremony, and the freeze playbook is part of Architect and Launch — see Section 16.",
      },
    ],
  },
  {
    id: "custody-settlement",
    number: "06",
    title: "Custody, MPC/HSM and settlement",
    blocks: [
      {
        type: "p",
        text: "Custody is the second working-surface pillar: MPC / HSM partners with operational controls. Homepage settlement for the Seattle office example is EVM plus custody MPC. Services list institutional custody via MPC and HSM integrations (Fireblocks is named in the RWA tokenization technology list). The point is operational: who can sign, under what policy, with what audit trail — not ‘the keys are on a laptop.’",
      },
      {
        type: "p",
        text: "Multi-party computation (MPC) splits signing so no single device holds a raw private key. Hardware security modules (HSMs) hold keys in tamper-resistant hardware. TokenBrickLabs’s role is integration and control design: policy engines, role separation (issuer ops vs. protocol admin vs. emergency pause), and reconciliation between custodian state and contract state. Conservative bridge design is explicit: the studio will not improvise trust assumptions to move an issuance across chains.",
      },
      {
        type: "ul",
        items: [
          "Settlement assets and gas assets are specified; mixed-custody (investor self-custody vs. nominee) is an offering decision.",
          "Admin keys for the token (pause, upgrade, compliance module) are not the same keys as investor assets.",
          "MPC/HSM policies must encode the same four-eyes rules operations already use for wire transfers.",
          "Solana and EVM settlement in the embedded engine means chain-specific custody adapters, not a single ‘universal’ wallet story.",
        ],
      },
      {
        type: "p",
        text: "Launch & operate includes monitoring and the runbooks the client keeps. Custody incidents (lost signer, vendor outage, policy misconfiguration) are in that runbook set. They are not solved by a clever contract.",
      },
    ],
  },
  {
    id: "nav-lifecycle",
    number: "07",
    title: "NAV, coupons, redemptions and corporate actions",
    blocks: [
      {
        type: "p",
        text: "Servicing is the third working-surface pillar: coupons, NAV, and redemptions as first-class events. The issuance path on the homepage is Structure → Issue → Operate, where Operate is NAV, coupons, and secondary transfers. Fund-stack copy adds automated NAV, coupons, and corporate actions plus custodian and fund-admin integrations. Protocol engineering job descriptions name lifecycle events (NAV, coupons, redemptions) that operations teams can actually run.",
      },
      {
        type: "p",
        text: "NAV is an off-chain fact (administrator, appraisal, fund accounting) that must become an on-chain input without turning the oracle into a hidden administrator. TokenBrickLabs’s architecture work is: who may publish NAV, at what cadence, with what dispute or delay window, and which contract actions (fees, performance, subscriptions) consume it. Coupons and distributions are payment events — fiat or stablecoin rails are in the backend developer scope — reconciled to holder lists that already passed transfer rules.",
      },
      {
        type: "ul",
        items: [
          "NAV publication is a named role (oracle / administrator), not an anonymous keeper.",
          "Coupon and distribution payments must be idempotent and reconcilable against the cap table at a block (or snapshot) height.",
          "Redemptions are a lifecycle, not a burn button: eligibility, notice, NAV, cash or in-kind, and token retirement or lock.",
          "Corporate actions (splits, forced transfers, document updates) use the hooks the token standard provides (for example ERC-1400 partitions or T-REX compliance modules).",
          "Secondary transfers remain subject to the same identity rules as primary issuance.",
        ],
      },
      {
        type: "p",
        text: "If servicing is not designed in Architect, it will be reinvented in a spreadsheet after launch. That is the failure mode this section exists to prevent.",
      },
    ],
  },
  {
    id: "asset-classes",
    number: "08",
    title: "Six major asset-class applications",
    blocks: [
      {
        type: "p",
        text: "Industries on the site are chosen where on-chain rails change settlement, not branding — identity, jurisdiction, and servicing already exist. Six classes are named. Real estate is the starting focus of the company page; the others share the same control pattern with different servicing data.",
      },
      {
        type: "h3",
        text: "Real estate",
      },
      {
        type: "p",
        text: "Fractional property, SPVs, and REIT-style vehicles with transfer restrictions that match the offering. Technical papers describe BTL tokens as 1:1 collateralized by special purpose vehicles holding verified real estate. The Class A office example is the product illustration: permissioned token, KYC, MPC custody, NAV and coupons. SPV documents, appraisal, and property-level servicing are off-chain facts the stack must not contradict.",
      },
      {
        type: "h3",
        text: "Private credit",
      },
      {
        type: "p",
        text: "Loans, receivables, and structured credit with servicing events on a shared ledger. Coupons, default, extension, and recovery are lifecycle events. Identity still gates who may hold the credit token; the administrator still owns the credit file.",
      },
      {
        type: "h3",
        text: "Commodities",
      },
      {
        type: "p",
        text: "Allocated metals and inventory-backed tokens with custody attestations. The chain records claims against allocated inventory; vault or warehouse attestation is the analog of real-estate SPV backing. Transfer restrictions may encode eligible counterparties rather than retail accreditation.",
      },
      {
        type: "h3",
        text: "Climate and ESG",
      },
      {
        type: "p",
        text: "Carbon and environmental instruments that need audit trails, not just a ticker. Issuance without a verifiable project and retirement trail is branding. TokenBrickLabs’s claim is the audit trail and identity of who may retire or transfer, not a climate methodology of its own.",
      },
      {
        type: "h3",
        text: "Agri-finance",
      },
      {
        type: "p",
        text: "Seasonal, crop-backed instruments with clear redemption and warehouse data. Seasonality makes redemption calendars and warehouse receipts first-class. Identity and transfer rules still apply; the distinguishing data is warehouse and harvest, not NAV of a perpetual fund.",
      },
      {
        type: "h3",
        text: "Infrastructure",
      },
      {
        type: "p",
        text: "Energy and utility cash-flow tokens with long-dated operations in mind. Tenor and operating counterparties dominate. Upgradeability, admin succession, and runbooks matter more than launch-week UX. The delivery methodology’s Launch & operate phase is the load-bearing phase for this class.",
      },
    ],
  },
  {
    id: "engagement-models",
    number: "09",
    title: "Fund/issuer and platform-operator engagement models",
    blocks: [
      {
        type: "p",
        text: "Clients arrive with a first issuance or with an existing product that needs rails. TokenBrickLabs publishes two models and picks the one that matches how the client already operates.",
      },
      {
        type: "h3",
        text: "Tokenized fund stack — funds and issuers",
      },
      {
        type: "p",
        text: "A regulated issuance path run with the client: contracts, transfer-agent hooks, NAV oracle, and an investor portal operations teams can use. Named elements: ERC-3643 / T-REX with jurisdictional transfer rules; whitelisting, accreditation, and investor identity; automated NAV, coupons, and corporate actions; custodian and fund-admin integrations. Commercial entry is a stack walkthrough (discovery call).",
      },
      {
        type: "h3",
        text: "Embedded RWA engine — platform operators",
      },
      {
        type: "p",
        text: "Issue, transfer, and settle through APIs and SDKs instead of rebuilding compliance, identity, and settlement from scratch. Named elements: REST APIs for issuance and settlement events; TypeScript and Rust SDKs; multi-chain settlement on EVM and Solana; pluggable KYC and transfer restrictions. Technical documentation is the published next read for this model.",
      },
      {
        type: "p",
        text: "Neither model is a substitute for the client’s counsel or licenses. TokenBrickLabs supplies engineering and sequencing. Scope, chain, and vendor choices are Architect deliverables. A thirty-minute discovery call is intended to produce a written sequence, not a vague ‘next step.’",
      },
    ],
  },
  {
    id: "security-assurance",
    number: "10",
    title: "Smart-contract security and assurance",
    blocks: [
      {
        type: "p",
        text: "Smart contract assurance is a homepage service: senior review, fuzzing, and test harnesses for Solidity, Move, and Rust before anything reaches mainnet. Protocol engineering owns invariants, Foundry/Hardhat suites (unit, fuzz, invariant, fork tests), upgrade paths, pause/admin, and preparation for external audits with remediation to close. Careers copy refuses ‘good enough’ in regulated jurisdictions.",
      },
      {
        type: "ul",
        items: [
          "Threat model includes: unauthorized mint or freeze, broken compliance bypass, upgrade to a malicious implementation, oracle manipulation of NAV, admin key compromise, and incorrect snapshot for distributions.",
          "Tests must include forbidden transfers and failed KYC, not only mint-and-transfer.",
          "Fuzzing and invariant tests are specified for protocol work; Slither, Echidna, and similar tools appear as nice-to-have skill, not as a substitute for an independent audit when risk warrants it.",
          "Build & review includes continuous internal review and an independent audit path. Launch does not skip this because of calendar pressure.",
          "Multisig, timelock, and documented operational procedures are part of assurance, not an afterthought.",
        ],
      },
      {
        type: "p",
        text: "Assurance is also organizational: code review, incident response, and documentation are Engineering Manager and Tech Lead responsibilities. TokenBrickLabs does not, on the public site, publish a named third-party auditor for a specific issuance. Engagements that require a named firm should treat auditor selection as an Architect/Build decision (Section 16).",
      },
    ],
  },
  {
    id: "liquidity",
    number: "11",
    title: "Liquidity and secondary-market infrastructure",
    blocks: [
      {
        type: "p",
        text: "Liquidity and market infrastructure is a named service: AMMs, order books, oracles, and settlement layers for tokenized funds that already have investors to serve. Secondary transfers appear in the Operate step of the issuance path. The constraint is identity: a secondary market that bypasses ERC-3643 transfer rules is not a market, it is a compliance incident.",
      },
      {
        type: "p",
        text: "Design implications: any AMM or order book must call the same compliance modules as a primary transfer; liquidity provider roles may themselves be permissioned; oracles used for pricing must not become a back door to revalue NAV outside the administrator process; settlement finality on L2 or a second chain must not drop transfer restrictions. Conservative bridge design from L1/L2 engineering applies here.",
      },
      {
        type: "ul",
        items: [
          "Primary issuance and secondary transfer share one identity and restriction layer.",
          "Market venues are added only after the token’s transfer rules are production-tested.",
          "Investor UX (portals, wallets) must display ineligibility honestly — empty states and failed transfers are part of the control environment.",
        ],
      },
    ],
  },
  {
    id: "analytics-ai",
    number: "12",
    title: "Analytics and AI",
    blocks: [
      {
        type: "p",
        text: "On-chain analytics and AI is a homepage service: risk dashboards, anomaly detection, and agents that act on verifiable chain data — not dashboards that go stale. The AI/ML service line includes RAG and domain assistants, tool-using agents against APIs and contracts, ML pipelines, and on-chain analytics (anomaly detection, risk scoring). Careers copy for Applied Intelligence insists on evaluation, permissions, and auditability; generative features are not ungrounded chat.",
      },
      {
        type: "p",
        text: "In an RWA stack, legitimate uses are: monitoring transfer anomalies against the identity registry; reconciling NAV publications to administrator files; assisting operators with runbooks; ranking or risk signals on public chain data. Illegitimate uses are: replacing KYC, replacing counsel, or letting an agent pause a token without a human control. TokenBrickLabs’s published posture is agents on verifiable data, with retrieval and permissions first.",
      },
      {
        type: "ul",
        items: [
          "Models consume product and chain data through APIs; they do not hold admin keys.",
          "RAG over offering documents and runbooks is permissioned — the same identity rules as the portal.",
          "Stale dashboards are treated as a reliability defect, not a reporting aesthetic.",
        ],
      },
    ],
  },
  {
    id: "delivery",
    number: "13",
    title: "End-to-end delivery methodology",
    blocks: [
      {
        type: "p",
        text: "The published process is four phases, described as a sequence run often enough that surprises stay in the asset, not in the software — from term sheet to mainnet without a six-month archaeology project.",
      },
      {
        type: "h3",
        text: "01 Discover",
      },
      {
        type: "p",
        text: "Asset workshop, regulatory map, and a written tokenization blueprint with owners and constraints. Output is sequencing: what is the instrument, who is eligible, who is the administrator, what must be on-chain versus off-chain. The thirty-minute discovery call is the commercial start of this phase, not a substitute for the written blueprint.",
      },
      {
        type: "h3",
        text: "02 Architect",
      },
      {
        type: "p",
        text: "Contract design, chain selection, identity, custody, and administrator integrations — decided before code hardens. Standard choice (ERC-3643 vs ERC-1400 vs custom), claim issuers, MPC/HSM vendor, oracle roles, and upgrade policy are this phase. Ambiguity left here becomes production risk.",
      },
      {
        type: "h3",
        text: "03 Build & review",
      },
      {
        type: "p",
        text: "Production engineering with continuous internal review and an independent audit path when the risk warrants it. Tests, fuzzing, operator UX, APIs, and portal work proceed against the Architect decisions. Scope cuts must not delete the risk surface (identity, pause, NAV authorship).",
      },
      {
        type: "h3",
        text: "04 Launch & operate",
      },
      {
        type: "p",
        text: "Mainnet deployment, monitoring, investor onboarding, and the operational runbooks the client team keeps after TokenBrickLabs leaves. Day-two is the product. Coupons, NAV, freezes, and incidents are rehearsed, not discovered live.",
      },
    ],
  },
  {
    id: "reference-architecture",
    number: "14",
    title: "Reference operating architecture",
    blocks: [
      {
        type: "p",
        text: "The following reference architecture is a synthesis of the homepage issuance card, engagement models, working surface, and services. It is a diligence map, not a deployment certificate.",
      },
      {
        type: "ul",
        items: [
          "Offering and legal — PPM/subscription; SPV or fund; transfer agent and administrator named; jurisdictions listed.",
          "Identity plane — KYC vendor; accreditation rules; on-chain identity registry and claim issuers; freeze/revoke runbook.",
          "Token plane — ERC-3643 / T-REX or ERC-1400; compliance modules; mint/burn policy; upgrade and pause via multisig/timelock.",
          "Custody plane — MPC/HSM; policy matrix; gas and settlement asset handling; chain adapters (EVM, Solana as required).",
          "Servicing plane — NAV publisher; coupon/redemption workflows; document vault; fund-admin and custodian integrations.",
          "Platform plane — REST APIs; TypeScript/Rust SDKs; reconciliation jobs; PostgreSQL-class systems of record; queues for payments and KYC.",
          "Product plane — issuer console; investor portal; optional mobile; wallet connect only where self-custody is allowed.",
          "Market plane (optional) — permissioned secondary venue or AMM that calls the same transfer rules.",
          "Observation plane — metrics, logs, traces; risk/anomaly jobs; audit export; incident command.",
        ],
      },
      {
        type: "p",
        text: "Broader studio capabilities (web/CMS, e-commerce, Telegram Mini Apps, games, IoT device-to-chain attestation, DevOps) attach at the product or observation plane. They do not replace the token, identity, or custody planes.",
      },
    ],
  },
  {
    id: "protocol-research",
    number: "15",
    title: "Protocol/consensus research direction",
    blocks: [
      {
        type: "p",
        text: "TokenBrickLabs publishes a six-chapter technical whitepaper (Docs): Challenges, Vision, Technology Foundations, New Kind of Network, Cellular Automata Powered Consensus, and Conclusions. That series is the protocol-research source. This company paper does not reproduce the mathematics in full.",
      },
      {
        type: "p",
        text: "Direction in brief: replace wasteful proof-of-work grinding with Proof-of-Relay — rewards for forwarding packets, uptime SLAs, and serving routing queries. Networking is a first-class pillar (geographic-aware routing, QoS, Sybil-resistant identity). Cellular Automata provide a local majority-vote rule intended to reach global consensus in O(log N) rounds on random regular graphs. Validator weight combines verified relay contributions, VRF-randomized neighborhoods, and stake. Sybil and eclipse mitigation uses VRF neighbor reshuffling each epoch. The stated decentralization target is a Nakamoto Coefficient of at least 100 across block production, relays, oracles, and governance.",
      },
      {
        type: "p",
        text: "Vision chapters also name a governance DAO, a compliance layer at the contract, SPV-backed BTL tokens, and a developer toolkit (BTL.js, REST gateway, WebSockets, GraphQL). Readers should treat these as protocol papers — current thinking that may change — unless an engagement contract specifies them as deliverables. Production issuances described on the marketing site use EVM permissioned tokens and institutional custody; they do not require the CA network to be live to be operable.",
      },
      {
        type: "p",
        text: "Engineering hiring (Protocol Engineer, Blockchain Architect, Blockchain Developer) is how the studio staffs both production ERC-3643 work and this research direction. They are related, not identical, workstreams.",
      },
    ],
  },
  {
    id: "diligence-risk",
    number: "16",
    title: "Implementation, diligence and risk framework",
    blocks: [
      {
        type: "p",
        text: "The following checklist is how a sponsor, counsel, or engineering lead should read a TokenBrickLabs engagement against this paper and the public site. It is a framework, not a legal opinion.",
      },
      {
        type: "h3",
        text: "Implementation",
      },
      {
        type: "ul",
        items: [
          "Written blueprint from Discover with named owners for legal, identity, custody, admin, and engineering.",
          "Standard selected (ERC-3643 / T-REX, ERC-1400, or custom) with transfer-rule matrix traceable to the PPM.",
          "Chain and custody vendors selected; no undocumented bridges.",
          "Test evidence: forbidden transfers, upgrade rehearsal, NAV publication rehearsal, pause rehearsal.",
          "Independent audit decision recorded (proceed / defer) with rationale.",
          "Runbooks delivered at Launch: freeze, coupon, redemption, incident, key ceremony.",
        ],
      },
      {
        type: "h3",
        text: "Diligence questions",
      },
      {
        type: "ul",
        items: [
          "Who is the claim issuer and how are KYC vendors replaced?",
          "Who signs admin and upgrade, and under what MPC/HSM policy?",
          "Who publishes NAV, and what happens if they are late or disputed?",
          "Does any secondary venue bypass transfer restrictions?",
          "What remains operable if TokenBrickLabs is not on the incident call?",
          "Which protocol-paper features are in scope versus research-only?",
        ],
      },
      {
        type: "h3",
        text: "Risk register (non-exhaustive)",
      },
      {
        type: "ul",
        items: [
          "Legal — token classified incorrectly; transfer rules diverge from the PPM; unlicensed activity in a jurisdiction.",
          "Identity — stale KYC; claim-issuer key compromise; allowlist operated as a spreadsheet off-chain only.",
          "Technical — compliance bypass; upgrade exploit; oracle manipulation; bridge trust.",
          "Operational — admin bus factor; custodian outage; missing runbooks; calendar pressure skipping audit.",
          "Market — secondary liquidity that violates restrictions; investor UX that implies unrestricted transfer.",
          "Research — treating CA consensus or BTL SPV language as a live guarantee without a contracted deployment.",
        ],
      },
    ],
  },
  {
    id: "conclusion-sources",
    number: "17",
    title: "Conclusion and source/verification notes",
    blocks: [
      {
        type: "p",
        text: "TokenBrickLabs’s public position is consistent across the site: production rails for real-world assets, starting with real estate, using permissioned standards, identity, MPC/HSM custody, and servicing events that operations can run. Engagement is either a fund issuance stack or an embedded engine. Delivery is Discover → Architect → Build & review → Launch & operate. Protocol research (Cellular Automata, Proof-of-Relay, SPV-backed BTL) is documented separately and must be scoped explicitly if it is part of an engagement.",
      },
      {
        type: "p",
        text: "The next commercial step published by the company is a thirty-minute discovery call. Bring the asset class, jurisdiction, and the constraint that is blocking issuance. Leave with a written sequence.",
      },
      {
        type: "h3",
        text: "Sources used for this paper",
      },
      {
        type: "p",
        text: "All factual claims about TokenBrickLabs in this document are taken from the official website content as of September 2026 (this repository’s public pages). Verification means: open the cited surface and confirm the sentence still matches. URLs assume the production or local site root.",
      },
      {
        type: "ul",
        items: [
          "Home / Hero — institutional RWA positioning; Structure / Issue / Operate; Class A office issuance card (ERC-3643 / T-REX, EVM + MPC, KYC, NAV/coupons); standards ERC-3643 · ERC-1400.",
          "Services — RWA tokenization, smart-contract assurance, L1/L2, compliance and identity, liquidity infra, on-chain analytics and AI; plus catalog pages for mobile, web, e-commerce, Telegram, games, IoT, DevOps.",
          "Engagement models — Tokenized fund stack; Embedded RWA engine (REST, TypeScript/Rust SDKs, EVM and Solana, pluggable KYC).",
          "Industries — real estate, private credit, commodities, climate & ESG, agri-finance, infrastructure.",
          "Process — Discover, Architect, Build & review, Launch & operate.",
          "Proof / working surface — identity, custody, servicing.",
          "Company — founded 2025; Seattle HQ; 1208 2nd Avenue, Seattle, WA 98101;support@tokenbricklabs.com; CEO, CTO, Tech Lead.",
          "Careers — global remote hiring; protocol, platform, product, DevRel, Tech Lead, Engineering Manager.",
          "Docs (technical whitepaper v1.0, 2026) — Challenges, Vision (DAO, compliance layer, SPV backing, BTL.js toolkit), Technology Foundations (CA), New Kind of Network (Proof-of-Relay, Nakamoto Coefficient ≥ 100), Consensus, Conclusions.",
          "Legal pages — documentation and protocol papers describe current thinking and may change.",
        ],
      },
      {
        type: "h3",
        text: "What this paper does not verify",
      },
      {
        type: "ul",
        items: [
          "Live mainnet addresses, TVL, or named client issuances (not published on the cited pages).",
          "License, registration, or audit-firm identities (not published).",
          "Market-size statistics (not published; none are invented here).",
          "That Cellular Automata consensus is in production for a given issuance (research docs, unless contracted).",
        ],
      },
      {
        type: "p",
        text: "Document control: TokenBrickLabs Company White Paper, version 2.0, September 2026, 20-page company paper. Classification: public narrative for sponsors, counsel, and engineering leads. Not legal, tax, or investment advice. Not an offer to sell securities. Technical details in Docs supersede this paper where they conflict on protocol mathematics; this paper supersedes marketing fragments where it restates operating architecture.",
      },
    ],
  },
];

export const WHITEPAPER_NOTICE =
  "This document summarizes TokenBrickLabs as described on the official website (company, services, careers, and technical docs). It is not an offer to sell securities, not legal or investment advice, and not a substitute for a private placement memorandum, audit report, or counsel. Technical papers describe current thinking and may change.";
