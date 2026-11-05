import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const models = [
  {
    title: "Strategic research partnerships",
    desc: "Joint research agendas, executive briefings and market intelligence programmes with institutions and technology providers exploring tokenization.",
  },
  {
    title: "Technical development partnerships",
    desc: "Architecture assessments, specifications and collaborative development support alongside specialist platform and infrastructure companies.",
  },
  {
    title: "Innovation and pilot partnerships",
    desc: "Scoped proofs of concept and controlled pilots that test legal, operational and technical readiness with clear evaluation criteria.",
  },
];

const partners = [
  "Tokenization platform providers",
  "Blockchain infrastructure companies",
  "Financial institutions",
  "Asset managers",
  "Digital asset custodians",
  "Compliance technology providers",
  "Legal and regulatory specialists",
  "Technology integrators",
  "Asset owners",
];

export const Partnerships = () => {
  return (
    <section id="partnerships" className="scroll-mt-24 border-b border-border bg-surface-raised py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Partnerships & collaboration"
          title={
            <>
              Building the ecosystem for <span className="text-gradient">institutional tokenization</span>
            </>
          }
          description="We collaborate across the stack — without implying that any specific partnership already exists unless separately confirmed."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.title} delayMs={i * 70} as="article" className="bg-card p-8 md:p-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Model 0{i + 1}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight md:text-2xl">{m.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{m.desc}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Who we collaborate with</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {partners.map((p) => (
              <li key={p} className="text-sm text-foreground/80 md:text-base">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
