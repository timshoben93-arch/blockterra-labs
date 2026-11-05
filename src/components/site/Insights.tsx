import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DOCS } from "@/data/docs";
import { SectionHeading } from "@/components/site/SectionHeading";

const picks = [
  DOCS.find((d) => d.slug === "executive-summary")!,
  DOCS.find((d) => d.slug === "understanding-rwa")!,
  DOCS.find((d) => d.slug === "infrastructure")!,
];

const themes = [
  "Real-world asset tokenization",
  "Tokenized investment funds",
  "Real estate tokenization",
  "Private equity and private credit",
  "Fixed income and digital securities",
  "Blockchain infrastructure",
  "Smart contracts and token standards",
  "Digital asset custody",
  "Compliance and investor eligibility",
  "Settlement and interoperability",
  "Tokenized asset lifecycle management",
];

export const Insights = () => {
  return (
    <section id="insights" className="scroll-mt-24 border-b border-border bg-surface-muted py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Research & Insights"
          title={
            <>
              A knowledge platform for <span className="text-gradient">tokenized markets</span>
            </>
          }
          description="Independent analysis connecting financial-market reality with tokenization technology — without fabricated statistics or unverified partnership claims."
        />

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {themes.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-soft"
            >
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {picks.map((doc) => (
            <li key={doc.slug}>
              <Link
                to={`/docs/${doc.slug}`}
                className="group flex h-full flex-col rounded-4xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift md:p-8"
              >
                <span className="font-display text-sm font-semibold text-primary">{doc.number}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{doc.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{doc.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read chapter
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-primary"
          >
            View all research chapters
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
