import { Banknote, Building, Gem, HousePlug, Trees, Wheat } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const industries = [
  { icon: Building, label: "Real estate", desc: "The first asset class the platform is being built around: interests in property vehicles, including SPVs, with transfer restrictions that match the offering. A token is not a substitute for title or REIT status." },
  { icon: Banknote, label: "Private credit", desc: "Loans, receivables, and structured credit, with servicing events recorded for the administrator who operates them." },
  { icon: Gem, label: "Commodities", desc: "Inventory-linked records with custody attestations. The token is not the metal." },
  { icon: Trees, label: "Climate & ESG", desc: "An audit trail for environmental instruments an issuer is authorized to issue. The platform is not a carbon exchange." },
  { icon: Wheat, label: "Agri-finance", desc: "Seasonal, warehouse-linked instruments with redemption rules taken from the offering documents." },
  { icon: HousePlug, label: "Infrastructure", desc: "Long-dated project cash-flow instruments, where a legal structure already exists, with operations designed in from the start." },
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
          description="Asset classes the platform is being built to support, where identity, jurisdiction, and servicing already exist."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ icon: Icon, label, desc }) => (
            <article key={label} className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow duration-200 hover:shadow-elevated md:p-8">
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
