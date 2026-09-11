import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { DOCS } from "@/data/docs";
import { SITE } from "@/lib/site";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logo} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
              <span className="leading-tight">
                <span className="block font-display text-base font-semibold tracking-tight">{SITE.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-surface-dark-foreground/50">
                  {SITE.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-surface-dark-foreground/70">
              Production tokenization for real-world assets — issuance, identity, custody, and the operations layer
              after launch. Based in {SITE.location}.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-surface-dark-foreground/85 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <nav aria-label="Footer">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-surface-dark-foreground/50">
                Studio
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "Services", to: "/#solutions" },
                  { label: "Company", to: "/company" },
                  { label: "Talent", to: "/talents" },
                  { label: "Docs", to: "/docs" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-surface-dark-foreground/75 transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Documentation">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-surface-dark-foreground/50">
                Papers
              </p>
              <ul className="mt-4 space-y-2.5">
                {DOCS.slice(0, 4).map((d) => (
                  <li key={d.slug}>
                    <Link
                      to={`/docs/${d.slug}`}
                      className="text-sm text-surface-dark-foreground/75 transition-colors hover:text-primary"
                    >
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-surface-dark-foreground/50">
                Talk to us
              </p>
              <p className="mt-4 text-sm leading-relaxed text-surface-dark-foreground/70">
                A 30-minute discovery call. Leave with a sequencing of contracts, identity, and custody.
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-glow"
              >
                Book a call
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-surface-dark-foreground/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-surface-dark-foreground/55">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6 text-xs text-surface-dark-foreground/55" aria-label="Legal">
            <Link to="/privacy" className="transition-colors hover:text-surface-dark-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-surface-dark-foreground">
              Terms
            </Link>
            <Link to="/security" className="transition-colors hover:text-surface-dark-foreground">
              Security
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
