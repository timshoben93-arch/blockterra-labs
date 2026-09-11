import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    n: "01",
    t: "Discover",
    d: "Asset workshop, regulatory map, and a written tokenization blueprint with owners and constraints.",
  },
  {
    n: "02",
    t: "Architect",
    d: "Contract design, chain selection, identity, custody, and administrator integrations — decided before code hardens.",
  },
  {
    n: "03",
    t: "Build & review",
    d: "Production engineering with continuous internal review and an independent audit path when the risk warrants it.",
  },
  {
    n: "04",
    t: "Launch & operate",
    d: "Mainnet deployment, monitoring, investor onboarding, and the operational runbooks your team keeps after we leave.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="scroll-mt-24 border-b border-border bg-surface-dark py-20 text-surface-dark-foreground md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Process"
          title="From term sheet to mainnet without a six-month archaeology project"
          description="A sequence we have run enough times that the surprises stay in the asset, not in the software."
        />

        <ol className="mt-14 grid gap-px bg-surface-dark-foreground/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delayMs={i * 70} as="li" className="bg-surface-dark p-7 md:p-8">
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
