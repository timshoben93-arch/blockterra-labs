import { MapPin, Mail } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Header />
      <main id="main">
        {/* Hero */}
        <section className="bg-hero-radial border-b border-border/60">
          <div className="container py-24 lg:py-32 max-w-5xl">
            <Eyebrow>About · TokenBrickLabs</Eyebrow>
            <h1 className="mt-6 font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]">
              The team building the
              <br className="hidden md:block" />{" "}
              <span className="text-gradient">on-chain real economy</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground font-normal">
              We're a Seattle-based studio of engineers, designers and operators
              tokenizing real-world assets — starting with real estate.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
              {[
                ["Founded", "2025"],
                ["HQ", "Seattle, WA"],
                ["Focus", "RWA · AI · Web3"],
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

        <section id="studio" className="border-b border-border/60">
          <div className="container py-20 lg:py-28">
            <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2 lg:gap-y-14 lg:items-center">
              <div>
                <Eyebrow>Company · Introduction</Eyebrow>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                  The tables where real assets become <span className="text-gradient">on-chain</span>
                </h2>
                <p className="mt-7 text-base md:text-lg leading-relaxed text-muted-foreground">
                  TokenBrickLabs is a Seattle studio of engineers, designers, and operators. We design, audit, and
                  deploy tokenization stacks that funds, fintechs, and asset operators can actually run — from
                  compliant issuance to custody, NAV, and secondary settlement.
                </p>
              </div>
              <figure className="overflow-hidden rounded-2xl border border-border/70 shadow-soft">
                <img src={STUDIO[0].src} alt={STUDIO[0].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                This is the work, not the pitch deck. Spreadsheets and dashboards on the table. A tablet with the
                numbers everyone is pointing at. A room that goes quiet while someone walks through transfer rules,
                identity rails, or how a coupon actually pays. Then the conversation opens up again — the hard
                questions, the sequencing, the path from structure to issuance to operations.
              </p>
              <figure className="overflow-hidden rounded-2xl border border-border/70 shadow-soft">
                <img src={STUDIO[1].src} alt={STUDIO[1].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>

              <div>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  We sit with the asset, the jurisdiction, and the operating reality first. Real estate is where we
                  start. The standard is production, not theater.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" asChild>
                    <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                      Book a discovery call
                    </a>
                  </Button>
                  <Button variant="soft" size="lg" asChild>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </Button>
                </div>
              </div>
              <figure className="overflow-hidden rounded-2xl border border-border/70 shadow-soft">
                <img src={STUDIO[2].src} alt={STUDIO[2].alt} className="h-56 w-full object-cover sm:h-64 lg:h-[17.5rem]" />
              </figure>
            </div>
          </div>
        </section>

        {/* HQ + Map */}
        <section id="hq" className="border-t border-border/60 bg-secondary/30">
          <div className="container py-24 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Headquarters</Eyebrow>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                Find us in <span className="text-gradient">Seattle</span>
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                Our studio sits in downtown Seattle, steps from the waterfront
                and the city's growing Web3 community.
              </p>
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch min-w-0">
              <Card className="p-6 sm:p-8 min-w-0 break-words lg:col-span-1 bg-card border-border/70 shadow-soft">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Visit · Contact
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {name}
                </h3>

                <ul className="mt-7 space-y-5 text-[15px]">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Address
                      </div>
                      <div className="mt-0.5 font-medium text-foreground leading-snug">
                        {address}
                      </div>
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
                        href="mailto:support@tokenbricklabs.com"
                        className="mt-0.5 block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        support@tokenbricklabs.com
                      </a>
                    </div>
                  </li>
                </ul>
              </Card>

              <div className="lg:col-span-2 min-w-0 rounded-2xl overflow-hidden border border-border/70 shadow-soft min-h-[460px] bg-card">
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
