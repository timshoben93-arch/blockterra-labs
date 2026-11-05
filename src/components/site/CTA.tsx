import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const CTA = () => {
  return (
    <section id="contact" className="border-b border-border py-20 md:py-28" aria-labelledby="cta-heading">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl bg-surface-dark p-6 text-surface-dark-foreground shadow-elevated sm:rounded-5xl sm:p-8 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-primary/30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-4 top-16 h-44 w-44 rounded-full border border-[#ffc81f]/35" aria-hidden="true" />
          <div className="relative min-w-0 max-w-2xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
            <h2
              id="cta-heading"
              className="mt-4 text-balance font-display text-[clamp(1.65rem,4.5vw,3rem)] font-semibold tracking-tight text-white"
            >
              Let&apos;s Advance the Tokenized Asset Economy Together.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              We welcome conversations with financial institutions, asset owners, asset managers, tokenization
              platforms, blockchain technology providers, institutional investors, research institutions and
              potential strategic partners.
            </p>
          </div>
          <div className="relative mt-8 flex min-w-0 flex-col gap-3 sm:flex-row md:mt-0 md:flex-col">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                Book a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              variant="soft"
              size="lg"
              className="max-w-full whitespace-normal break-all border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
