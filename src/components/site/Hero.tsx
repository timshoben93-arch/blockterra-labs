import { useEffect, useRef } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (motion.matches) {
        video.pause();
        return;
      }
      video.play().catch(() => {});
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative overflow-x-clip border-b border-border">
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
        <div className="max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            Seattle · Institutional RWA engineering
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Tokenize real assets. Ship rails institutions can operate
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            TokenBrickLabs designs, audits, and deploys production tokenization stacks for funds,
            fintechs, and operators — from compliant issuance to custody, NAV, and secondary
            settlement.
          </p>
        </div>
      </div>
    </section>
  );
};
