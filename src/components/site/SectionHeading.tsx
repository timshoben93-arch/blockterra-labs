import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
  /** Keep the title on one line from md breakpoint up */
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
    <div className={cn(align === "split" && "grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end", className)}>
      <div className={cn(singleLineTitle ? "max-w-none" : "max-w-3xl")}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.85rem] md:leading-[1.1]",
            singleLineTitle && "md:whitespace-nowrap",
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "split" && "lg:justify-self-end lg:text-left",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};
