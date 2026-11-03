import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
  inverse?: boolean;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  inverse = false,
}: SectionHeadingProps) => {
  return (
    <div className={cn(align === "split" && "grid gap-6 lg:grid-cols-2 lg:items-end", className)}>
      <div className="max-w-3xl">
        <p className={cn("text-[0.7rem] font-semibold uppercase tracking-[0.22em]", inverse ? "text-primary-glow" : "text-primary")}>{eyebrow}</p>
        <h2 className={cn("mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.05]", inverse ? "text-surface-dark-foreground" : "text-foreground")}>
          {title}
        </h2>
      </div>
      {description ? (
        <p className={cn("max-w-xl text-base leading-relaxed sm:text-lg", inverse ? "text-surface-dark-foreground/75" : "text-muted-foreground", align === "split" && "lg:justify-self-end")}>
          {description}
        </p>
      ) : null}
    </div>
  );
};
