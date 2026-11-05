import { useState } from "react";
import { Play } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FEATURED_VIDEO, RWA_VIDEO_LIBRARY } from "@/data/featuredVideo";
import { cn } from "@/lib/utils";

export const EcosystemVideo = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const poster = `https://i.ytimg.com/vi/${FEATURED_VIDEO.youtubeId}/maxresdefault.jpg`;

  return (
    <section
      id="ecosystem-video"
      className="scroll-mt-24 border-b border-border bg-surface-muted py-20 md:py-28"
    >
      <div className="container">
        <SectionHeading
          align="split"
          eyebrow="Ecosystem overview"
          title={
            <>
              Real-world asset <span className="text-gradient">tokenization</span>, explained
            </>
          }
          description="Institutional films specifically about RWA tokenization — asset structuring, custody, real estate and trust architecture. No ambient office or street footage."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="media-frame border border-border/70 bg-black">
            <div className="relative aspect-video w-full">
              {playingId === FEATURED_VIDEO.youtubeId ? (
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
                  onClick={() => setPlayingId(FEATURED_VIDEO.youtubeId)}
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
              Independent industry education, not TokenBrickLabs content. Plays via privacy-enhanced
              embed — no registration on this site.
            </p>
            <a
              href={FEATURED_VIDEO.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
            >
              Open source page →
            </a>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">
            More on RWA tokenization
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {RWA_VIDEO_LIBRARY.map((video) => {
              const thumb = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
              const active = playingId === video.youtubeId;
              return (
                <li
                  key={video.youtubeId}
                  className="overflow-hidden rounded-xl border border-border/70 bg-background/40"
                >
                  <div className="relative aspect-video bg-black">
                    {active ? (
                      <iframe
                        title={video.title}
                        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        className="absolute inset-0 h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingId(video.youtubeId)}
                        className="group absolute inset-0 h-full w-full text-left"
                        aria-label={`Play video: ${video.title}`}
                      >
                        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                      {video.duration} · {video.focus}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-foreground">{video.title}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
