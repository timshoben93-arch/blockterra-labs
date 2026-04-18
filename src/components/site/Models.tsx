import { ArrowRight, Building2, Landmark, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    icon: Landmark,
    badge: "For Funds & Issuers",
    title: "Tokenized Fund Stack",
    desc: "Launch a regulated tokenized fund — fully managed: smart contracts, transfer agent integrations, NAV oracle, and investor portal.",
    points: [
      "ERC-3643 / T-REX compliant tokens",
      "Whitelisting, jurisdictional restrictions",
      "Automated NAV & coupon distribution",
      "Custodian & administrator integrations",
    ],
    cta: "See the Stack",
    variant: "hero" as const,
  },
  {
    icon: Building2,
    badge: "For Operators",
    title: "Embedded RWA Engine",
    desc: "Embed tokenization into your platform with our SDKs and APIs. Issue, transfer and settle real-world assets without rebuilding the rails.",
    points: [
      "REST + WebSocket APIs",
      "TypeScript / Rust SDKs",
      "Multi-chain settlement (EVM, Solana)",
      "Plug-in compliance & KYC",
    ],
    cta: "Read the Docs",
    variant: "accent" as const,
  },
];

export const Models = () => {
  return (
    <section id="rwa" className="py-24 md:py-32 bg-secondary/40">
      <div className="container">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Two Engagement Models
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Bring assets <span className="text-gradient">on-chain</span> — your way.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Whether you're issuing your first tokenized fund or scaling an existing
            RWA platform, we have a model that fits.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {models.map(({ icon: Icon, badge, title, desc, points, cta, variant }) => (
            <article
              key={title}
              className="relative rounded-[2rem] bg-card border border-border p-8 md:p-10 shadow-soft hover:shadow-elevated transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {badge}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>

                <ul className="mt-6 space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm">
                      <TrendingUp className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                      <span className="text-foreground/85">{p}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={variant} size="pill" className="mt-8 group">
                  {cta}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
