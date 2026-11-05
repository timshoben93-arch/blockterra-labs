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
    <section id="insights" className="scroll-mt-24 border-b border-border py-20 md:py-28">
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

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-10">
          {themes.map((t) => (
            <li key={t} className="text-sm text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-4 divide-y divide-border border-b border-border">
          {picks.map((doc) => (
            <li key={doc.slug}>
              <Link
                to={`/docs/${doc.slug}`}
                className="group flex flex-col gap-3 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
              >
                <div className="flex min-w-0 items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-primary">{doc.number}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{doc.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">{doc.tagline}</p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary">
                  Read chapter
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link to="/docs" className="text-sm font-medium text-primary hover:underline">
            View all research chapters →
          </Link>
        </div>
      </div>
    </section>
  );
};
