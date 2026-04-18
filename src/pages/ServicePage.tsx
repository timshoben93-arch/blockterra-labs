import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { useEffect } from "react";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | BlockTerraLab`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", service.tagline);
    }
  }, [service]);

  if (!service) return <Navigate to="/" replace />;

  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

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
                  BlockTerraLab Services
                </span>
                <h1 className="mt-6 font-display font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                  <span className="text-gradient">{service.title}</span>
                </h1>
                <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl">
                  {service.tagline}
                </p>
                <p className="mt-5 text-base text-foreground/80 max-w-2xl leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" className="group" asChild>
                    <a href="/#contact">
                      Start a Project
                      <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button variant="soft" size="xl" asChild>
                    <Link to="/">Explore Other Services</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-3xl bg-gradient-card border border-border p-8 shadow-elevated">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">Tech we use</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                What you get
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight">
                Capabilities tailored to your <span className="text-gradient">roadmap</span>
              </h2>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              {service.features.map((f) => (
                <article
                  key={f.title}
                  className="rounded-3xl bg-gradient-card border border-border p-7 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-20 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Explore other services
              </h2>
              <Link
                to="/"
                className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((s) => {
                const OIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="group rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <OIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold">{s.short}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more
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

export default ServicePage;
