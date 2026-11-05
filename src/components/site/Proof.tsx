import { SectionHeading } from "@/components/site/SectionHeading";

export const Proof = () => {
  return (
    <section className="border-b border-border py-20 md:py-28" aria-labelledby="positioning-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Independence & credibility"
          title={<span id="positioning-heading">Platform-neutral. Institutionally oriented. Research-driven.</span>}
          description="We bridge traditional financial markets and emerging tokenization infrastructure — without presenting ourselves as an exchange, issuance venue, asset manager or conventional consultancy."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            [
              "Independent research",
              "Objective analysis of markets, architectures and operating models. Technology evaluations are not vendor marketing.",
            ],
            [
              "Technology neutrality",
              "We collaborate with multiple specialist providers. We do not require participants to adopt a proprietary TokenBrickLabs issuance stack.",
            ],
            [
              "Clear boundaries",
              "Research, advisory and development support are distinct from regulated financial activities. We do not claim custody, brokerage or investment-management licences on this site.",
            ],
          ].map(([k, v]) => (
            <div key={k} className="rounded-4xl border border-border bg-card p-8 shadow-soft">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Principle</p>
              <p className="mt-6 font-display text-xl font-semibold tracking-tight">{k}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
