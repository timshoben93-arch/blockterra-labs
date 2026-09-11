import { Banknote, Building, Gem, HousePlug, Trees, Wheat } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const industries = [
  { icon: Building, label: "Real estate", desc: "Fractional property, SPVs, and REIT-style vehicles with transfer restrictions that match the offering." },
  { icon: Banknote, label: "Private credit", desc: "Loans, receivables, and structured credit with servicing events on a shared ledger." },
  { icon: Gem, label: "Commodities", desc: "Allocated metals and inventory-backed tokens with custody attestations." },
  { icon: Trees, label: "Climate & ESG", desc: "Carbon and environmental instruments that need audit trails, not just a ticker." },
  { icon: Wheat, label: "Agri-finance", desc: "Seasonal, crop-backed instruments with clear redemption and warehouse data." },
  { icon: HousePlug, label: "Infrastructure", desc: "Energy and utility cash-flow tokens with long-dated operations in mind." },
];

export const Industries = () => {
  return (
    <section id="industries" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Industries"
          title="Where on-chain rails change settlement, not just branding"
          description="We work in asset classes where identity, jurisdiction, and servicing already exist — and tokenization has a job to do."
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, label, desc }) => (
            <article key={label} className="bg-background p-7 md:p-8">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
