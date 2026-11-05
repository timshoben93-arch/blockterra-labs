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
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">How we work</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.85rem] md:leading-[1.1]">
              From market insight to
              <br />
              practical collaboration
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:justify-self-end">
            A clear operating philosophy for advancing tokenized real-world assets — research-led, technology-informed
            and institutionally grounded.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delayMs={i * 70}
              as="li"
              className="rounded-4xl border border-white/10 bg-white/[0.04] p-7 md:p-8"
            >
              <p className="font-display text-3xl font-semibold text-primary">{s.n}</p>
              <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
