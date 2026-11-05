import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { FEATURED_VIDEO } from "@/data/featuredVideo";

const HERO_POSTER = `https://i.ytimg.com/vi/${FEATURED_VIDEO.youtubeId}/maxresdefault.jpg`;

/** Muted, looping YouTube embed — no download / redistribution of third-party media. */
const heroEmbedSrc = () =>
  `https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.youtubeId}` +
  `?autoplay=1&mute=1&controls=0&loop=1&playlist=${FEATURED_VIDEO.youtubeId}` +
  `&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;

export const Hero = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(motion.matches);
    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative flex min-h-[630px] items-center overflow-x-clip border-b border-border sm:min-h-[605px] lg:min-h-[713px]">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[#050b16] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
        />

        {!reduceMotion ? (
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              title=""
              src={heroEmbedSrc()}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-[#050b16]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
      </div>

      <div className="container relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            TokenBrickLabs · Research. Connect. Build.
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
            Advancing the Future of
            <br />
            <span className="text-gradient">Tokenized Real-World Assets</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We research, connect and collaborate with financial institutions and technology innovators to
            advance the infrastructure, technology and practical application of tokenized assets.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button variant="soft" size="lg" asChild>
              <Link to="/docs">Explore research</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
