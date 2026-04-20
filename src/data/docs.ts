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
    tagline: "Understanding the core problems in decentralized real estate infrastructure.",
    icon: BookOpen,
    intro:
      "Peer-to-peer networks form the backbone of modern blockchain infrastructure, yet they carry fundamental architectural constraints that limit their scalability in high-value asset management contexts.",
    sections: [
      {
        heading: "1.1 Limitations of P2P Networks",
        body: [
          "The traditional P2P model was designed for data distribution, not financial asset custody or regulatory-compliant ownership transfer. As network participants grow, DHT-based routing introduces O(log N) lookup overhead — acceptable for file sharing, but problematic for real-time settlement of financial instruments.",
        ],
        bullets: [
          "Message propagation latency increases non-linearly with node count in unstructured topologies.",
          "Sybil attacks remain a persistent threat without Proof-of-Identity or staking mechanisms.",
          "NAT traversal failures reduce effective network participation by up to 30% in consumer environments.",
          "Bandwidth asymmetry between node types creates bottlenecks at aggregation points.",
        ],
      },
      {
        heading: "1.2 Resource Utilization",
        body: [
          "Existing blockchain networks suffer from dramatic inefficiencies in computational and network resource utilization. Proof-of-Work systems, while battle-tested for security, consume energy disproportionate to their economic throughput.",
          "BlockTerraLab's architecture replaces wasteful hash-grinding with Proof-of-Relay — a novel contribution mechanism that rewards nodes for actual network utility: forwarding data packets, maintaining uptime SLAs, and serving routing queries.",
        ],
      },
      {
        heading: "1.3 Net Neutrality & Fragmentation",
        body: [
          "Modern internet infrastructure is increasingly fragmented along jurisdictional and commercial lines, threatening the open access principles that made decentralized networks viable.",
        ],
      },
    ],
  },
  {
    slug: "vision",
    number: "02",
    title: "Vision",
    tagline: "Objectives, architecture pillars, and the developer ecosystem.",
    icon: Eye,
    intro:
      "BlockTerraLab is built on four foundational objectives that guide every architectural and governance decision within the protocol.",
    sections: [
      {
        heading: "2.1 Objectives of BlockTerraLab",
        body: [
          "Bridge institutional-grade real estate with on-chain liquidity, eliminate retail barriers to entry, and provide regulatory-compliant ownership transfer at internet scale.",
        ],
      },
      {
        heading: "2.2 The Third Pillar: Networking",
        body: [
          "Beyond consensus and execution, networking is treated as a first-class protocol concern. Geographic-aware routing, QoS guarantees, and Sybil-resistant identity are built into the base layer.",
        ],
      },
      {
        heading: "2.3 Elementary Components",
        bullets: [
          "Governance DAO — On-chain governance for protocol upgrades, fee structures, and asset listings.",
          "Compliance Layer — KYC/AML verification and jurisdictional transfer restrictions enforced at the smart contract level.",
          "SPV Backing — BTL tokens are 1:1 collateralized by Special Purpose Vehicles holding verified real estate.",
        ],
        body: [],
      },
      {
        heading: "2.4 Networking Toolkit for DApp Development",
        body: [
          "BlockTerraLab exposes a comprehensive SDK enabling developers to build dApps without deep blockchain expertise.",
        ],
        bullets: [
          "BTL.js — JavaScript/TypeScript SDK with React hooks included.",
          "REST Gateway — OpenAPI 3.0 compliant HTTP gateway for legacy integration.",
          "WebSocket Streams — Real-time event subscriptions for prices, yields, and governance.",
          "GraphQL Subgraph — Indexed query layer for portfolio analytics.",
        ],
      },
    ],
  },
  {
    slug: "technology-foundations",
    number: "03",
    title: "Technology Foundations",
    tagline: "Cellular Automata theory and its application to distributed consensus.",
    icon: Cpu,
    intro:
      "Cellular Automata (CA) provide a mathematically elegant framework for emergent global consensus from purely local interactions.",
    sections: [
      {
        heading: "3.1 Cellular Automata",
        body: [
          "A CA consists of a regular grid of cells, each in a finite state, evolving in discrete time according to a fixed rule based on neighboring states. Despite local simplicity, CAs produce rich global behavior.",
        ],
      },
      {
        heading: "3.2 Rules as Formulas",
        body: [
          "S(i, t+1) = F( S(i,t), S(N1,t), S(N2,t), ..., S(Nk,t) )",
          "Where S(i,t) is the state of node i at time t, N1..Nk are k randomly selected neighbors, and F is the majority vote function. This rule produces robust global consensus in O(log N) communication rounds with high probability.",
        ],
      },
    ],
  },
  {
    slug: "new-kind-of-network",
    number: "04",
    title: "New Kind of Network",
    tagline: "Architecture, topology, routing, and decentralization mechanisms.",
    icon: Network,
    intro:
      "BlockTerraLab introduces a new networking primitive: a self-organizing, self-evolving relay network that rewards useful work.",
    sections: [
      {
        heading: "4.1 Next Generation Decentralized Network",
        body: [
          "Geographic-aware node selection, QoS-tiered relays, and identity-bound routing form the foundation of the BlockTerraLab network layer.",
        ],
      },
      {
        heading: "4.2 A Useful Proof of Work",
        body: [
          "Proof-of-Relay rewards nodes for forwarding packets, maintaining uptime SLAs, and serving routing queries — useful work that secures the network without wasting energy.",
        ],
      },
      {
        heading: "4.3 Network Topology and Routing",
        body: [
          "Self-organization: Nodes form clusters based on shared routing responsibilities, with no central coordinator.",
          "Self-evolution: Routing strategies adapt to observed performance via reputation decay, creating evolutionary pressure toward high-performance routing.",
        ],
      },
      {
        heading: "4.4 Efficient Decentralization",
        body: [
          "Decentralization is measured by the Nakamoto Coefficient — the minimum number of entities whose collusion would compromise the network. BlockTerraLab targets a Nakamoto Coefficient ≥ 100 across block production, relay provision, oracle feeds, and governance voting.",
        ],
      },
    ],
  },
  {
    slug: "consensus",
    number: "05",
    title: "Cellular Automata Powered Consensus",
    tagline: "The mathematical framework behind BlockTerraLab's consensus mechanism.",
    icon: Boxes,
    intro:
      "Mainstream consensus mechanisms (PoW, PoS, BFT) each carry trade-offs between energy use, finality, and decentralization. CA-powered consensus offers a different operating point.",
    sections: [
      {
        heading: "5.1 Mainstream Consensus",
        body: [
          "PoW prioritizes security at high energy cost. PoS reduces energy but concentrates power among large stakeholders. Classical BFT scales poorly with validator count.",
        ],
      },
      {
        heading: "5.2 Cellular Automata Powered Consensus",
        body: [
          "The majority vote CA rule assigns S(i, t+1) = sign(SUM S(j, t)) over the neighborhood of node i. For random d-regular graphs with d ≥ 3, this rule converges to unanimous consensus in O(log N) rounds with probability approaching 1.",
        ],
      },
      {
        heading: "5.3 Proof of Relay",
        body: [
          "Validator weight is derived from verified relay contributions, randomized neighbor sets via VRF, and stake — combining economic skin-in-the-game with measurable network utility.",
        ],
      },
      {
        heading: "5.4 Potential Attacks",
        body: [
          "Sybil and eclipse attacks are mitigated by VRF-based neighbor reshuffling each consensus epoch. A 51% attack requires controlling a sustained majority across randomly reshuffled neighborhoods, not a static fraction of hashrate.",
        ],
      },
    ],
  },
  {
    slug: "conclusions",
    number: "06",
    title: "Conclusions",
    tagline: "Bridging physical property value with decentralized finance infrastructure.",
    icon: Flag,
    intro:
      "BlockTerraLab combines fractional real estate ownership, regulated SPV backing, and a novel CA-powered consensus to create the first protocol designed end-to-end for tokenized real-world assets at institutional scale.",
    sections: [
      {
        heading: "Outlook",
        body: [
          "By aligning network rewards with useful work, embedding compliance at the contract level, and targeting a Nakamoto Coefficient ≥ 100, BlockTerraLab positions itself as the foundational layer for the next generation of on-chain real estate markets.",
        ],
      },
    ],
  },
];
