import { cn } from "@/lib/utils";

const PATHS = {
  wave: "M0,58 C220,96 420,18 720,48 C1020,78 1220,22 1440,54 L1440,120 L0,120 Z",
  waveAlt: "M0,42 C240,8 500,86 780,50 C1060,14 1280,78 1440,38 L1440,120 L0,120 Z",
  slope: "M0,72 C420,12 880,92 1440,32 L1440,120 L0,120 Z",
  scoop: "M0,24 C380,88 1060,88 1440,24 L1440,120 L0,120 Z",
} as const;

export type FlowVariant = keyof typeof PATHS;
export type FlowFill = "background" | "surface-dark" | "raised" | "muted";

const FILL: Record<FlowFill, string> = {
  background: "hsl(var(--background))",
  "surface-dark": "hsl(var(--surface-dark))",
  raised: "hsl(var(--surface-raised))",
  muted: "hsl(var(--surface-muted))",
};

type FlowDividerProps = {
  to: FlowFill;
  variant?: FlowVariant;
  flip?: boolean;
  className?: string;
};

export const FlowDivider = ({ to, variant = "wave", flip = false, className }: FlowDividerProps) => {
  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-[1] overflow-hidden leading-[0]", className)}
      aria-hidden="true"
    >
      <svg
        className={cn(
          "relative block h-[var(--flow-h)] w-[calc(100%+4px)] max-w-none -translate-x-[2px]",
          flip && "-scale-x-100",
        )}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d={PATHS[variant]} fill={FILL[to]} />
      </svg>
    </div>
  );
};
