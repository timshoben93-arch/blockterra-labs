import { ArrowRight, Building2, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

const models = [
  {
    icon: Landmark,
    badge: "Funds & issuers",
    title: "Tokenized fund stack",
    desc: "Software for an issuance path your counsel designs: permissioned contracts, transfer-restriction hooks, administrator-supplied NAV inputs, and an investor portal operations teams can use.",
    points: [
      "ERC-3643 / T-REX or equivalent permissioned transfer rules",
      "Allowlists wired to the client’s identity and accreditation vendors",
      "Corporate-action workflows (NAV inputs, coupons) as the administrator defines them",
      "Integrations with custodians and fund admins the client appoints",
    ],
    cta: "Book a stack walkthrough",
    to: SITE.calendly,
    external: true,
  },
  {
    icon: Building2,
    badge: "Platform operators",
    title: "Embedded RWA engine",
    desc: "Issue, transfer, and settle through APIs and SDKs instead of rebuilding compliance rails, identity, and settlement from scratch.",
    points: [
      "REST APIs for issuance and settlement events",
      "TypeScript and Rust SDKs",
      "Deployment on EVM networks, and Solana when the client already requires it",
      "Pluggable KYC and transfer restrictions",
    ],
    cta: "Read the technical docs",
    to: "/docs",
    external: false,
  },
];

export const Models = () => {
  return (
    <section id="rwa" className="scroll-mt-24 border-b border-border bg-surface-raised py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Engagement models"
          title={
            <>
              Bring the asset on-chain — as a fund, or as <span className="text-gradient">infrastructure</span>
            </>
          }
          description="First issuance or an existing product that needs rails: we pick the model that matches how you already operate."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-2">
          {models.map(({ icon: Icon, badge, title, desc, points, cta, to, external }, i) => (
            <Reveal key={title} delayMs={i * 80} as="article" className="bg-card p-8 md:p-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{badge}</p>
              <div className="mt-4 flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">{title}</h3>
              </div>
              <p className="mt-4 max-w-lg text-muted-foreground leading-relaxed">{desc}</p>
              <ul className="mt-6 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-foreground/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button variant={external ? "hero" : "soft"} size="lg" className="mt-8 group" asChild>
                {external ? (
                  <a href={to} target="_blank" rel="noopener noreferrer">
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <Link to={to}>
                    {cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
