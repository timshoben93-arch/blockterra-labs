import { MapPin, Mail, Linkedin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TEAM, COMPANY_LOCATION } from "@/data/company";

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
      <main>
        {/* Hero */}
        <section className="bg-hero-radial border-b border-border/60">
          <div className="container py-24 lg:py-32 max-w-5xl">
            <Eyebrow>About · BlockTerraLab</Eyebrow>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]">
              The team building the
              <br className="hidden md:block" />{" "}
              <span className="text-gradient">on-chain real economy.</span>
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

        {/* Team */}
        <section id="team" className="container py-24 lg:py-32">
          <div className="max-w-2xl">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
              Operators and builders, end&#8209;to&#8209;end.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
              A senior team with a track record across Web3 protocols, fintech
              infrastructure and applied AI — shipping production systems used
              by real users.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <Card
                key={m.name}
                className="group p-8 bg-gradient-card border-border/70 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <Avatar className="h-16 w-16 bg-gradient-primary ring-4 ring-primary/5">
                  {m.photo && <AvatarImage src={m.photo} alt={m.name} className="object-cover" />}
                  <AvatarFallback className="bg-transparent text-primary-foreground font-display font-bold tracking-tight text-base">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-5">
                  <div className="font-display text-xl font-bold tracking-tight text-foreground">
                    {m.name}
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {m.role}
                  </div>
                </div>
                {m.bio && (
                  <p className="mt-5 text-[15px] leading-[1.65] text-muted-foreground">
                    {m.bio}
                  </p>
                )}
                {m.linkedin && (
                  <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* HQ + Map */}
        <section id="hq" className="border-t border-border/60 bg-secondary/30">
          <div className="container py-24 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow>Headquarters</Eyebrow>
              <h2 className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                Find us in <span className="text-gradient">Seattle</span>.
              </h2>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                Our studio sits in downtown Seattle, steps from the waterfront
                and the city's growing Web3 community.
              </p>
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-6 items-stretch">
              <Card className="p-8 lg:col-span-1 bg-card border-border/70 shadow-soft">
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
                        href="mailto:support@blockterralab.com"
                        className="mt-0.5 block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        support@blockterralab.com
                      </a>
                    </div>
                  </li>
                </ul>
              </Card>

              <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border/70 shadow-soft min-h-[460px] bg-card">
                <iframe
                  title="BlockTerraLab HQ map"
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
