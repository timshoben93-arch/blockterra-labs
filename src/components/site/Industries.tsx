import { Building, Banknote, Trees, Gem, Wheat, HousePlug } from "lucide-react";

const industries = [
  { icon: Building, label: "Real Estate", desc: "Fractional property & REITs" },
  { icon: Banknote, label: "Private Credit", desc: "Tokenized loans & receivables" },
  { icon: Gem, label: "Commodities", desc: "Gold, metals, carbon credits" },
  { icon: Trees, label: "Sustainability", desc: "Verifiable carbon & ESG assets" },
  { icon: Wheat, label: "Agri-Finance", desc: "Crop-backed yield instruments" },
  { icon: HousePlug, label: "Infrastructure", desc: "Energy & utility tokenization" },
];

export const Industries = () => {
  return (
    <section id="industries" className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Industries</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Powering the next wave of <span className="text-gradient-warm">tokenized markets.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            We work across asset classes where on-chain rails unlock genuine
            efficiency — settlement, transparency, and global access.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border shadow-soft">
          {industries.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group bg-card hover:bg-gradient-card transition-colors p-8 md:p-10"
            >
              <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
              <h3 className="mt-5 font-display text-xl font-semibold">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
