import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const CTA = () => {
  return (
    <section id="contact" className="border-b border-border py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="container">
        <div className="grid gap-10 border border-border bg-card p-8 md:grid-cols-[1fr_auto] md:items-end md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
            <h2 id="cta-heading" className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Let&apos;s Advance the Tokenized Asset Economy Together.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We welcome conversations with financial institutions, asset owners, asset managers, tokenization
              platforms, blockchain technology providers, institutional investors, research institutions and
              potential strategic partners.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                Book a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="soft" size="lg" asChild>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
