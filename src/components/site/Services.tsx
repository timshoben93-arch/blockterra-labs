import { Coins, Layers, ShieldCheck, Cpu, Network, FileCode2 } from "lucide-react";

const services = [
  {
    icon: Coins,
    title: "RWA Tokenization",
    desc: "Tokenize real estate, treasuries, commodities and private credit with compliant, transferable on-chain instruments.",
    accent: "primary",
  },
  {
    icon: ShieldCheck,
    title: "Smart Contract Audits",
    desc: "Formal verification, fuzzing and manual review by senior auditors — for Solidity, Move and Rust.",
    accent: "accent",
  },
  {
    icon: Layers,
    title: "L1 / L2 Engineering",
    desc: "Custom rollups, app-chains and bridge infrastructure designed for institutional-grade throughput.",
    accent: "primary",
  },
  {
    icon: FileCode2,
    title: "Compliance & KYC Rails",
    desc: "On-chain identity, transfer restrictions and ERC-3643 / T-REX implementations ready for regulators.",
    accent: "highlight",
  },
  {
    icon: Network,
    title: "Liquidity & Market Infra",
    desc: "AMMs, order books, oracle feeds and tokenized fund settlement layers — battle-tested in production.",
    accent: "accent",
  },
  {
    icon: Cpu,
    title: "AI × On-chain Analytics",
    desc: "Real-time risk dashboards, anomaly detection and AI agents that act on verifiable on-chain data.",
    accent: "primary",
  },
];

const accentMap: Record<string, string> = {
  primary: "from-primary/20 to-primary-glow/10 text-primary",
  accent: "from-accent/20 to-accent-glow/10 text-accent",
  highlight: "from-highlight/20 to-highlight/5 text-highlight",
};

export const Services = () => {
  return (
    <section id="solutions" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Core Services
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
            End-to-end <span className="text-gradient">blockchain engineering</span> for real assets.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From tokenization design to audited deployment, BlockTerraLab is the technical
            backbone behind some of the most ambitious RWA platforms in market.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, accent }) => (
            <article
              key={title}
              className="group relative rounded-3xl bg-gradient-card border border-border p-7 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accentMap[accent]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
              <div className="absolute inset-x-7 bottom-7 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
