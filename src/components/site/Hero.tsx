import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      video.playbackRate = 0.5;
      if (motion.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };
    sync();
    video.addEventListener("loadedmetadata", sync);
    motion.addEventListener("change", sync);
    return () => {
      video.removeEventListener("loadedmetadata", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="relative flex min-h-[630px] items-center overflow-x-clip border-b border-border sm:min-h-[605px] lg:min-h-[713px]">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background" />
      </div>

      <div className="container relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            TokenBrickLabs · Research. Connect. Build.
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
            Advancing the Future of{" "}
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
