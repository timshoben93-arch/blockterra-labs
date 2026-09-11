import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { ApplyDialog } from "@/components/talent/ApplyDialog";
import { TALENTS, getTalentBySlug } from "@/data/talents";

const TalentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const talent = slug ? getTalentBySlug(slug) : undefined;
  const [searchParams, setSearchParams] = useSearchParams();
  const [applyOpen, setApplyOpen] = useState(() => searchParams.get("apply") === "1");

  useEffect(() => {
    if (talent) {
      document.title = `${talent.title} — Careers | TokenBrickLabs`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", talent.tagline || talent.overview.slice(0, 160));
    }
  }, [talent]);

  useEffect(() => {
    setApplyOpen(searchParams.get("apply") === "1");
  }, [searchParams]);

  const handleApplyOpenChange = (open: boolean) => {
    setApplyOpen(open);
    const next = new URLSearchParams(searchParams);
    if (open) next.set("apply", "1");
    else next.delete("apply");
    setSearchParams(next, { replace: true });
  };

  if (!talent) return <Navigate to="/talents" replace />;

  const sameTeam = TALENTS.filter((t) => t.slug !== talent.slug && t.department === talent.department);
  const rest = TALENTS.filter((t) => t.slug !== talent.slug && t.department !== talent.department);
  const more = [...sameTeam, ...rest].slice(0, 5);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main id="main">
        <article>
          <header className="border-b border-border">
            <div className="container py-10 md:py-14">
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link to="/talents" className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      Careers
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-foreground">{talent.department}</li>
                </ol>
              </nav>

              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
                    {talent.department}
                  </p>
                  <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                    {talent.title}
                  </h1>
                  {talent.tagline ? (
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{talent.tagline}</p>
                  ) : null}

                  <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm">
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Location
                      </dt>
                      <dd className="mt-1 inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        {talent.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Type
                      </dt>
                      <dd className="mt-1">{talent.employmentType}</dd>
                    </div>
                    {talent.reportsTo ? (
                      <div>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Reports to
                        </dt>
                        <dd className="mt-1">{talent.reportsTo}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>

                <aside className="border border-border bg-card p-6 lg:sticky lg:top-24">
                  <p className="font-sans text-sm font-semibold tracking-tight">Apply for this role</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    We review every application. Typical response is a few business days.
                  </p>
                  <Button variant="hero" size="lg" className="mt-5 w-full" type="button" onClick={() => handleApplyOpenChange(true)}>
                    Apply now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </aside>
              </div>
            </div>
          </header>

          <div className="container grid gap-16 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl space-y-14">
              <section>
                <h2 className="font-sans text-2xl font-semibold tracking-tight">About the role</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {talent.overview.split("\n\n").map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>

              {talent.extraSections?.map((sec) => (
                <section key={sec.heading}>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight">{sec.heading.replace(/:$/, "")}</h2>
                  <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-muted-foreground">{sec.body}</p>
                </section>
              ))}

              <section>
                <h2 className="font-sans text-2xl font-semibold tracking-tight">What you’ll do</h2>
                <ol className="mt-5 divide-y divide-border border-y border-border">
                  {talent.responsibilities.map((item, i) => (
                    <li key={item} className="flex gap-4 py-4">
                      <span className="w-8 shrink-0 text-sm font-semibold tabular-nums text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-foreground/85 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="font-sans text-2xl font-semibold tracking-tight">What we’re looking for</h2>
                <ul className="mt-5 space-y-3">
                  {talent.qualifications.map((q) => (
                    <li key={q} className="flex gap-3 text-foreground/85 leading-relaxed">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {q}
                    </li>
                  ))}
                </ul>
              </section>

              {talent.niceToHave && talent.niceToHave.length > 0 ? (
                <section>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight">Nice to have</h2>
                  <ul className="mt-5 space-y-3">
                    {talent.niceToHave.map((n) => (
                      <li key={n} className="flex gap-3 text-foreground/85 leading-relaxed">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {talent.benefits && talent.benefits.length > 0 ? (
                <section>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight">Benefits</h2>
                  <ul className="mt-5 space-y-3">
                    {talent.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-foreground/85 leading-relaxed">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {talent.techStack && talent.techStack.length > 0 ? (
                <section>
                  <h2 className="font-sans text-2xl font-semibold tracking-tight">Tech stack</h2>
                  <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                    {talent.techStack.map((group) => (
                      <div key={group.category}>
                        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {group.category}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-foreground/85">{group.items.join(" · ")}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <div className="border-t border-border pt-10 lg:hidden">
                <Button variant="hero" size="lg" className="w-full" type="button" onClick={() => handleApplyOpenChange(true)}>
                  Apply now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <aside className="hidden lg:block" aria-hidden="true" />
          </div>
        </article>

        <section className="border-t border-border py-14 md:py-16">
          <div className="container">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-sans text-2xl font-semibold tracking-tight">More open roles</h2>
              <Link to="/talents" className="text-sm font-medium text-primary hover:underline hover:underline-offset-4">
                All positions
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {more.map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/talents/${t.slug}`}
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium group-hover:text-primary">{t.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {t.department} · {t.location}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
      <ApplyDialog talent={talent} open={applyOpen} onOpenChange={handleApplyOpenChange} />
    </div>
  );
};

export default TalentPage;
