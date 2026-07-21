import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles, MapPin, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { TALENTS } from "@/data/talents";
import { useEffect } from "react";

const TalentsIndex = () => {
  useEffect(() => {
    document.title = "Talent Recruitment — TokenBrickLabs";
    const desc = document.querySelector('meta[name="description"]');
    if (desc)
      desc.setAttribute(
        "content",
        "Join TokenBrickLabs. Open roles across Web3, AI, engineering and product for our RWA real-estate tokenization platform."
      );
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="container relative py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-surface-dark-foreground/15 bg-surface-dark-foreground/5 backdrop-blur pl-1.5 pr-4 py-1.5">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-xs font-semibold tracking-wide">
                  WE'RE HIRING · {TALENTS.length} OPEN ROLES
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>
              <h1 className="mt-8 font-display font-bold tracking-[-0.03em] text-5xl md:text-7xl leading-[0.95]">
                Join the team{" "}
                <span className="text-gradient italic">tokenizing</span> real-world
                assets.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-surface-dark-foreground/70 max-w-2xl leading-relaxed font-light">
                We're building the platform that brings real-estate on-chain —
                blockchain, AI and immersive 3D, engineered end-to-end. Remote,
                global, output-driven.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-surface-dark-foreground/15 bg-surface-dark-foreground/5 px-4 py-2">
                  <MapPin className="h-3.5 w-3.5 text-primary-glow" /> Remote · Global
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-surface-dark-foreground/15 bg-surface-dark-foreground/5 px-4 py-2">
                  <Users className="h-3.5 w-3.5 text-primary-glow" /> Full-time / Part-time / Freelancer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ROLES LIST */}
        <section className="relative py-20 md:py-28">
          <div className="container">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Open positions
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
                  All <span className="text-gradient italic">roles</span>
                </h2>
              </div>
              <a
                href="mailto:support@tokenbricklabs.com"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary/40 hover:shadow-soft transition-all"
              >
                Don't see your role? Say hi
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TALENTS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.slug}
                    to={`/talents/${t.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevated hover:border-primary/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display font-bold text-lg leading-tight">
                        {t.short}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {t.tagline}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        View role
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default TalentsIndex;