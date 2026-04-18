import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-8 py-16 md:px-16 md:py-24 text-primary-foreground shadow-elevated">
          <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-highlight/30 blur-3xl" />

          <div className="relative max-w-3xl">
            <span className="inline-flex rounded-full bg-primary-foreground/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Ready when you are
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Let's bring your asset on-chain.
            </h2>
            <p className="mt-5 text-lg md:text-xl text-primary-foreground/85 max-w-2xl">
              Book a 30-minute discovery call. We'll map your tokenization journey,
              regulatory path, and a realistic launch timeline — at no cost.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="xl" className="bg-background text-foreground hover:bg-background/90 group" asChild>
                <a href="https://calendly.com/blockterralab-support/30min" target="_blank" rel="noopener noreferrer">
                  Book a Discovery Call
                  <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="mailto:support@blockterralab.com">support@blockterralab.com</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
