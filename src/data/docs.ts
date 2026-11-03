import {
  BookMarked,
  BookOpen,
  Brain,
  Compass,
  Flag,
  Landmark,
  Library,
  Network,
  Route,
  Scale,
  Shield,
  Workflow,
  type LucideIcon,
} from "lucide-react";

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

export const WHITEPAPER = {
  title: "Real-World Asset Tokenisation",
  edition: "Public Information Edition",
  version: "1.1",
  date: "2 November 2026",
  audience: "A strategic perspective for asset owners, institutional investors and ecosystem partners",
  status: "General informational publication; not an offer, prospectus or regulated issuance document",
} as const;

export const DOCS: DocChapter[] = [
  {
    slug: "executive-summary",
    number: "00",
    title: "Executive Summary",
    tagline: "A strategic perspective on the infrastructure required to connect real-world assets with digital financial markets.",
    icon: BookOpen,
    intro:
      "The financial system is entering a period in which distributed ledger technology, programmable assets and digital settlement infrastructure may change how ownership rights are recorded, administered, transferred and financed. Real-world asset (RWA) tokenisation is one expression of this shift: it involves representing defined rights or claims associated with an asset through digital tokens recorded on a programmable ledger.",
    sections: [
      {
        heading: "What a token is, and what it is not",
        body: [
          "The opportunity is significant, but the concept is frequently overstated. A token is not, by itself, a legal title deed. Its meaning depends on the legal structure, governing documentation, applicable law, custody arrangements and the rights actually granted to the holder. Nor does tokenisation automatically make an asset liquid, reduce its risk or remove the need for trusted institutions.",
          "When designed carefully, tokenisation may improve the efficiency and transparency of asset administration, enable fractional economic participation, support more automated workflows and make certain assets easier to integrate with digital financial infrastructure. These benefits depend on reliable data, legally enforceable rights, secure technology, appropriate investor protections and viable markets.",
        ],
      },
      {
        heading: "Five connected pillars",
        body: [
          "TokenBrick Labs' strategic vision is organised around five connected pillars. Together, these pillars describe a proposed long-term ecosystem rather than a claim that every component is currently operational. Their strategic value lies in the relationships between them: infrastructure supports issuance and administration; analytics and intelligence support decision-making; DeFi integration can connect eligible assets to selected on-chain financial applications; and markets can support discovery and transfer where legal and commercial conditions permit.",
        ],
        bullets: [
          "Analytics — a target capability for organising and presenting asset, transaction, portfolio and market information. Potential applications include reporting, activity monitoring and performance measurement; no specific product availability or delivery commitment is asserted.",
          "Intelligence — a target capability for applying advanced analytics and AI to support insight, risk identification and informed human decision-making. Any future use would require appropriate data quality, validation, governance, explainability and human oversight.",
          "Infrastructure — the technical and operational foundation required to support token issuance, smart-contract functions, asset administration, compliance workflows and integrations. This whitepaper does not make component-level claims about development or commercial availability.",
          "DeFi Integration — a long-term target capability for selective, permission-aware connections between eligible tokenised assets and digital financial applications. No current functionality or availability is represented.",
          "Markets — a long-term target capability for asset discovery and, where legally and commercially permitted, primary distribution or secondary transfer. No current marketplace, trading service or liquidity is represented.",
        ],
      },
      {
        heading: "Central thesis",
        body: [
          "The central thesis of this whitepaper is that successful RWA tokenisation requires more than issuing a token. It requires an integrated framework connecting legal rights, asset integrity, technology, data, compliance, administration and functioning markets. This publication is a general strategic paper, not an issuance document or an invitation to invest in any asset, token or product.",
        ],
      },
    ],
  },
  {
    slug: "introduction",
    number: "01",
    title: "Introduction: The Evolution of Asset Ownership",
    tagline: "Ownership has always depended on systems that establish, record and transfer rights.",
    icon: Landmark,
    intro:
      "Historically, those systems relied on paper instruments, registries, custodians, banks, transfer agents and other intermediaries. Electronic records improved speed and accessibility, while networked financial infrastructure enabled increasingly connected markets.",
    sections: [
      {
        heading: "1.1 From paper records to programmable assets",
        body: [
          "Yet many asset processes remain fragmented across institutions, databases, jurisdictions and service providers. Distributed ledger technology introduces a different way to maintain and synchronise records among multiple participants. Smart contracts can encode defined rules and automate certain actions. Tokenisation combines these capabilities by representing specified asset-related rights in digital form.",
        ],
      },
      {
        heading: "1.2 The convergence of traditional and decentralised finance",
        body: [
          "Traditional financial institutions contribute legal structures, governance, custody, compliance and investor protections. Decentralised finance contributes programmable protocols, open technical standards and composable digital applications. Tokenised assets may connect elements of these environments, but the connection is not automatic. Permissioning, investor eligibility, jurisdictional restrictions, custody, data integrity and protocol risk must be addressed.",
        ],
      },
      {
        heading: "1.3 Why the issue matters now",
        body: [
          "Institutional experimentation, evolving regulatory frameworks, improvements in blockchain infrastructure and the growth of digital settlement assets have increased interest in tokenised financial and non-financial assets. The practical question is no longer simply whether an asset can be represented as a token. It is whether the resulting structure delivers a meaningful economic or operational improvement while preserving enforceable rights and appropriate controls.",
        ],
      },
      {
        heading: "Core principle",
        body: [
          "The transition to tokenised markets is a coordinated legal, institutional, technological and operational change — not merely a change in the format of an ownership record.",
        ],
      },
    ],
  },
  {
    slug: "understanding-rwa",
    number: "02",
    title: "Understanding Real-World Asset Tokenisation",
    tagline: "A token's legal and economic meaning is determined by its governing structure and documentation.",
    icon: Scale,
    intro:
      "RWA tokenisation is the process of creating digital tokens on a distributed ledger that represent specified rights, interests or claims associated with an underlying real-world asset or financial asset.",
    sections: [
      {
        heading: "2.1 Definition",
        body: [
          "RWA tokenisation is the process of creating digital tokens on a distributed ledger that represent specified rights, interests or claims associated with an underlying real-world asset or financial asset. The token's legal and economic meaning is determined by its governing structure and documentation. [1]",
        ],
      },
      {
        heading: "2.2 Asset classes",
        body: [
          "Potential asset classes include real estate, commodities, government and corporate securities, private credit, loans, infrastructure interests, funds and selected alternative assets such as art or collectibles. Each class has distinct ownership, valuation, custody, transfer, disclosure and regulatory requirements. The suitability of tokenisation must therefore be assessed asset by asset.",
        ],
      },
      {
        heading: "2.3 What does a token represent?",
        body: [
          "A token may represent direct ownership where the applicable legal system and registry arrangements support it; shares or other interests in a special-purpose vehicle (SPV); a contractual claim; a beneficial or economic interest; or exposure to an asset through a regulated investment structure. These models are not interchangeable. The governing documents must specify the holder's rights, restrictions, remedies and relationship to the underlying asset.",
          "For example, a commercial property could be held by an SPV, with tokens representing shares or defined contractual interests in that SPV. A holder would then hold the rights attached to those interests — not necessarily direct title to a physical fraction of the building.",
        ],
      },
      {
        heading: "2.4 Illustrative fractionalisation example",
        body: [
          "Assume a hypothetical property valued at €10 million is placed into a legally structured vehicle. The issuer creates 100,000 tokens, each corresponding to a defined €100 unit of the issued interests. An investor subscribing for €5,000 would receive 50 tokens, or 0.05% of the total issued interests. This arithmetic does not establish that the investor owns 0.05% of the real estate itself; the legal documents determine the actual rights.",
        ],
      },
      {
        heading: "2.5 The role of blockchain and smart contracts",
        body: [
          "A blockchain can maintain a shared transaction history and support token transfer under programmed rules. Smart contracts may automate issuance, transfer restrictions, distributions or other functions. Oracles and trusted data providers may be needed to bring off-chain information — such as valuations, rental income, insurance status or commodity prices — into digital workflows. An oracle can transmit information, but it cannot independently guarantee that the information is true. [1, 2]",
        ],
      },
      {
        heading: "2.6 Standards and interoperability",
        body: [
          "Token standards can improve consistency between wallets, applications and infrastructure providers. Permissioned token standards, including ERC-3643, provide mechanisms for identity-linked eligibility and transfer controls. A standard is a technical framework, not a substitute for legal analysis, regulatory authorisation, due diligence or ongoing compliance. [3]",
          "The defining challenge is to connect the digital token reliably to the legal rights, underlying asset and operational processes it is intended to represent.",
        ],
      },
    ],
  },
  {
    slug: "economic-case",
    number: "03",
    title: "The Economic and Financial Case",
    tagline: "Evaluate tokenisation across the whole asset lifecycle, not a single cheaper step.",
    icon: Compass,
    intro:
      "The economic case for tokenisation should be evaluated across the asset lifecycle: origination, structuring, issuance, distribution, administration, transfer, financing and exit.",
    sections: [
      {
        heading: "3.1 Evaluate the whole lifecycle",
        body: [
          "A lower-cost or faster transaction at one stage may be offset by legal structuring, technology, custody, compliance, integration or ongoing administration costs elsewhere. [1, 4]",
        ],
      },
      {
        heading: "3.2 Potential sources of value",
        body: ["Potential sources of value include the following."],
        bullets: [
          "Capital formation and fractional participation: smaller denominations may broaden the pool of eligible investors, subject to applicable securities and distribution rules.",
          "Operational efficiency: shared records and automation may reduce reconciliation, manual processing and duplicated data entry.",
          "Settlement and collateral mobility: programmable workflows may support more coordinated delivery-versus-payment and collateral processes where the relevant institutions and settlement assets are connected.",
          "Transparency and auditability: on-chain transaction histories can improve traceability, while asset-level information still depends on reliable off-chain reporting and verification.",
          "Market access: digital distribution and transfer infrastructure may make selected assets easier to discover and administer across investor groups and jurisdictions.",
          "Composability: eligible tokens may be integrated with other digital financial services, subject to legal recognition, protocol support and risk controls.",
        ],
      },
      {
        heading: "3.3 Transferability is not liquidity",
        body: [
          "A token may be technically transferable without there being an active market for it. Liquidity depends on investor demand, market depth, reliable valuation, price discovery, market-making, legal transferability, settlement arrangements and confidence in the underlying asset. Tokenisation can reduce some frictions, but it cannot manufacture demand or eliminate the illiquidity of an underlying asset. [2, 5]",
        ],
      },
      {
        heading: "3.4 Costs and operating economics",
        body: [
          "A credible business case should compare the total cost of a tokenised structure with the existing alternative. Relevant costs include legal and tax structuring, valuation, technology development, smart-contract audits, custody, cybersecurity, identity and compliance services, data feeds, investor servicing, market operations and regulatory reporting. The analysis should include ongoing costs, not only issuance costs. [1, 4]",
        ],
      },
      {
        heading: "3.5 A practical evaluation framework",
        body: [
          "Tokenisation should be pursued where the combined benefits are material, measurable and proportionate to the added complexity and risk.",
        ],
        bullets: [
          "Capital efficiency and financing cost",
          "Operational efficiency and process quality",
          "Investor access and suitability",
          "Liquidity, market depth and exit options",
          "Information quality, transparency and auditability",
          "Total cost of ownership and long-term economic viability",
        ],
      },
    ],
  },
  {
    slug: "lifecycle",
    number: "04",
    title: "The Tokenisation Lifecycle",
    tagline: "A managed sequence from suitability through exit. Steps may be combined, repeated or reordered.",
    icon: Route,
    intro:
      "A tokenised asset requires a managed lifecycle. The following sequence is a practical framework; individual transactions may combine, repeat or reorder steps depending on asset class, jurisdiction and legal structure. [1, 2]",
    sections: [
      {
        heading: "Lifecycle stages",
        body: ["Assess, verify, structure, safeguard, issue, onboard, service, transfer, and exit."],
        bullets: [
          "1. Asset identification and suitability: Define the asset, ownership status, cash flows, jurisdiction, investor proposition and reason tokenisation may add value.",
          "2. Due diligence, verification and valuation: Verify title or rights, liabilities, encumbrances, condition, financial information, counterparties and valuation assumptions.",
          "3. Legal structuring and rights definition: Select the legal vehicle and instrument; document holder rights, governance, transfer restrictions, distributions, remedies and exit arrangements.",
          "4. Custody and asset administration: Establish safeguards for the underlying asset and the digital tokens or keys; define insurance, servicing, recordkeeping and reconciliation.",
          "5. Token design and issuance: Choose appropriate ledger infrastructure and token standards; develop, test and audit smart contracts; establish issuance controls and records.",
          "6. Investor onboarding and primary distribution: Apply identity checks, AML and sanctions controls, eligibility rules, disclosures, subscription and allocation processes.",
          "7. Ongoing administration and investor servicing: Monitor the asset, maintain records, calculate and distribute cash flows, report material events and administer governance.",
          "8. Secondary transfers and trading: Enable only legally permitted transfers through approved channels, with reliable ownership records, pricing information and settlement controls.",
          "9. Redemption, maturity or liquidation: Execute the documented exit process, distribute proceeds, cancel or burn tokens where appropriate and reconcile final records.",
        ],
      },
      {
        heading: "4.1 Illustrative case study",
        body: [
          "Consider a hypothetical €25 million office property held through an SPV. The issuer considers issuing 250,000 tokens at an indicative €100 per token. The structure would need to define the rights represented by each token, the treatment of rental income, expenses, reserves, voting, refinancing, sale proceeds, transfer restrictions and investor exit rights. The example is illustrative only; it is not a TokenBrick Labs transaction, offer or representation of an available investment.",
        ],
      },
      {
        heading: "4.2 Critical success factors",
        body: [
          "Legal certainty, asset integrity, independent valuation, robust custody, secure technology, compliance, accurate data, professional administration, credible distribution and realistic exit arrangements are mutually reinforcing. Weakness in any one area can undermine the whole structure.",
        ],
      },
    ],
  },
  {
    slug: "infrastructure",
    number: "05",
    title: "Blockchain Infrastructure and Interoperability",
    tagline: "Architectural options and evaluation criteria, not a selected chain or protocol.",
    icon: Network,
    intro:
      "RWA platforms may use public, private or permissioned distributed ledgers, or hybrid architectures. The appropriate design depends on asset type, privacy requirements, regulatory obligations, performance needs, cost, ecosystem support and operational resilience.",
    sections: [
      {
        heading: "5.1 Infrastructure choices",
        body: [
          "Public networks offer broad connectivity and transparent settlement histories; permissioned networks can provide controlled participation and tailored governance. [1, 6]",
        ],
      },
      {
        heading: "5.2 Consensus, smart contracts and execution layers",
        body: [
          "Consensus mechanisms allow network participants to agree on ledger state. Smart contracts execute defined rules, while wallets and key-management systems authorise transactions. Layer 2 networks and other scaling approaches may improve throughput or cost profiles, but introduce additional assumptions about security, data availability, bridges and operational dependencies.",
        ],
      },
      {
        heading: "5.3 Interoperability",
        body: [
          "Interoperability includes the ability to move or represent assets across networks, connect identity and compliance services, exchange data with registries and custodians, and settle transactions across financial institutions. Cross-chain bridges can introduce material security and governance risks. A token's appearance on multiple networks must not create conflicting ownership records or double-counted claims. [2, 5]",
        ],
      },
      {
        heading: "5.4 Design principles",
        body: ["Design principles for infrastructure choices:"],
        bullets: [
          "Use standards where they provide demonstrable interoperability and control benefits.",
          "Keep legal ownership records and token records synchronised through documented reconciliation procedures.",
          "Design for upgrade governance, incident response and business continuity.",
          "Assess third-party, bridge, oracle, wallet and infrastructure dependencies.",
          "Avoid selecting a chain or protocol before requirements and operating constraints are understood.",
        ],
      },
      {
        heading: "TokenBrick Labs positioning",
        body: [
          "This chapter describes architectural options and evaluation criteria. It does not imply that TokenBrick Labs has selected a specific blockchain, token standard, custody provider or cross-chain protocol.",
        ],
      },
    ],
  },
  {
    slug: "security-custody-compliance",
    number: "06",
    title: "Security, Custody, Compliance and Risk Management",
    tagline: "Security is a property of the whole system, and risk management continues after issuance.",
    icon: Shield,
    intro:
      "Security depends on the combined design of smart contracts, wallets, private-key management, network infrastructure, identity systems, data providers, custody, operational procedures and governance.",
    sections: [
      {
        heading: "6.1 Security is a system property",
        body: [
          "A smart-contract audit can identify certain classes of defects; it cannot guarantee that a system is secure or that every operational and legal risk has been addressed. [2, 5]",
        ],
      },
      {
        heading: "6.2 Two distinct custody questions",
        body: [
          "The custody of the underlying asset and the custody or control of the digital token are separate matters. A property may be held by an SPV and administered by professional agents, while tokens are held in investor wallets or safeguarded by a digital-asset custodian. Both arrangements require clear responsibilities, controls, records, recovery procedures and oversight.",
        ],
      },
      {
        heading: "6.3 Compliance by design",
        body: [
          "Depending on the asset, instrument, jurisdiction and activity, relevant obligations may include securities or investment-services regulation, prospectus and disclosure requirements, AML and counter-terrorist financing controls, sanctions screening, investor eligibility, data protection, marketing restrictions, custody rules and reporting. Token standards can support controls but do not determine the legal classification of an instrument or authorise a business to conduct regulated activities. [2, 7, 8]",
          "Regulatory examples require careful scope. In the United States, the GENIUS Act (Public Law 119-27), enacted on 18 July 2025, establishes a federal framework for payment stablecoins; it is not a general RWA-tokenisation statute. On 21 October 2026, the Office of the Comptroller of the Currency issued a final rule implementing the Act for entities within its jurisdiction, with an effective date of 18 January 2027. The Senate did not invoke cloture on the motion to proceed to H.R. 3633, the Digital Asset Market Clarity Act, on 15 September 2026; it had therefore not become law as of this edition's date. US securities-law analysis remains fact-specific; SEC Division of Corporation Finance staff FAQs published in September 2026 expressly state that they represent staff views and are not Commission rules or binding law.",
          "In the European Union, MiCA excludes crypto-assets that qualify as financial instruments, which remain subject to the applicable financial-services framework. The DLT Pilot Regime provides a specific framework for certain DLT market infrastructures and eligible financial instruments; it is not a general exemption from financial regulation. Where a communication is a marketing communication relating to an offer or admission to trading of an asset-referenced token, MiCA Article 29 imposes specific requirements, including that it be identifiable, fair, clear, not misleading and consistent with the relevant crypto-asset white paper. Classification, disclosure and permissions must be assessed case by case. [6, 7, 11, 12, 13, 16, 17]",
        ],
      },
      {
        heading: "6.4 Risk framework",
        body: ["A practical risk framework covers the following categories."],
        bullets: [
          "Legal and regulatory risk: uncertainty over classification, enforceability, transfer restrictions and cross-border distribution.",
          "Asset and valuation risk: inaccurate information, title defects, illiquidity, concentration or changes in asset condition.",
          "Technology and cyber risk: vulnerabilities, compromised keys, malicious code, outages and protocol failures.",
          "Operational risk: errors, inadequate reconciliation, weak governance, service-provider failure and business continuity gaps.",
          "Liquidity and market risk: limited buyers, volatile pricing, liquidity mismatch and constrained exit options.",
          "Counterparty and concentration risk: dependence on issuers, custodians, administrators, oracles, infrastructure providers or a small number of market participants.",
          "Data and model risk: incomplete, stale or manipulated data; model error; privacy and access-control failures.",
        ],
      },
      {
        heading: "6.5 Governance and resilience",
        body: [
          "A mature operating model should define accountable owners, segregation of duties, change management, access controls, incident escalation, independent assurance, vendor oversight, recovery procedures and transparent investor communications. Risk management must continue after issuance.",
        ],
      },
    ],
  },
  {
    slug: "analytics-intelligence",
    number: "07",
    title: "Analytics, Artificial Intelligence and Intelligent Asset Management",
    tagline: "Analytics is the information layer. Intelligence is how that information is interpreted.",
    icon: Brain,
    intro:
      "Both are proposed ecosystem pillars. No operational AI capability is asserted in this edition.",
    sections: [
      {
        heading: "7.1 Analytics",
        body: [
          "The Analytics pillar concerns the collection, organisation, analysis and presentation of information needed to understand assets, markets and portfolio performance. Potential functions include asset-level dashboards, transaction histories, capital-flow monitoring, portfolio reporting, operational metrics and market intelligence.",
        ],
      },
      {
        heading: "7.2 Intelligence",
        body: [
          "The Intelligence pillar concerns the use of AI and advanced analytical methods to support valuation, risk assessment, anomaly detection, workflow automation and decision-making. AI may help process large or fragmented datasets, identify patterns and produce scenario analysis. Its outputs remain dependent on data quality, model design and the context in which they are used.",
        ],
      },
      {
        heading: "7.3 Data foundations",
        body: [
          "Useful analytics require consistent definitions, reliable source data, provenance, update frequency, access controls and reconciliation between off-chain records and on-chain events. Data lineage should make it possible to understand where a metric came from, when it was updated and what assumptions it contains.",
        ],
      },
      {
        heading: "7.4 AI governance",
        body: [
          "AI-supported valuation and risk analysis should be subject to validation, monitoring, explainability proportionate to the use case, bias testing, privacy controls and human oversight. Models should not be presented as independent appraisers or substitutes for professional judgement, regulated decisions or legally required due diligence. [9]",
        ],
      },
      {
        heading: "Pillar distinction",
        body: [
          "Analytics describes the information and measurement layer. Intelligence describes the methods used to interpret information and support decisions. Both are proposed ecosystem pillars; no operational AI capability is asserted here.",
        ],
      },
    ],
  },
  {
    slug: "defi-markets",
    number: "08",
    title: "DeFi Integration, Digital Markets and Liquidity",
    tagline: "Technical compatibility is not enough. Rights, eligibility, custody and protocol terms must support the use.",
    icon: Workflow,
    intro:
      "Decentralised finance includes decentralised exchanges, automated market makers, lending and borrowing protocols, liquidity pools, stablecoins, oracles and other programmable financial applications.",
    sections: [
      {
        heading: "8.1 Potential DeFi connections",
        body: [
          "Eligible tokenised assets may be connected to selected applications, but technical compatibility alone is insufficient. The legal rights, investor eligibility, custody model, transfer controls and protocol terms must all support the proposed use. [5, 10]",
        ],
      },
      {
        heading: "8.2 Collateral and lending",
        body: [
          "A tokenised asset may be considered as collateral where a lender can establish enforceable rights, reliable valuation, control over transfer or liquidation and a workable recovery process. For illustration, a €100,000 collateral position supporting a €40,000 loan has an initial loan-to-value ratio of 40%. If collateral value falls by 20% to €80,000 while the loan remains €40,000, the ratio rises to 50%. This simplified example excludes interest, fees, haircuts and liquidation costs. [5, 10]",
        ],
      },
      {
        heading: "8.3 Liquidity and market structure",
        body: [
          "Liquidity requires willing counterparties, transparent and credible information, reliable pricing, market access, settlement arrangements and confidence in the asset and issuer. Market-makers may support trading but cannot eliminate fundamental asset risk or guarantee continuous liquidity. Automated market makers can provide a mechanism for exchange, but pool depth, price impact, impermanent loss, oracle design and asset redemption constraints must be considered.",
        ],
      },
      {
        heading: "8.4 Stablecoins and settlement assets",
        body: [
          "Stablecoins may be used as settlement assets in some tokenised market structures. Their suitability depends on legal status, issuer quality, redemption rights, reserve arrangements, operational availability and jurisdictional requirements. A stablecoin is not risk-free merely because it seeks to maintain a stable reference value. [11, 12]",
        ],
      },
      {
        heading: "8.5 Risk controls",
        body: [
          "DeFi integration can introduce smart-contract, oracle, bridge, liquidation, leverage, rehypothecation, governance, counterparty and regulatory risks. TokenBrick Labs' proposed DeFi Integration pillar should therefore be framed as selective, permission-aware connectivity rather than unrestricted composability. The Markets pillar should distinguish asset discovery and primary distribution from secondary trading, and should not imply that a marketplace itself guarantees liquidity.",
        ],
      },
      {
        heading: "Market principle",
        body: [
          "The ability to list, transfer or use a token in a protocol does not establish that the holder has a legally enforceable claim, that the asset is eligible collateral or that an exit market will exist.",
        ],
      },
    ],
  },
  {
    slug: "strategic-vision",
    number: "09",
    title: "Strategic Vision, Business Model and Roadmap",
    tagline: "A five-pillar target ecosystem. This edition does not state that any pillar is operational.",
    icon: Compass,
    intro:
      "TokenBrick Labs' long-term vision is to contribute to an integrated ecosystem for real-world asset tokenisation and digital asset markets. The five pillars provide a framework for connecting asset information, intelligent analysis, technical infrastructure, decentralised financial applications and market access.",
    sections: [
      {
        heading: "9.1 Strategic vision",
        body: [
          "TokenBrick Labs' long-term vision is to contribute to an integrated ecosystem for real-world asset tokenisation and digital asset markets. The five pillars provide a framework for connecting asset information, intelligent analysis, technical infrastructure, decentralised financial applications and market access.",
        ],
      },
      {
        heading: "9.2 The five-pillar target ecosystem",
        body: [
          "The five pillars are presented as a long-term target ecosystem. This publication does not state that any pillar or component is fully developed, deployed, licensed, commercially available or operational. Product status and service availability should be confirmed directly with TokenBrick Labs.",
          "Figure 1 in the source edition is a proposed long-term target ecosystem. That diagram does not assert that all five pillars are currently operational. The proposed sequence is Analytics, Intelligence, Infrastructure, DeFi Integration, and Markets. Analytics and Intelligence are proposed capabilities. Infrastructure is a recommended foundation whose status is unverified in this edition. DeFi Integration and Markets are planned and sit outside an MVP.",
        ],
      },
      {
        heading: "Analytics",
        body: [
          "Potential applications may include transaction and activity information, portfolio and asset performance, operational dashboards and financial reporting. The scope, availability, data sources and service levels of any future product would be determined separately.",
        ],
      },
      {
        heading: "Intelligence",
        body: [
          "Potential applications may include explainable AI-assisted insights and risk or anomaly flagging to support human review. Predictive analytics and automated recommendations would require sufficient data quality, validation, model governance, explainability and human oversight.",
        ],
      },
      {
        heading: "Infrastructure",
        body: [
          "Potential infrastructure capabilities may include token issuance controls, smart-contract development and testing, asset administration and lifecycle records, compliance workflow support, and selected integrations. These are ecosystem design areas, not representations of active development or commercial availability.",
        ],
      },
      {
        heading: "DeFi Integration",
        body: [
          "A long-term target capability. Any implementation would depend on legal transferability, suitable counterparties, custody and settlement arrangements, protocol and market risk controls, and applicable permissions. No current functionality, launch date or availability is represented.",
        ],
      },
      {
        heading: "Markets",
        body: [
          "A long-term target capability. Any implementation would depend on legal transferability, suitable counterparties, custody and settlement arrangements, protocol and market risk controls, and applicable permissions. No current functionality, launch date or availability is represented.",
        ],
      },
      {
        heading: "9.3 Potential customer groups",
        body: [
          "Potential customer groups may include asset owners, property and fund managers, issuers, professional and institutional investors, financial institutions, custodians, administrators and specialist service providers. Each group has different needs, procurement processes, regulatory constraints and willingness to pay. The initial target segment should be selected through market validation rather than assumed.",
        ],
      },
      {
        heading: "9.4 Potential business model components",
        body: [
          "The categories below are illustrative industry business models, not confirmed TokenBrick Labs revenue streams, current services or commercial commitments. Their feasibility depends on product design, target market, regulatory perimeter, delivery capability and partner arrangements.",
        ],
        bullets: [
          "Implementation and tokenisation services: project design, technical implementation and integrations.",
          "Software subscriptions: access to infrastructure, administration, analytics or reporting tools.",
          "Asset administration and servicing: ongoing data, reporting, lifecycle and investor-support services.",
          "Marketplace and transaction fees: fees for permitted listing, distribution or transaction activity.",
          "Analytics and intelligence subscriptions: specialist data, dashboards and analytical services.",
          "Enterprise integrations and licensing: technology access, APIs or white-label capabilities.",
          "Partner revenue sharing: commercial arrangements with qualified providers, subject to conflicts and regulatory requirements.",
        ],
      },
      {
        heading: "9.5 Indicative development sequence",
        body: [
          "The sequence is illustrative and does not constitute an approved roadmap, delivery schedule, forecast or commitment. Actual priorities and timing depend on company strategy, funding, customer validation, legal analysis, partner readiness and operational capability.",
          "Phase 1 — Strategic definition. Select an initial market and asset class; validate customer problems; define regulatory assumptions; map required partners; specify an initial use case and measurable success criteria.",
          "Phase 2 — Foundation and pilot design. Establish legal and technical architecture; define custody and administration model; select providers; develop a controlled pilot plan and operating procedures.",
          "Phase 3 — Initial delivery. Deliver and evaluate a narrowly scoped pilot; test issuance, onboarding, reporting, servicing and reconciliation; measure cost, reliability and user outcomes.",
          "Phase 4 — Expansion. Expand only where evidence supports it; strengthen analytics and intelligence; add integrations and asset categories selectively.",
          "Phase 5 — Ecosystem development. Consider broader DeFi and market connectivity, additional jurisdictions and institutional partnerships where commercial, legal and operational readiness is demonstrated.",
        ],
      },
      {
        heading: "9.6 Performance measures",
        body: [
          "Potential KPIs include qualified customer pipeline, pilot conversion, recurring revenue, implementation margin, assets under administration or represented, issuance and servicing reliability, reconciliation exceptions, onboarding completion time, platform availability, security incidents, reporting timeliness, customer retention and user adoption. Metrics must be defined consistently and reported with scope and date.",
        ],
      },
    ],
  },
  {
    slug: "conclusion",
    number: "10",
    title: "Conclusion",
    tagline: "Long-term significance depends on the systems that connect digital records to enforceable rights.",
    icon: Flag,
    intro:
      "Real-world asset tokenisation has the potential to change how selected assets are represented, administered, financed and transferred. Its long-term significance will depend not on token issuance alone, but on the quality of the systems that connect digital records to enforceable rights, reliable assets, trusted data, secure technology and functioning markets.",
    sections: [
      {
        heading: "What has to be demonstrated",
        body: [
          "The strongest tokenisation models will be those that solve practical problems: reducing avoidable friction, improving information and administration, enabling appropriate access, strengthening settlement processes or supporting new forms of financial coordination. These outcomes must be demonstrated in specific asset classes and jurisdictions rather than assumed from the technology.",
        ],
      },
      {
        heading: "The five-pillar vision",
        body: [
          "TokenBrick Labs' five-pillar vision — Analytics, Intelligence, Infrastructure, DeFi Integration and Markets — offers a framework for pursuing this opportunity in a coordinated way. The pillars are interdependent and should be developed in a disciplined sequence, beginning with clearly defined customer needs, legal foundations, operational controls and measurable use cases.",
          "The path to a more connected digital asset economy will be built through credible execution, strong partnerships, regulatory awareness and continuous attention to the interests of asset owners and investors.",
        ],
      },
    ],
  },
  {
    slug: "glossary",
    number: "11",
    title: "Glossary",
    tagline: "Terms used in this edition.",
    icon: BookMarked,
    intro: "Definitions used in the public information edition. The exact legal claim of any token depends on its structure.",
    sections: [
      {
        heading: "Asset-backed token",
        body: [
          "A token whose value or rights are linked to an underlying asset or pool of assets; the exact legal claim depends on the structure.",
        ],
      },
      {
        heading: "Atomic settlement",
        body: [
          "A transaction design in which linked transfers occur together or not at all, subject to the system's technical and legal design.",
        ],
      },
      {
        heading: "DeFi",
        body: [
          "Decentralised finance: financial applications built using smart contracts and blockchain infrastructure.",
        ],
      },
      {
        heading: "Distributed ledger technology (DLT)",
        body: ["Technology for maintaining and updating records across a network of participants."],
      },
      {
        heading: "ERC-3643",
        body: [
          "An Ethereum token standard designed to support permissioned token transfers using identity and compliance-related controls.",
        ],
      },
      {
        heading: "Liquidity",
        body: ["The ability to buy or sell an asset in meaningful size without causing an excessive price impact."],
      },
      {
        heading: "Oracle",
        body: ["A service or mechanism that supplies external data to a blockchain or smart contract."],
      },
      {
        heading: "Real-world asset (RWA)",
        body: [
          "An asset or financial interest originating outside a blockchain environment that may be represented or referenced through digital tokens.",
        ],
      },
      {
        heading: "Smart contract",
        body: [
          "Code deployed on a blockchain that executes specified functions when programmed conditions are met.",
        ],
      },
      {
        heading: "SPV",
        body: ["Special-purpose vehicle: a legal entity established for a defined transaction or purpose."],
      },
      {
        heading: "Tokenisation",
        body: [
          "The representation of specified rights or claims in digital token form on a programmable ledger.",
        ],
      },
    ],
  },
  {
    slug: "references",
    number: "12",
    title: "References",
    tagline: "Sources for general industry, technical and regulatory propositions.",
    icon: Library,
    intro:
      "The references support general industry, technical and regulatory propositions. They do not verify TokenBrick Labs-specific products, licences, projects, customers, partnerships, financial position or operational performance. No headline market-size estimate is presented in this edition. Public dashboards use different definitions, coverage and methodologies. Any future market statistic should identify the source, snapshot date, asset coverage, treatment of represented versus distributed value and exclusions. RWA.xyz dashboard: https://app.rwa-xyz.com/networks",
    sections: [
      {
        heading: "Sources",
        body: [
          "[1] Bank for International Settlements (2025). Annual Economic Report 2025, Chapter III: The next-generation monetary and financial system. https://www.bis.org/publ/arpdf/ar2025e.htm",
          "[2] International Organization of Securities Commissions (November 2025). Tokenization of Financial Assets, Final Report FR/17/25. https://www.iosco.org/library/pubdocs/pdf/IOSCOPD809.pdf",
          "[3] Ethereum Improvement Proposal 3643. Permissioned Tokens (ERC-3643). https://eips.ethereum.org/EIPS/eip-3643",
          "[4] International Monetary Fund (29 January 2025). Tokenization and Financial Market Inefficiencies, Fintech Note. https://www.imf.org/en/publications/fintech-notes/issues/2025/01/29/tokenization-and-financial-market-inefficiencies-561256",
          "[5] Financial Stability Board (22 October 2024). The Financial Stability Implications of Tokenisation. https://www.fsb.org/2024/10/the-financial-stability-implications-of-tokenisation/",
          "[6] European Union. Regulation (EU) 2022/858 on a pilot regime for market infrastructures based on distributed ledger technology. https://eur-lex.europa.eu/eli/reg/2022/858/oj",
          "[7] European Union. Regulation (EU) 2023/1114 on markets in crypto-assets (MiCA), especially Article 2(4). https://eur-lex.europa.eu/eli/reg/2023/1114/oj",
          "[8] European Securities and Markets Authority (December 2024). Final Report on the Guidelines on the conditions and criteria for the qualification of crypto-assets as financial instruments, ESMA75453128700-1323. https://www.esma.europa.eu/document/final-report-guidelines-conditions-and-criteria-qualification-crypto-assets-financial",
          "[9] European Union. Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act). https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
          "[10] Financial Action Task Force. Updated Guidance for a Risk-Based Approach to Virtual Assets and Virtual Asset Service Providers. https://www.fatf-gafi.org/",
          "[11] United States. GENIUS Act, Public Law 119-27 (18 July 2025). https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm",
          "[12] Office of the Comptroller of the Currency (21 October 2026). OCC Bulletin 2026-50: GENIUS Act Regulations — Final Rule. https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-50.html",
          "[13] United States Senate (15 September 2026). Roll Call Vote 234, 119th Congress, 2nd Session: Cloture on the Motion to Proceed to H.R. 3633 rejected. https://www.senate.gov/legislative/LIS/roll_call_votes/vote1192/vote_119_2_00234.htm",
          "[14] OECD (9 January 2025). Tokenisation of assets and distributed ledger technologies in financial markets: Potential impediments to market development and policy implications. https://doi.org/10.1787/40e7f217-en",
          "[15] Bank for International Settlements (28 August 2025). Financial stability implications of tokenisation — Executive Summary. https://www.bis.org/publications/fsi-summary-financial-stability-implications-tokenisation-executive-summary",
          "[16] U.S. Securities and Exchange Commission, Division of Corporation Finance (28 September 2026). Frequently Asked Questions on the Application of the Federal Securities Laws to Certain Types of Crypto Assets and Certain Transactions Involving Crypto Assets. Staff views only; not a Commission rule or binding law. https://www.sec.gov/about/divisions-offices/division-corporation-finance/faqs-crypto-assets",
          "[17] European Securities and Markets Authority. Regulation (EU) 2023/1114 (MiCA), Article 29 — Marketing communications for asset-referenced tokens. https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-29-marketing-communications",
        ],
      },
    ],
  },
];
