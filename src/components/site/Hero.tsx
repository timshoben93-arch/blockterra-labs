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

/**
 * Mastercard-inspired hero: light canvas, large rounded media frame,
 * self-hosted muted loop (never a login-gated embed).
 */
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
    <section className="relative overflow-x-clip bg-hero-radial pb-10 pt-4 sm:pb-14 sm:pt-6">
      <div className="brand-circles absolute inset-0" aria-hidden="true" />
      <div className="container relative">
        <div className="media-frame relative isolate min-h-[560px] sm:min-h-[600px] lg:min-h-[680px]">
          <div
            className="absolute inset-0 bg-[#141413] bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_VIDEO.poster})` }}
            aria-hidden="true"
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

          <div className="absolute inset-0 bg-gradient-to-r from-[#141413]/88 via-[#141413]/55 to-[#141413]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/70 via-transparent to-[#141413]/20" />

          {/* Circle outlines over media */}
          <div className="pointer-events-none absolute -right-[8%] top-[12%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] rounded-full border border-[#ff671b]/35" aria-hidden="true" />
          <div className="pointer-events-none absolute right-[10%] top-[28%] h-[min(36vw,20rem)] w-[min(36vw,20rem)] rounded-full border border-[#ffc81f]/40" aria-hidden="true" />

          <div className="relative flex min-h-[560px] items-end px-6 py-10 sm:min-h-[600px] sm:px-10 sm:py-14 lg:min-h-[680px] lg:px-14 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                TokenBrickLabs · Research. Connect. Build.
              </p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]">
                Advancing the Future of
                <br />
                <span className="whitespace-nowrap text-primary">Tokenized Real-World Assets</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white sm:text-lg">
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
                <Button
                  variant="soft"
                  size="lg"
                  className="border-white/35 bg-white/10 text-white hover:bg-white/18 hover:text-white"
                  asChild
                >
                  <Link to="/docs">Explore research</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
