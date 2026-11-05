import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { HERO_VIDEO } from "@/data/featuredVideo";

const pickVideoSrc = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
    ? HERO_VIDEO.srcMobile
    : HERO_VIDEO.src;

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO.src);

  useEffect(() => {
    setVideoSrc(pickVideoSrc());

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(max-width: 767px)");

    const applyMotionPref = () => setReduceMotion(motion.matches);
    const applyWidthPref = () => setVideoSrc(pickVideoSrc());

    applyMotionPref();
    motion.addEventListener("change", applyMotionPref);
    widthQuery.addEventListener("change", applyWidthPref);

    return () => {
      motion.removeEventListener("change", applyMotionPref);
      widthQuery.removeEventListener("change", applyWidthPref);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const sync = () => {
      video.play().catch(() => {});
    };

    sync();
    video.addEventListener("loadedmetadata", sync);
    return () => video.removeEventListener("loadedmetadata", sync);
  }, [reduceMotion, videoSrc]);

  return (
    <section className="relative flex min-h-[630px] items-center overflow-x-clip border-b border-border sm:min-h-[605px] lg:min-h-[713px]">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[#050b16] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_VIDEO.poster})` }}
        />

        {!reduceMotion ? (
          <video
            key={videoSrc}
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_VIDEO.poster}
            src={videoSrc}
          />
        ) : null}

        <div className="absolute inset-0 bg-[#050b16]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
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
