import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { DOCS, WHITEPAPER } from "@/data/docs";

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
          <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative py-20 md:py-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-surface-dark-foreground/15 bg-surface-dark-foreground/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-surface-dark-foreground/70">
              <FileText className="h-3.5 w-3.5" />
              {WHITEPAPER.edition} · Version {WHITEPAPER.version} · {WHITEPAPER.date}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
              Real-world asset <span className="text-gradient">tokenisation</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-surface-dark-foreground/75 leading-relaxed">
              {WHITEPAPER.audience}. Building the foundations for a more connected digital asset economy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="pill" asChild>
                <Link to={`/docs/${DOCS[0].slug}`}>
                  Start reading
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="pill"
                className="border-surface-dark-foreground/30 bg-transparent text-surface-dark-foreground hover:bg-surface-dark-foreground/10 hover:text-surface-dark-foreground"
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
                This whitepaper is published for general informational and strategic discussion. It describes the potential of real-world asset tokenisation and TokenBrick Labs&apos; long-term five-pillar target ecosystem. References to possible products, services, business models, development priorities and future capabilities are illustrative and forward-looking. They do not state or imply that any specific product is commercially available, any service is being offered, any project has been completed, or any regulatory permission has been obtained.
              </p>
              <p>
                The legal and regulatory treatment of a tokenised structure depends on the rights created, governing documents, asset type, activities and relevant jurisdictions. This publication is not an offer, solicitation, prospectus, regulated crypto-asset white paper, investment recommendation, or legal, tax or financial advice. It is not intended to satisfy disclosure requirements for any specific issuance, offer or admission to trading and must not be relied upon to make an investment decision. No representation is made that tokenisation guarantees liquidity, capital protection, returns or regulatory compliance.
              </p>
              <p>
                Any actual transaction would require separate documentation, disclosures, due diligence and professional advice. Readers should consult appropriately qualified advisers. Status: {WHITEPAPER.status}.
              </p>
              <p className="text-sm">
                The references support general industry, technical and regulatory propositions. They do not verify TokenBrick Labs-specific products, licences, projects, customers, partnerships, financial position or operational performance.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contents</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">Whitepaper structure</h2>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {DOCS.map((chapter) => {
              const Icon = chapter.icon;
              return (
                <Link
                  key={chapter.slug}
                  to={`/docs/${chapter.slug}`}
                  className="group relative rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
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
