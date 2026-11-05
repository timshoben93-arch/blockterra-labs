import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/site";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={logo} alt="" width={40} height={40} className="h-9 w-9 rounded-full object-cover" />
              <span className="leading-tight">
                <span className="block font-display text-base font-semibold tracking-tight text-white">{SITE.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/50">
                  {SITE.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              An independent RWA research and innovation company advancing the infrastructure, technology and
              adoption of tokenized real-world assets. Based in {SITE.location}. Research. Connect. Build.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <nav aria-label="Footer">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Company
              </p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "About", to: "/company" },
                  { label: "What We Do", to: "/#what-we-do" },
                  { label: "How We Work", to: "/#how-we-work" },
                  { label: "Talent", to: "/talents" },
                  { label: "Research & Insights", to: "/docs" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-white/70 transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Capabilities">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Capabilities
              </p>
              <ul className="mt-4 space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-primary"
                    >
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Collaborate
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                For financial institutions, asset owners and technology platforms exploring institutional
                tokenization.
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a conversation
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/45">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <nav className="flex flex-wrap gap-6 text-xs text-white/45" aria-label="Social">
              {SITE.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-wrap gap-6 text-xs text-white/45" aria-label="Legal">
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link to="/security" className="transition-colors hover:text-white">
                Security
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
