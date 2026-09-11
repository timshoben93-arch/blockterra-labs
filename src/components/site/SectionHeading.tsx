import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) => {
  return (
    <div className={cn(align === "split" && "grid gap-6 lg:grid-cols-2 lg:items-end", className)}>
      <div className="max-w-3xl">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className={cn("max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg", align === "split" && "lg:justify-self-end")}>
          {description}
        </p>
      ) : null}
    </div>
  );
};
