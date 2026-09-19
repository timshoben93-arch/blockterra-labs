import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { WHITEPAPER, WHITEPAPER_NOTICE, WHITEPAPER_SECTIONS, type WhitepaperBlock } from "@/data/whitepaper";

const Blocks = ({ blocks }: { blocks: WhitepaperBlock[] }) => (
  <div className="wp-prose">
    {blocks.map((b, i) => {
      if (b.type === "h3") {
        return (
          <h3 key={i} className="mt-6 font-display text-[1.05rem] font-semibold tracking-tight text-foreground">
            {b.text}
          </h3>
        );
      }
      if (b.type === "ul") {
        return (
          <ul key={i} className="mt-3 space-y-1.5">
            {b.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-[13.5px] leading-[1.55] text-foreground/85">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="mt-3 text-[13.5px] leading-[1.62] text-muted-foreground first:mt-0">
          {b.text}
        </p>
      );
    })}
  </div>
);

const WhitePaper = () => {
  useEffect(() => {
    document.title = `${WHITEPAPER.title} | TokenBrickLabs`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "TokenBrickLabs 20-page company white paper: RWA tokenization architecture, ERC-3643, identity, custody, servicing, and delivery methodology.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans wp-root">
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main">
        <div className="print:hidden border-b border-border bg-surface-dark text-surface-dark-foreground">
          <div className="container flex flex-col gap-4 py-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link to="/docs" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-surface-dark-foreground/60 hover:text-primary">
                <ArrowLeft className="h-3.5 w-3.5" />
                Docs
              </Link>
              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{WHITEPAPER.title}</h1>
              <p className="mt-2 text-sm text-surface-dark-foreground/70">
                {WHITEPAPER.pages}-page company document · v{WHITEPAPER.version} · {WHITEPAPER.date}
              </p>
            </div>
            <Button variant="hero" size="lg" type="button" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print / save PDF
            </Button>
          </div>
        </div>

        <div className="wp-document mx-auto max-w-[820px] px-4 py-10 sm:px-6 print:max-w-none print:px-0 print:py-0">
          <section className="wp-sheet wp-cover border border-border bg-card p-10 print:border-0 md:p-14">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
              {WHITEPAPER.classification} · v{WHITEPAPER.version}
            </p>
            <p className="mt-10 font-display text-sm font-medium text-muted-foreground">{SITE.name}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              {WHITEPAPER.subtitle}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              A {WHITEPAPER.pages}-page operating paper for sponsors, counsel, and engineering leads. Distinct from the
              six-chapter protocol documentation.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 text-sm sm:grid-cols-4">
              {[
                ["Version", WHITEPAPER.version],
                ["Date", WHITEPAPER.date],
                ["HQ", SITE.location],
                ["Pages", String(WHITEPAPER.pages)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{WHITEPAPER.classificationLine}</p>
          </section>

          <section className="wp-sheet mt-8 border border-border bg-card p-10 print:mt-0 print:border-0 md:p-14">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Contents</h2>
            <ol className="mt-6 space-y-2">
              {WHITEPAPER_SECTIONS.map((s) => (
                <li key={s.id} className="flex gap-3 text-sm">
                  <span className="w-8 shrink-0 font-display font-semibold text-primary">{s.number}</span>
                  <a href={`#${s.id}`} className="text-foreground/85 hover:text-primary">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {WHITEPAPER_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="wp-sheet mt-8 scroll-mt-24 border border-border bg-card p-10 print:mt-0 print:border-0 md:p-14"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                Section {section.number}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">{section.title}</h2>
              <div className="mt-5">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}

          <section className="wp-sheet mt-8 border border-border bg-card p-10 print:mt-0 print:border-0 md:p-14">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Document control</h2>
            <p className="mt-5 text-[13.5px] leading-[1.62] text-muted-foreground">{WHITEPAPER_NOTICE}</p>
            <p className="mt-4 text-[13.5px] leading-[1.62] text-muted-foreground">
              {WHITEPAPER.title}, version {WHITEPAPER.version}, {WHITEPAPER.date}. Target length: {WHITEPAPER.pages}{" "}
              pages. Contact {SITE.email}. Headquarters: 1208 2nd Avenue, {SITE.location} 98101.
            </p>
          </section>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default WhitePaper;
