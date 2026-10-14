import { SectionHeading } from "@/components/site/SectionHeading";

export const Proof = () => {
  return (
    <section className="border-b border-border py-20 md:py-28" aria-labelledby="proof-heading">
      <div className="container">
        <SectionHeading
          eyebrow="How teams use us"
          title={<span id="proof-heading">Built for people who already have an asset, a counsel, and a deadline</span>}
          description="We sit between protocol engineering and fund operations — so neither side has to pretend to be the other. We do not publish anonymous client quotations."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {[
            ["Identity", "Allowlists and vendor hooks so the client’s KYC and accreditation process can be enforced in software — not a replacement for that process."],
            ["Custody", "Integrations with MPC / HSM providers the client appoints. TokenBrickLabs does not take discretionary custody of assets."],
            ["Servicing", "Software events for coupons, NAV inputs, and redemptions as the administrator defines them — not independent valuation or liquidity."],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-8">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Working surface</p>
              <p className="mt-6 font-display text-xl font-semibold tracking-tight">{k}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
