import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    n: "01",
    t: "Asset model",
    d: "Write down the asset, the jurisdiction, the parties, and the constraints the platform has to encode.",
  },
  {
    n: "02",
    t: "Architecture",
    d: "Contract design, chain selection, identity, custody integrations, and administrator roles — decided before the implementation hardens.",
  },
  {
    n: "03",
    t: "Build & review",
    d: "Platform engineering with internal review, and an independent audit when the threat model requires it.",
  },
  {
    n: "04",
    t: "Operate",
    d: "Deployment, monitoring, investor onboarding, and the runbooks operators keep using after issuance.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="scroll-mt-24 border-b border-border bg-surface-dark py-20 text-surface-dark-foreground md:py-28">
      <div className="container">
        <SectionHeading
          inverse
          eyebrow="Process"
          title="How the platform moves from structure to software"
          description="The sequence we are using to build TokenBrickLabs’ RWA tokenization platform, so the open questions stay in the asset and the jurisdiction."
        />

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delayMs={i * 70} as="li" className="rounded-3xl border border-surface-dark-foreground/10 bg-surface-dark-foreground/5 p-7 md:p-8">
              <p className="font-display text-3xl font-semibold text-primary">{s.n}</p>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-dark-foreground/70">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
