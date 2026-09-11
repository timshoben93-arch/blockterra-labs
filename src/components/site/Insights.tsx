import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DOCS } from "@/data/docs";
import { SectionHeading } from "@/components/site/SectionHeading";

const picks = [
  DOCS.find((d) => d.slug === "challenges")!,
  DOCS.find((d) => d.slug === "vision")!,
  DOCS.find((d) => d.slug === "consensus")!,
];

export const Insights = () => {
  return (
    <section id="insights" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Insights"
          title="Architecture notes from the protocol papers"
          description="Long-form chapters on constraints, vision, and consensus — written for engineers and counsel, not a blog farm."
        />

        <ul className="mt-14 divide-y divide-border border-y border-border">
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
      </div>
    </section>
  );
};
