import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { DOCS } from "@/data/docs";

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
          <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative py-20 md:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-surface-dark-foreground/15 bg-surface-dark-foreground/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-surface-dark-foreground/70">
              <FileText className="h-3.5 w-3.5" />
              Technical Whitepaper · v1.0 · 2026
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              BlockTerraLab Documentation
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-surface-dark-foreground/75 leading-relaxed">
              A decentralized real-world asset tokenization protocol powered by Cellular Automata consensus. Explore the full technical architecture, vision, and consensus model.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="pill" asChild>
                <Link to={`/docs/${DOCS[0].slug}`}>
                  Start reading
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Table of Contents</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">Document structure</h2>
            <p className="mt-3 text-muted-foreground">Six chapters covering challenges, vision, technology foundations, network architecture, consensus, and conclusions.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {DOCS.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Link
                  key={chapter.slug}
                  to={`/docs/${chapter.slug}`}
                  className="group relative rounded-2xl border border-border/70 bg-card p-6 hover:shadow-elevated hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Chapter {chapter.number}</div>
                      <h3 className="mt-1 font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {chapter.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{chapter.tagline}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
