import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { TALENTS } from "@/data/talents";
import { DOCS } from "@/data/docs";

export const Footer = () => {
  const navLinks = [
    { label: "Company", to: "/company" },
    { label: "Docs", to: "/docs" },
    { label: "RWA", to: "/#rwa" },
    { label: "Industries", to: "/#industries" },
    { label: "Insights", to: "/#insights" },
  ];

  return (
    <footer className="relative bg-surface-dark text-surface-dark-foreground overflow-hidden">
      {/* Top gradient accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7l9-4 9 4-9 4-9-4z" />
                  <path d="M3 12l9 4 9-4" />
                  <path d="M3 17l9 4 9-4" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold tracking-tight text-base">BlockTerraLab</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-surface-dark-foreground/50">RWA · Blockchain Lab</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-surface-dark-foreground/70 max-w-sm leading-relaxed">
              Engineering the bridge between real-world assets and on-chain markets.
              Audited. Compliant. Production-grade.
            </p>
            <a
              href="mailto:support@blockterralab.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-surface-dark-foreground/80 hover:text-primary-glow transition-colors group"
            >
              <Mail className="h-4 w-4" />
              support@blockterralab.com
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </div>

          {/* Talent */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-xs uppercase tracking-[0.18em] text-surface-dark-foreground/50">
              Talent Recruitment
            </h4>
            <ul className="mt-5 space-y-3">
              {TALENTS.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/talents/${t.slug}`}
                    className="text-sm text-surface-dark-foreground/75 hover:text-primary-glow transition-colors"
                  >
                    {t.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-xs uppercase tracking-[0.18em] text-surface-dark-foreground/50">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-surface-dark-foreground/75 hover:text-primary-glow transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 font-display font-semibold text-xs uppercase tracking-[0.18em] text-surface-dark-foreground/50">
              Docs
            </h4>
            <ul className="mt-5 space-y-3">
              {DOCS.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/docs/${d.slug}`}
                    className="text-sm text-surface-dark-foreground/75 hover:text-primary-glow transition-colors"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-surface-dark-foreground/10 bg-surface-dark-foreground/5 p-6 backdrop-blur">
              <h4 className="font-display font-semibold text-sm text-surface-dark-foreground">
                Build with us
              </h4>
              <p className="mt-2 text-xs text-surface-dark-foreground/65 leading-relaxed">
                Discovery call in 30 minutes. Walk away with a clear tokenization roadmap.
              </p>
              <a
                href="https://calendly.com/blockterralab-support/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-elevated hover:shadow-glow transition-shadow"
              >
                Book a call
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface-dark-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-dark-foreground/55">
            © {new Date().getFullYear()} BlockTerraLab. All rights reserved.
          </p>
          <div className="flex gap-7 text-xs text-surface-dark-foreground/55">
            <a href="#" className="hover:text-surface-dark-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-surface-dark-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-surface-dark-foreground transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
