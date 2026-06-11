"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const DENSITY_COUNT = { sparse: 45, normal: 90, dense: 160 } as const;

/** How far the opacity drops at the bottom of each twinkle cycle */
const DIM_FACTOR = 0.15;

/** Base radius ranges [min, range] per size variant */
const SIZE_RANGE = {
  fine: [0.2, 0.8],
  normal: [0.3, 1.4],
  bold: [0.6, 2.2],
} as const;

/** Twinkle duration bounds [min, range] in seconds per speed variant */
const SPEED_RANGE = {
  slow: [6, 6],
  normal: [3, 4],
  fast: [1, 2],
} as const;

// ─── Variants ────────────────────────────────────────────────────────────────

const starFieldVariants = cva(
  "pointer-events-none absolute inset-0 h-full w-full",
  {
    variants: {
      density: { sparse: "", normal: "", dense: "" },
      speed: { slow: "", normal: "", fast: "" },
      size: { fine: "", normal: "", bold: "" },
    },
    defaultVariants: {
      density: "normal",
      speed: "normal",
      size: "normal",
    },
  },
);

// ─── Internal helpers ─────────────────────────────────────────────────────────

interface StarDatum {
  id: number;
  cx: number;
  cy: number;
  r: number;
  delay: number;
  dur: number;
}

function buildStars(
  count: number,
  sizeVariant: "fine" | "normal" | "bold",
  speedVariant: "slow" | "normal" | "fast",
  viewBox: string,
): StarDatum[] {
  // Parse viewBox dimensions so stars always fill the declared canvas
  const [, , vbW, vbH] = viewBox.split(" ").map(Number);
  const [rMin, rRange] = SIZE_RANGE[sizeVariant];
  const [dMin, dRange] = SPEED_RANGE[speedVariant];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: Math.floor(Math.random() * vbW),
    cy: Math.floor(Math.random() * vbH),
    r: Math.random() * rRange + rMin,
    delay: parseFloat((Math.random() * 4).toFixed(2)),
    dur: parseFloat((Math.random() * dRange + dMin).toFixed(2)),
  }));
}

/** Mirrors window.matchMedia("(prefers-reduced-motion: reduce)") */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StarFieldProps extends VariantProps<typeof starFieldVariants> {
  /** Override the computed star count from `density` with an exact number */
  count?: number;
  /** Fill color for every star — any valid CSS color string */
  color?: string;
  /** Base opacity (0–1). Twinkle dims to `opacity * 0.15` */
  opacity?: number;
  /** SVG viewBox string — change to match your background's aspect ratio */
  viewBox?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StarField({
  density = "normal",
  speed = "normal",
  size = "normal",
  count,
  color = "#f5c842",
  opacity = 0.55,
  viewBox = "0 0 1400 700",
  className,
}: StarFieldProps) {
  const reducedMotion = useReducedMotion();

  const resolvedCount = count ?? DENSITY_COUNT[density ?? "normal"];
  const resolvedSize = size ?? "normal";
  const resolvedSpeed = speed ?? "normal";

  // Stabilise star positions — only regenerate when the configuration changesx
  // results in hydration error --- The fix is to never run Math.random() on the server at all,
  //   const stars = React.useMemo(
  //     () => buildStars(resolvedCount, resolvedSize, resolvedSpeed, viewBox),
  //     [resolvedCount, resolvedSize, resolvedSpeed, viewBox],
  //   );

  // ↓ Empty on the server. Populated only after client mount.
  //   Server and client both render an empty <svg> shell — no mismatch.
  const [stars, setStars] = React.useState<StarDatum[]>([]);

  React.useEffect(() => {
    function ss() {
      setStars(buildStars(resolvedCount, resolvedSize, resolvedSpeed, viewBox));
    }
    ss();
  }, [resolvedCount, resolvedSize, resolvedSpeed, viewBox]);

  return (
    <svg
      aria-hidden="true"
      className={cn(starFieldVariants({ density, speed, size }), className)}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox={viewBox}
      suppressHydrationWarning
    >
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill={color}
          opacity={opacity}
        >
          {!reducedMotion && (
            <animate
              attributeName="opacity"
              values={`${opacity};${opacity * DIM_FACTOR};${opacity}`}
              dur={`${s.dur}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}
    </svg>
  );
}

// ─── Barrel ───────────────────────────────────────────────────────────────────

export { starFieldVariants };

/*
 * ─── Usage Examples ──────────────────────────────────────────────────────────
 *
 * 1. Drop-in default — warm gold stars on any dark background:
 *
 *    <div className="relative h-screen w-full bg-slate-950">
 *      <StarField />
 *    </div>
 *
 * 2. Cool blue, sparse, slow — good for a calm hero section:
 *
 *    <div className="relative h-[600px] w-full bg-zinc-900">
 *      <StarField density="sparse" speed="slow" color="#93c5fd" opacity={0.6} />
 *    </div>
 *
 * 3. Dense, fine, fast — particle-storm energy effect:
 *
 *    <div className="relative overflow-hidden rounded-xl bg-black">
 *      <StarField density="dense" size="fine" speed="fast" opacity={0.8} />
 *      <div className="relative z-10 p-12 text-white">Content above the stars</div>
 *    </div>
 *
 * 4. Wide cinematic aspect ratio with exact count override:
 *
 *    <StarField
 *      viewBox="0 0 2560 720"
 *      count={240}
 *      size="bold"
 *      color="#fde68a"
 *      className="rounded-2xl"
 *    />
 *
 * 5. Compose the cva variants externally to drive a className without rendering:
 *
 *    import { starFieldVariants } from "@/components/ui/star-field";
 *    const cls = starFieldVariants({ density: "dense", speed: "fast" });
 *    // cls → "pointer-events-none absolute inset-0 h-full w-full"
 *    // (useful when wrapping StarField in a styled container component)
 */
