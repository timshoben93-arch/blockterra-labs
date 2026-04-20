import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { DOCS } from "@/data/docs";

const DocChapter = () => {
  const { slug } = useParams();
  const idx = DOCS.findIndex((d) => d.slug === slug);
  if (idx === -1) return <Navigate to="/docs" replace />;
  const chapter = DOCS[idx];
  const prev = idx > 0 ? DOCS[idx - 1] : null;
  const next = idx < DOCS.length - 1 ? DOCS[idx + 1] : null;
  const Icon = chapter.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
          <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="container relative py-16 md:py-20">
            <Link to="/docs" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-surface-dark-foreground/70 hover:text-primary-glow transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              All Docs
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface-dark-foreground/10 text-primary-glow">
                <Icon className="h-5 w-5" />
              </span>
              <div className="text-[11px] uppercase tracking-[0.2em] text-surface-dark-foreground/60">Chapter {chapter.number}</div>
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">{chapter.title}</h1>
            <p className="mt-4 max-w-2xl text-surface-dark-foreground/75">{chapter.tagline}</p>
          </div>
        </section>

        <section className="container py-16 max-w-3xl">
          <p className="text-lg text-foreground/85 leading-relaxed">{chapter.intro}</p>

          <div className="mt-12 space-y-12">
            {chapter.sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">{sec.heading}</h2>
                <div className="mt-4 space-y-4">
                  {sec.body.map((p, i) => (
                    <p key={i} className="text-foreground/80 leading-relaxed">{p}</p>
                  ))}
                  {sec.bullets && (
                    <ul className="mt-2 space-y-2">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-foreground/80">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/60 flex items-center justify-between gap-4">
            {prev ? (
              <Button variant="outline" asChild>
                <Link to={`/docs/${prev.slug}`}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  {prev.title}
                </Link>
              </Button>
            ) : <span />}
            {next ? (
              <Button variant="hero" asChild>
                <Link to={`/docs/${next.slug}`}>
                  {next.title}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : <span />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DocChapter;
