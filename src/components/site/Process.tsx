import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    n: "01",
    t: "Research",
    d: "Identify market developments, opportunities and technological challenges across asset classes and jurisdictions.",
  },
  {
    n: "02",
    t: "Evaluate",
    d: "Assess asset classes, platforms, infrastructure and operating models against institutional requirements.",
  },
  {
    n: "03",
    t: "Connect",
    d: "Bring together relevant financial and technology participants around a clearly defined problem.",
  },
  {
    n: "04",
    t: "Design",
    d: "Develop architectures, technical requirements and practical solution outlines with clear assumptions.",
  },
  {
    n: "05",
    t: "Collaborate",
    d: "Support implementation, testing and innovation initiatives with specialist providers where required.",
  },
];

export const Process = () => {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-b border-border bg-surface-dark py-20 text-surface-dark-foreground md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          singleLineTitle
          title="From market insight to practical collaboration"
          description="A clear operating philosophy for advancing tokenized real-world assets — research-led, technology-informed and institutionally grounded."
        />

        <ol className="mt-14 grid gap-px bg-surface-dark-foreground/10 md:grid-cols-2 lg:grid-cols-5">
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
