import { SectionHeading } from "@/components/site/SectionHeading";

const quotes = [
  {
    quote:
      "They treated issuance as an operations problem: transfer rules, NAV, and the administrator — not a weekend smart-contract demo.",
    name: "Director of Product",
    org: "Tokenized credit platform",
  },
  {
    quote:
      "The blueprint from the first call survived contact with counsel. That is rarer than a pretty investor portal.",
    name: "General Counsel",
    org: "Real-estate fund sponsor",
  },
];

export const Proof = () => {
  return (
    <section className="border-b border-border py-20 md:py-28" aria-labelledby="proof-heading">
      <div className="container">
        <SectionHeading
          eyebrow="How teams use us"
          title={<span id="proof-heading">Built for people who already have an asset, a counsel, and a deadline</span>}
          description="We sit between protocol engineering and fund operations — so neither side has to pretend to be the other."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          <div className="bg-background p-8 lg:col-span-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Working surface</p>
            <ul className="mt-6 space-y-5">
              {[
                ["Identity", "Accreditation, KYC, and allowlists that match the PPM"],
                ["Custody", "MPC / HSM partners with operational controls"],
                ["Servicing", "Coupons, NAV, and redemptions as first-class events"],
              ].map(([k, v]) => (
                <li key={k}>
                  <p className="font-display font-semibold tracking-tight">{k}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v}</p>
                </li>
              ))}
            </ul>
          </div>
          {quotes.map((q) => (
            <figure key={q.org} className="flex flex-col justify-between bg-card p-8">
              <blockquote className="font-display text-lg leading-snug tracking-tight text-foreground md:text-xl">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{q.name}</span>
                <span className="block">{q.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
