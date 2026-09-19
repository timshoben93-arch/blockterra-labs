import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { DEPARTMENTS, TALENTS, type Department, type Talent } from "@/data/talents";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    title: "Craft over theater",
    body: "We ship systems institutions can operate — contracts, identity, custody — not slide-deck prototypes.",
  },
  {
    title: "High ownership, low ceremony",
    body: "Small teams, written decisions, and clear owners. You will see your work in production.",
  },
  {
    title: "Global by default",
    body: "Remote-first, Seattle HQ. We hire for judgment and communication, not a zip code.",
  },
];

const BENEFITS = [
  "Competitive salary with token and equity packages",
  "Remote work, with optional time in Seattle",
  "Signing and performance bonuses",
  "Sponsored conferences and an annual offsite",
  "Equipment stipend and learning budget",
  "Flexible hours across time zones",
];

const grouped = (roles: Talent[]) => {
  const map = new Map<Department, Talent[]>();
  for (const role of roles) {
    const list = map.get(role.department) ?? [];
    list.push(role);
    map.set(role.department, list);
  }
  return DEPARTMENTS.map((dept) => ({ dept, roles: map.get(dept) ?? [] })).filter((g) => g.roles.length > 0);
};

const TalentsIndex = () => {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<"All" | Department>("All");

  useEffect(() => {
    document.title = "Careers — TokenBrickLabs";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Open roles at TokenBrickLabs. Join a remote-first studio building production RWA tokenization — engineering, design, product, and go-to-market.",
      );
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TALENTS.filter((t) => {
      if (department !== "All" && t.department !== department) return false;
      if (!q) return true;
      return [t.title, t.short, t.tagline, t.department, t.location].join(" ").toLowerCase().includes(q);
    });
  }, [query, department]);

  const groups = grouped(filtered);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main id="main">
        <section className="border-b border-border">
          <div className="container py-16 sm:py-20 lg:py-24">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Careers</p>
            <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
              <div>
                <h1 className="font-sans text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Build the rails for real-world assets
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  TokenBrickLabs is a Seattle-based studio hiring globally. We design, audit, and operate
                  tokenization infrastructure for funds, fintechs, and operators.
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Open roles</dt>
                  <dd className="mt-2 font-sans text-2xl font-semibold tabular-nums">{TALENTS.length}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Teams</dt>
                  <dd className="mt-2 font-sans text-2xl font-semibold">{DEPARTMENTS.length}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Where</dt>
                  <dd className="mt-2 font-sans text-2xl font-semibold">Remote</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 md:py-20">
          <div className="container">
            <div className="grid gap-10 md:grid-cols-3">
              {VALUES.map((v) => (
                <article key={v.title}>
                  <h2 className="font-sans text-lg font-semibold tracking-tight">{v.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="open-roles" className="scroll-mt-24 py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Open positions</p>
                <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">Join the team</h2>
              </div>
              <a
                href={`mailto:${SITE.email}?subject=General application — TokenBrickLabs`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline hover:underline-offset-4"
              >
                Don’t see a fit? Send a general application
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-y border-border py-4 lg:flex-row lg:items-center lg:justify-between">
              <div role="tablist" aria-label="Filter by team" className="flex flex-wrap gap-1">
                {(["All", ...DEPARTMENTS] as const).map((dept) => {
                  const count = dept === "All" ? TALENTS.length : TALENTS.filter((t) => t.department === dept).length;
                  const selected = department === dept;
                  return (
                    <button
                      key={dept}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setDepartment(dept)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-sm transition-colors",
                        selected
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                      )}
                    >
                      {dept}
                      <span className="ml-1.5 tabular-nums text-muted-foreground">{count}</span>
                    </button>
                  );
                })}
              </div>
              <div className="relative w-full lg:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <label htmlFor="role-search" className="sr-only">
                  Search roles
                </label>
                <input
                  id="role-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roles"
                  className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 font-sans text-sm tracking-[-0.01em] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            {groups.length === 0 ? (
              <p className="mt-12 text-muted-foreground">No roles match that search. Try another team or keyword.</p>
            ) : (
              <div className="mt-4">
                {groups.map(({ dept, roles }) => (
                  <div key={dept} className="border-b border-border py-10 first:pt-8 last:border-b-0">
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {dept}
                    </h3>
                    <ul className="mt-4 divide-y divide-border border-y border-border">
                      {roles.map((role) => (
                        <li key={role.slug}>
                          <Link
                            to={`/talents/${role.slug}`}
                            className="group grid gap-2 py-5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_auto] sm:items-center sm:gap-6"
                          >
                            <div>
                              <p className="font-sans text-lg font-semibold tracking-tight group-hover:text-primary">
                                {role.title}
                              </p>
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{role.tagline}</p>
                            </div>
                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                {role.location}
                              </span>
                              <span>{role.employmentType}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                              View role
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-border bg-surface-raised py-16 md:py-20">
          <div className="container grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Working here</p>
              <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight">What we offer</h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Compensation and benefits are calibrated for senior operators. Details are confirmed in the offer.
              </p>
            </div>
            <ul className="grid gap-px bg-border sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <li key={b} className="bg-background px-5 py-4 text-sm leading-relaxed text-foreground/85">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default TalentsIndex;
