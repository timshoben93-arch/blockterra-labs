import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
  /** Prefer one line on wide screens; wraps on smaller viewports */
  singleLineTitle?: boolean;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  singleLineTitle = false,
}: SectionHeadingProps) => {
  return (
    <div className={cn(align === "split" && "grid gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end", className)}>
      <div className={cn("min-w-0", singleLineTitle ? "max-w-none" : "max-w-3xl")}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2
          className={cn(
            "mt-4 text-balance font-display text-[clamp(1.65rem,4.2vw,2.85rem)] font-semibold leading-[1.12] tracking-tight text-foreground",
            singleLineTitle && "xl:whitespace-nowrap",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "split" && "lg:justify-self-end lg:text-left",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};
