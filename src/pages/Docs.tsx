import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { DOCS, WHITEPAPER } from "@/data/docs";

const Docs = () => {
  useEffect(() => {
    document.title = "Research & Insights — TokenBrickLabs | RWA Tokenization";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Independent research on real-world asset tokenization, digital securities, blockchain infrastructure and institutional adoption. TokenBrickLabs Research & Insights.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
          <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative py-20 md:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
              <FileText className="h-3.5 w-3.5" />
              Research & Insights · {WHITEPAPER.edition} · v{WHITEPAPER.version} · {WHITEPAPER.date}
            </div>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(1.85rem,5.5vw,3.75rem)] font-bold tracking-tight text-white">
              Research on real-world asset <span className="text-gradient">tokenisation</span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              {WHITEPAPER.audience}. Independent analysis connecting financial markets, digital securities and
              tokenization infrastructure.
            </p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button variant="hero" size="pill" className="w-full sm:w-auto" asChild>
                <Link to={`/docs/${DOCS[0].slug}`}>
                  Start reading
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="pill"
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                asChild
              >
                <a href="/TokenBrick_Labs_RWA_Whitepaper_v1.0.pdf" download="TokenBrick_Labs_RWA_Whitepaper_v1.0.pdf">
                  Download Document
                  <Download className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Important information</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">Purpose, scope and limitations</h2>
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This research publication is provided for general informational and strategic discussion. It
                examines the potential of real-world asset tokenisation and a long-term framework for
                institutional digital asset markets. References to possible products, services, business models,
                development priorities and future capabilities are illustrative and forward-looking. They do not
                state or imply that any specific product is commercially available, any service is being offered,
                any project has been completed, or any regulatory permission has been obtained.
              </p>
              <p>
                TokenBrickLabs is an independent RWA research and innovation company. Content here is intended to
                establish intellectual credibility around financial markets and tokenization technology — not to
                market a proprietary issuance platform or claim regulated financial activities.
              </p>
              <p>
                The legal and regulatory treatment of a tokenised structure depends on the rights created,
                governing documents, asset type, activities and relevant jurisdictions. This publication is not an
                offer, solicitation, prospectus, regulated crypto-asset white paper, investment recommendation, or
                legal, tax or financial advice. No representation is made that tokenisation guarantees liquidity,
                capital protection, returns or regulatory compliance.
              </p>
              <p>
                Any actual transaction would require separate documentation, disclosures, due diligence and
                professional advice. Status: {WHITEPAPER.status}.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contents</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">Research chapters</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Coverage spans real-world asset tokenization, digital securities, blockchain infrastructure, custody,
              compliance, settlement, interoperability and the tokenized asset lifecycle.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {DOCS.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Link
                  key={chapter.slug}
                  to={`/docs/${chapter.slug}`}
                  className="group relative rounded-4xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated md:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Chapter {chapter.number}
                      </div>
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
