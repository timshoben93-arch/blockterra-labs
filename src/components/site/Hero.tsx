import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import heroBg from "@/assets/hero-rwa-bg.jpg";

const STEPS = [
  { k: "01", t: "Structure", d: "Offering, jurisdictions, transfer rules" },
  { k: "02", t: "Issue", d: "ERC-3643 token + identity rails" },
  { k: "03", t: "Operate", d: "NAV, coupons, secondary transfers" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-x-clip border-b border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/88 to-background" />
      </div>

      <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-28">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Seattle · Institutional RWA engineering
          </p>
          <h1 className="mt-5 font-display text-[2.15rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.15rem]">
            Tokenize real assets. Ship rails institutions can operate.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            TokenBrickLabs designs, audits, and deploys production tokenization stacks for funds,
            fintechs, and operators — from compliant issuance to custody, NAV, and secondary
            settlement.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                Book a discovery call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="soft" size="lg" asChild>
              <a href="#solutions">Explore services</a>
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {[
              ["Asset classes", "Real estate, credit, funds"],
              ["Standards", "ERC-3643 · ERC-1400"],
              ["Typical path", "Blueprint in 30 minutes"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{k}</dt>
                <dd className="mt-1.5 font-display text-sm font-medium tracking-tight text-foreground sm:text-base">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="relative" aria-label="Issuance stack overview">
          <div className="border border-border bg-card/80 p-5 shadow-elevated sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Issuance stack
                </p>
                <p className="mt-1 font-display text-lg font-semibold tracking-tight">Class A office, Seattle</p>
              </div>
              <span className="shrink-0 border border-accent/40 bg-accent/10 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                Permissioned
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Standard</dt>
                <dd className="mt-0.5 font-medium">ERC-3643 / T-REX</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Settlement</dt>
                <dd className="mt-0.5 font-medium">EVM + custody MPC</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Identity</dt>
                <dd className="mt-0.5 font-medium">KYC · accreditation</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Corporate actions</dt>
                <dd className="mt-0.5 font-medium">NAV · coupons</dd>
              </div>
            </dl>
            <ol className="mt-6 space-y-0 border-t border-border pt-5">
              {STEPS.map((step, i) => (
                <li key={step.k} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="w-8 shrink-0 font-display text-sm font-semibold text-primary">{step.k}</span>
                  <div className={i !== STEPS.length - 1 ? "flex-1 border-b border-border/70 pb-3" : "flex-1"}>
                    <p className="font-display text-sm font-semibold">{step.t}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
};
