import { ArrowRight, Building2, Link2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const pillars = [
  {
    icon: Search,
    badge: "01 · Research",
    title: "Independent research & intelligence",
    desc: "Market intelligence, technical analysis and institutional adoption research across real-world asset tokenization — platform-neutral and evidence-based.",
    points: [
      "Asset-class and market structure analysis",
      "Regulatory and commercial-model research",
      "Infrastructure and standards evaluation",
      "Executive briefings and publications",
    ],
    cta: "View research areas",
    to: "/services/rwa-research-intelligence",
  },
  {
    icon: Link2,
    badge: "02 · Connect",
    title: "Ecosystem partnerships",
    desc: "We bring together asset owners, financial institutions, technology platforms and infrastructure providers around practical tokenization initiatives.",
    points: [
      "Strategic introductions across the ecosystem",
      "Financial institution and asset-owner engagement",
      "Workshops, roundtables and standards dialogue",
      "Platform-neutral collaboration models",
    ],
    cta: "Explore partnerships",
    to: "/#partnerships",
  },
  {
    icon: Building2,
    badge: "03 · Build",
    title: "Applied innovation & collaboration",
    desc: "Architecture assessments, technical specifications, proofs of concept and pilot support — delivered with specialist technology partners where needed.",
    points: [
      "Technology and architecture assessments",
      "Proof-of-concept and pilot design",
      "Integration and feasibility studies",
      "Development support with specialist providers",
    ],
    cta: "See how we collaborate",
    to: "/services/platform-collaboration",
  },
];

export const Models = () => {
  return (
    <section id="pillars" className="scroll-mt-24 border-b border-border bg-surface-raised py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Our approach"
          title={
            <>
              Research. Connect. <span className="text-gradient">Build.</span>
            </>
          }
          description="Three activities define how we contribute to institutional-grade tokenized asset infrastructure — as an independent research and innovation partner, not a competing issuance platform."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {pillars.map(({ icon: Icon, badge, title, desc, points, cta, to }, i) => (
            <Reveal key={title} delayMs={i * 80} as="article" className="bg-card p-8 md:p-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{badge}</p>
              <div className="mt-4 flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.5rem]">{title}</h3>
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
              <Button variant="soft" size="lg" className="mt-8 group" asChild>
                <Link to={to}>
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
