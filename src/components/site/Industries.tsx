import { Banknote, Building, Gem, HousePlug, Trees, Wheat } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const industries = [
  { icon: Building, label: "Real estate", desc: "Software for interests in property vehicles (including SPVs) with transfer restrictions that match the offering documents — not a substitute for title or REIT status." },
  { icon: Banknote, label: "Private credit", desc: "Loans, receivables, and structured credit with servicing events recorded on a shared ledger the administrator operates." },
  { icon: Gem, label: "Commodities", desc: "Inventory-linked records with custody attestations from appointed custodians — not a claim that the token is the metal." },
  { icon: Trees, label: "Climate & ESG", desc: "Audit trails for environmental instruments the client is authorized to issue — not a carbon exchange." },
  { icon: Wheat, label: "Agri-finance", desc: "Seasonal, warehouse-linked instruments with redemption rules defined in the client’s documents." },
  { icon: HousePlug, label: "Infrastructure", desc: "Long-dated project cash-flow instruments, when the client’s structure already exists, with operations in mind." },
];

export const Industries = () => {
  return (
    <section id="industries" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Industries"
          title={
            <>
              Where on-chain rails change <span className="text-gradient">settlement, not just branding</span>
            </>
          }
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
