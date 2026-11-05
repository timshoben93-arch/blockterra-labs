import { Building2, Landmark, Layers, Scale, Server, Wallet } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const audiences = [
  {
    icon: Landmark,
    label: "Banks & financial institutions",
    desc: "Institutions exploring tokenization research, architecture options, pilots and ecosystem partnerships.",
  },
  {
    icon: Building2,
    label: "Asset managers & owners",
    desc: "Fund managers, real estate and infrastructure owners evaluating whether tokenization creates operational or capital-markets value.",
  },
  {
    icon: Layers,
    label: "Tokenization platforms",
    desc: "Technology platforms seeking institutional product strategy, architecture assessments and collaborative development support.",
  },
  {
    icon: Server,
    label: "Blockchain infrastructure",
    desc: "Network and infrastructure providers focused on institutional requirements, interoperability and digital securities workflows.",
  },
  {
    icon: Wallet,
    label: "Custodians & market infrastructure",
    desc: "Digital asset custodians, administrators and settlement participants designing institutional operating models.",
  },
  {
    icon: Scale,
    label: "Compliance & legal specialists",
    desc: "Partners contributing regulatory, identity and investor-eligibility expertise to responsible innovation programmes.",
  },
];

export const Industries = () => {
  return (
    <section id="audiences" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Who we work with"
          title={
            <>
              Built for institutional and technology <span className="text-gradient">decision-makers</span>
            </>
          }
          description="A sophisticated B2B audience across traditional finance and digital asset infrastructure — not retail crypto trading."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ icon: Icon, label, desc }) => (
            <article key={label} className="rounded-4xl border border-border bg-card p-7 shadow-soft md:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
