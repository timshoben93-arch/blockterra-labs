import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-rwa-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-surface-dark">
      {/* RWA themed background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/60 to-surface-dark/90" aria-hidden="true" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl animate-glow-pulse mix-blend-screen" />
      <div className="pointer-events-none absolute top-40 right-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float mix-blend-screen" />
      <div className="pointer-events-none absolute top-60 left-10 h-72 w-72 rounded-full bg-highlight/15 blur-3xl animate-float mix-blend-screen" style={{ animationDelay: "2s" }} />

      <div className="container relative pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="mx-auto max-w-5xl text-center animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur px-4 py-2 text-xs font-medium text-white/85 shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" />
            Engineering Real Assets, On-Chain
          </span>

          <h1 className="mt-8 font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            The <span className="text-gradient">Tokenization Lab</span>
            <br className="hidden sm:block" /> for Real-World Assets &{" "}
            <span className="text-gradient">Blockchain</span> Innovation
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            BlockTerraLab partners with funds, fintechs and enterprises to design,
            audit and ship production-grade <span className="text-gradient-warm font-semibold">RWA tokenization</span> platforms — bridging
            real assets with on-chain liquidity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="https://calendly.com/blockterralab-support/30min" target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
                <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="soft" size="xl">
              Explore Solutions
            </Button>
          </div>

        </div>
      </div>

      {/* Trusted-by bar */}
      <div className="container pb-20">
        <div className="rounded-3xl bg-surface-dark text-surface-dark-foreground py-6 px-8 shadow-elevated">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-12 gap-y-4 opacity-90">
            <span className="text-xs uppercase tracking-[0.2em] text-surface-dark-foreground/60">
              Trusted by
            </span>
            {["Helix Capital", "Terra Yield", "OnChain RE", "Aurum DAO", "Stratum Labs", "Veridian"].map((n) => (
              <span key={n} className="font-display font-semibold text-base md:text-lg tracking-tight">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
