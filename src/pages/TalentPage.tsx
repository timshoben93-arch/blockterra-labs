import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Briefcase } from "lucide-react";
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
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-radial">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative pt-16 md:pt-24 pb-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>

            <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-4 py-2 text-xs font-medium text-foreground/70 shadow-soft">
                  <Briefcase className="h-3.5 w-3.5" />
                  Talent Recruitment · Open Role
                </span>
                <h1 className="mt-6 font-display font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  <span className="text-gradient">{talent.title}</span>
                </h1>
                <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl">
                  {talent.tagline}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group" asChild>
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

              <div className="relative">
                <div className="rounded-3xl bg-gradient-card border border-border p-8 shadow-elevated">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">Role at a glance</h3>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Team</span>
                      <span className="font-medium">BlockTerraLab</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">Remote / Global</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium text-right">Full-time / Contract / Part-time / Freelance</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Project</span>
                      <span className="font-medium">RWA Real-Estate Platform</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role Overview */}
        <section className="py-20 md:py-24">
          <div className="container max-w-4xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Role Overview
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight">
              About <span className="text-gradient">the role</span>
            </h2>
            <div className="mt-6 space-y-4 text-base md:text-lg text-foreground/80 leading-relaxed">
              {talent.overview.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className="container max-w-4xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Primary Responsibilities
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight">
              What you'll <span className="text-gradient">own</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {talent.responsibilities.map((r) => (
                <li
                  key={r}
                  className="flex gap-4 rounded-2xl bg-card border border-border p-5 shadow-soft"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-foreground/85 leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Qualifications */}
        <section className="py-20 md:py-24">
          <div className="container max-w-4xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Qualifications
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight">
              What we're <span className="text-gradient">looking for</span>
            </h2>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {talent.qualifications.map((q) => (
                <li
                  key={q}
                  className="rounded-2xl bg-gradient-card border border-border p-5 shadow-soft"
                >
                  <p className="text-foreground/85 leading-relaxed">{q}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-3xl bg-gradient-card border border-border p-8 shadow-elevated text-center">
              <h3 className="font-display text-2xl font-bold">Ready to build the future of RWA?</h3>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Send us your CV, GitHub or portfolio — we review every application personally.
              </p>
              <div className="mt-6 flex justify-center">
                <Button variant="hero" size="xl" asChild>
                  <a href={`/talents/${talent.slug}/apply`} target="_blank" rel="noopener noreferrer">Apply Now</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Other roles */}
        <section className="py-20 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Other open roles
              </h2>
              <Link
                to="/"
                className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((t) => {
                const OIcon = t.icon;
                return (
                  <Link
                    key={t.slug}
                    to={`/talents/${t.slug}`}
                    className="group rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <OIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold">{t.short}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      View role
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
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
