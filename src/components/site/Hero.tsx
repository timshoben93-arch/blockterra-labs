import heroLanding from "@/assets/hero-landing.jpg";

export const Hero = () => {
  return (
    <section className="relative border-b border-border">
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="hero-sharpen" colorInterpolationFilters="sRGB">
          <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.2 0 -0.2 1.8 -0.2 0 -0.2 0" />
        </filter>
      </svg>
      <img
        src={heroLanding}
        alt=""
        className="block h-auto w-full [filter:url(#hero-sharpen)] md:absolute md:inset-0 md:h-full md:object-contain md:object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background/75 from-0% via-background/30 via-[34%] to-transparent to-[72%] md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-transparent from-[88%] to-background md:block"
        aria-hidden="true"
      />

      <div className="relative flex items-center md:min-h-[calc(100vw*517/1024)]">
        <div className="container py-12 sm:py-16 lg:py-24">
          <div className="max-w-6xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              Seattle · RWA tokenization platform
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              Our platform for <span className="text-gradient">real assets</span>
              <br />
              Built for institutions
              <br />
              that have to operate
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              TokenBrickLabs is developing its own real-world asset tokenization platform — permissioned
              issuance, identity, servicing, and the operator workflows around them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
