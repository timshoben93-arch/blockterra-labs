import { useState } from "react";
import { Play } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FEATURED_VIDEO } from "@/data/featuredVideo";
import { cn } from "@/lib/utils";

export const EcosystemVideo = () => {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${FEATURED_VIDEO.youtubeId}/maxresdefault.jpg`;

  return (
    <section
      id="ecosystem-video"
      className="scroll-mt-24 border-b border-border bg-[radial-gradient(ellipse_at_top,_rgba(14,42,78,0.55),_transparent_55%),linear-gradient(180deg,#050b16_0%,hsl(var(--background))_100%)] py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Ecosystem overview"
          title={
            <>
              Understanding the tokenized <span className="text-gradient">asset economy</span>
            </>
          }
          description="A concise live-action briefing on how asset tokenization and digital securities are reshaping institutional markets — from ownership and issuance through custody, settlement and ongoing lifecycle management."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-black shadow-elevated">
            <div className="relative aspect-video w-full">
              {playing ? (
                <iframe
                  title={FEATURED_VIDEO.title}
                  src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 h-full w-full text-left"
                  aria-label={`Play video: ${FEATURED_VIDEO.title}`}
                >
                  <img
                    src={poster}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform group-hover:scale-105">
                      <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {FEATURED_VIDEO.duration} · {FEATURED_VIDEO.source}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold text-white sm:text-xl">
                      {FEATURED_VIDEO.title}
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="text-base leading-relaxed text-muted-foreground">{FEATURED_VIDEO.description}</p>
            <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
              Ecosystem themes
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {FEATURED_VIDEO.topics.map((topic) => (
                <li
                  key={topic.label}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium",
                    topic.covered
                      ? "border-primary/35 bg-primary/10 text-foreground"
                      : "border-border bg-background/40 text-muted-foreground",
                  )}
                  title={
                    topic.covered
                      ? "Addressed in this briefing"
                      : "Core ecosystem theme — explored further in our research"
                  }
                >
                  {topic.label}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Themes without a highlight remain central to institutional tokenization and are covered
              across our{" "}
              <a href="/docs" className="font-medium text-primary hover:underline">
                research chapters
              </a>
              . This video is an independent industry briefing, not TokenBrickLabs content.
            </p>
            <a
              href={FEATURED_VIDEO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
            >
              Watch on YouTube →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
