const steps = [
  { n: "01", t: "Discover", d: "Asset structuring workshop, regulatory mapping, and a clear tokenization blueprint." },
  { n: "02", t: "Architect", d: "Smart contract design, chain selection, compliance & custody integration plan." },
  { n: "03", t: "Build & Audit", d: "Production engineering with continuous internal review and third-party audit." },
  { n: "04", t: "Launch & Operate", d: "Mainnet deployment, monitoring, investor onboarding and ongoing iteration." },
];

export const Process = () => {
  return (
    <section className="py-24 md:py-32 bg-surface-dark text-surface-dark-foreground relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30"
           style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(190 95% 60% / 0.25), transparent 40%), radial-gradient(circle at 80% 60%, hsl(162 75% 50% / 0.2), transparent 40%)" }} />
      <div className="container relative">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-glow">Our Process</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">
            From concept to <span className="text-gradient">on-chain</span> in weeks, not quarters.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-dark-foreground/10 rounded-3xl overflow-hidden border border-surface-dark-foreground/10">
          {steps.map((s) => (
            <div key={s.n} className="bg-surface-dark p-8">
              <div className="font-display text-5xl font-bold text-gradient">{s.n}</div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-surface-dark-foreground/70 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
