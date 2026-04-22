import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, MapPin, Clock, Users, Layers, Zap, Target, Award } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { TALENTS, getTalentBySlug } from "@/data/talents";
import { useEffect } from "react";

const TalentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const talent = slug ? getTalentBySlug(slug) : undefined;

  useEffect(() => {
    if (talent) {
      document.title = `${talent.title} — Careers | BlockTerraLab`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", talent.tagline);
    }
  }, [talent]);

  if (!talent) return <Navigate to="/" replace />;

  const Icon = talent.icon;
  const others = TALENTS.filter((t) => t.slug !== talent.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        {/* HERO — modern editorial layout with mesh gradient */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute inset-0 grid-pattern" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

          <div className="container relative pt-12 md:pt-16 pb-24 md:pb-32">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition-all group-hover:-translate-x-0.5 group-hover:border-primary/40">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              Back to home
            </Link>

            <div className="mt-12 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm pl-1.5 pr-4 py-1.5">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-foreground/80">
                  WE'RE HIRING · OPEN POSITION
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>

              <h1 className="mt-8 font-display font-bold tracking-[-0.03em] text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
                <span className="block text-foreground/90">{talent.title.split(" ").slice(0, -1).join(" ") || talent.title}</span>
                {talent.title.split(" ").length > 1 && (
                  <span className="block text-gradient italic font-display">
                    {talent.title.split(" ").slice(-1)[0]}.
                  </span>
                )}
              </h1>

              <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
                {talent.tagline}
              </p>

              {/* Quick facts pills */}
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { icon: MapPin, label: "Remote · Global" },
                  { icon: Clock, label: "Full-time / Part-time / Freelancer" },
                  { icon: Users, label: "BlockTerraLab Core" },
                  { icon: Layers, label: "RWA Real-Estate" },
                ].map(({ icon: I, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm font-medium text-foreground/80 shadow-soft"
                  >
                    <I className="h-3.5 w-3.5 text-primary" />
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" className="group shadow-elevated" asChild>
                  <a href={`/talents/${talent.slug}/apply`} target="_blank" rel="noopener noreferrer">
                    Apply for this role
                    <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button variant="soft" size="xl" asChild>
                  <Link to="/">Browse other roles</Link>
                </Button>
              </div>
            </div>

            {/* Floating role icon */}
            <div className="pointer-events-none absolute right-8 top-32 hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
                <div className="relative h-32 w-32 rotate-6 rounded-[2rem] glass-card flex items-center justify-center shadow-elevated">
                  <Icon className="h-14 w-14 text-primary" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT — sticky sidebar layout */}
        <section className="relative py-20 md:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
              {/* Left: content */}
              <div className="space-y-20">
                {/* About */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Target className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">01 — Overview</p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                        About <span className="text-gradient italic">the role</span>
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-5 text-lg text-foreground/75 leading-[1.75] font-light">
                    {talent.overview.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Zap className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">02 — Responsibilities</p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                        What you'll <span className="text-gradient italic">own</span>
                      </h2>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {talent.responsibilities.map((r, i) => (
                      <div
                        key={r}
                        className="group relative flex gap-5 rounded-2xl border-gradient p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                      >
                        <span className="font-display text-3xl font-bold text-transparent [-webkit-text-stroke:1px_hsl(var(--primary)/0.4)] leading-none shrink-0 w-12">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-foreground/85 leading-relaxed pt-1">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-highlight/10 text-highlight">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">03 — Requirements</p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                        What we're <span className="text-gradient italic">looking for</span>
                      </h2>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {talent.qualifications.map((q) => (
                      <div
                        key={q}
                        className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border p-5 transition-all hover:border-primary/40 hover:shadow-soft"
                      >
                        <span className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
                          <p className="text-foreground/85 leading-relaxed text-[15px]">{q}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: sticky apply card */}
              <aside className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 shadow-elevated">
                  <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />

                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background/10 backdrop-blur text-background">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold leading-tight">
                      Ready to <span className="italic text-primary-glow">build</span> the future of RWA?
                    </h3>
                    <p className="mt-3 text-sm text-background/70 leading-relaxed">
                      Send your CV, GitHub or portfolio. We review every application personally.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-lg bg-background/5 border border-background/10 p-3">
                        <p className="text-background/50 uppercase tracking-wider">Type</p>
                        <p className="mt-1 font-semibold">Full-time</p>
                      </div>
                      <div className="rounded-lg bg-background/5 border border-background/10 p-3">
                        <p className="text-background/50 uppercase tracking-wider">Location</p>
                        <p className="mt-1 font-semibold">Remote</p>
                      </div>
                    </div>

                    <Button variant="hero" size="lg" className="mt-6 w-full group" asChild>
                      <a href={`/talents/${talent.slug}/apply`} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <p className="mt-3 text-center text-[11px] text-background/50">
                      Avg. response within 48 hours
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* OTHER ROLES — modern marquee-style cards */}
        <section className="relative py-24 border-t border-border bg-gradient-to-b from-muted/20 to-transparent">
          <div className="container">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">More opportunities</p>
                <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
                  Other open <span className="text-gradient italic">roles</span>
                </h2>
              </div>
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:border-primary/40 hover:shadow-soft transition-all"
              >
                View all positions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((t, i) => {
                const OIcon = t.icon;
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
                          <OIcon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground/60">0{i + 1}</span>
                      </div>
                      <h3 className="mt-5 font-display font-bold text-lg leading-tight">{t.short}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{t.tagline}</p>
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

export default TalentPage;
