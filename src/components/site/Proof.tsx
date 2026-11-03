import { SectionHeading } from "@/components/site/SectionHeading";

export const Proof = () => {
  return (
    <section className="border-b border-border py-20 md:py-28" aria-labelledby="proof-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Platform surfaces"
          title={<span id="proof-heading">Identity, custody integration, and servicing in one product</span>}
          description="The platform sits between the contracts and the people who operate an asset. These three surfaces are in development. We do not publish performance claims."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            ["Identity", "Allowlists and vendor hooks so a KYC and accreditation decision can be enforced in software. The platform does not replace that process."],
            ["Custody", "Integrations with MPC and HSM providers. TokenBrickLabs does not take discretionary custody of assets."],
            ["Servicing", "Events for coupons, NAV inputs, and redemptions as the administrator defines them. The platform does not set an independent valuation or promise liquidity."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
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
