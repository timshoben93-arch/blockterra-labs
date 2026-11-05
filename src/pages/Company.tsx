import { MapPin, Mail } from "lucide-react";
import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COMPANY_LOCATION } from "@/data/company";
import { SITE } from "@/lib/site";
import studioCharts from "@/assets/studio-charts.jpg";
import studioSession from "@/assets/studio-session.jpg";
import studioConversation from "@/assets/studio-conversation.jpg";

const STUDIO = [
  { src: studioCharts, alt: "Hands around charts, notes, and a tablet dashboard during a working session" },
  { src: studioSession, alt: "A working conversation in a glass-walled meeting room" },
  { src: studioConversation, alt: "A focused conversation between colleagues across a table" },
] as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
    {children}
  </span>
);

const Company = () => {
  const { lat, lon, address, name } = COMPANY_LOCATION;
  const d = 0.01;
  const bbox = `${lon - d}%2C${lat - d}%2C${lon + d}%2C${lat + d}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

  useEffect(() => {
    document.title = "About Us — TokenBrickLabs | RWA Research & Innovation";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "TokenBrickLabs is an independent RWA research and innovation company bridging traditional financial markets and tokenized asset infrastructure.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Header />
      <main id="main">
        <section className="bg-hero-radial border-b border-border/60">
          <div className="container py-24 lg:py-32 max-w-5xl">
            <Eyebrow>About · TokenBrickLabs</Eyebrow>
            <h1 className="mt-6 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]">
              An independent partner for
              <br className="hidden md:block" />{" "}
              <span className="text-gradient">tokenized real-world assets</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground font-normal">
              We help financial institutions, asset owners and technology platforms advance the infrastructure
              and practical application of tokenized real-world assets — through research, collaboration and
              applied innovation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
              {[
                ["Philosophy", "Research. Connect. Build."],
                ["Base", "Seattle, WA"],
                ["Stance", "Platform-neutral"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {k}
                  </span>
                  <span className="mt-1 font-display text-base font-semibold tracking-tight text-foreground">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="purpose" className="border-b border-border/60">
          <div className="container py-20 lg:py-28">
            <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-y-14 lg:items-center">
              <div>
                <Eyebrow>Purpose & identity</Eyebrow>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                  Bridging traditional markets and{" "}
                  <span className="text-gradient">digital asset infrastructure</span>
                </h2>
                <p className="mt-7 text-base md:text-lg leading-relaxed text-muted-foreground">
                  TokenBrickLabs operates at the intersection of traditional financial markets, real-world asset
                  tokenization, blockchain technology, digital securities infrastructure, asset management and
                  institutional digital asset markets. We are a research, technology innovation and ecosystem
                  development partner — not a cryptocurrency exchange, token issuance platform, asset manager or
                  conventional management consultancy.
                </p>
              </div>
              <figure className="media-frame border border-border">
                <img src={STUDIO[0].src} alt={STUDIO[0].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                Our role is to research, evaluate, connect, design, collaborate and support the development of
                institutional-grade tokenization solutions. We take a platform-neutral approach: objective
                technical evaluation and multi-provider collaboration, rather than forcing a single proprietary
                stack.
              </p>
              <figure className="media-frame border border-border">
                <img src={STUDIO[1].src} alt={STUDIO[1].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>

              <div>
                <Eyebrow>Vision & mission</Eyebrow>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">Vision</h3>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground">
                  To contribute to the development of an efficient, interoperable, transparent and institutionally
                  credible global market for tokenized real-world assets.
                </p>
                <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">Mission</h3>
                <p className="mt-3 text-base md:text-lg leading-relaxed text-muted-foreground">
                  To advance the understanding, technical foundations and commercial application of RWA
                  tokenization through independent research, applied experimentation and strategic collaboration
                  with financial institutions and technology providers.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                      Book a conversation
                    </a>
                  </Button>
                  <Button variant="soft" size="lg" asChild>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </Button>
                </div>
              </div>
              <figure className="media-frame border border-border">
                <img src={STUDIO[2].src} alt={STUDIO[2].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>
            </div>
          </div>
        </section>

        <section id="commercial" className="border-b border-border/60">
          <div className="container py-20 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow>How we engage</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                Research, collaboration and applied innovation
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                Commercial engagement combines independent research, technical expertise and strategic
                collaboration — without positioning TokenBrickLabs as a conventional consultancy or a competing
                tokenization platform.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Research subscriptions and membership",
                "Strategic advisory assignments",
                "Technical research and architecture assessments",
                "Platform collaboration and development support",
                "Joint innovation programmes",
                "Pilot projects and proof-of-concept initiatives",
                "Industry research partnerships",
                "Executive briefings and educational workshops",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-4xl border border-border bg-card px-5 py-4 text-sm shadow-soft md:text-base text-foreground/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="commitments" className="border-b border-border/60 bg-secondary/20">
          <div className="container py-20 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow>Governance & commitments</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                How we work with institutions
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Independent research", "Evidence-based analysis without fabricated findings or unverified partnership claims."],
                ["Technology neutrality", "Objective evaluation across providers, architectures and operating models."],
                ["Transparent relationships", "Clear commercial scopes for research, advisory and collaboration support."],
                ["Institutional requirements", "Designs and assessments that respect compliance, custody and operating reality."],
                ["Responsible innovation", "Pilots and proofs of concept with bounded claims and measurable criteria."],
                ["Confidentiality", "Appropriate intellectual property and confidentiality arrangements for sensitive work."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-4xl border border-border bg-card p-7 shadow-soft">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Research, advisory and development support are distinct from regulated financial activities. This
              website does not claim regulatory authorization, custody capabilities, investment management
              services or financial services licences.
            </p>
          </div>
        </section>

        <section id="hq" className="border-t border-border/60 bg-secondary/30">
          <div className="container py-24 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Headquarters</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                Based in <span className="text-gradient">Seattle</span>
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                We are a remote-first team with a Seattle, Washington base. We do not publish a walk-in street
                address on this site. Reach us by email or a booked conversation.
              </p>
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch min-w-0">
              <Card className="min-w-0 break-words rounded-4xl border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Contact
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{name}</h3>

                <ul className="mt-7 space-y-5 text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Address
                      </div>
                      <div className="mt-0.5 font-medium text-foreground leading-snug">{address}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Email
                      </div>
                      <a
                        href={`mailto:${SITE.email}`}
                        className="mt-0.5 block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                </ul>
              </Card>

              <div className="media-frame lg:col-span-2 min-h-[460px] min-w-0 border border-border bg-card">
                <iframe
                  title="TokenBrickLabs HQ map"
                  src={mapSrc}
                  className="w-full h-full min-h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Company;
