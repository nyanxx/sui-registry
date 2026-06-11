import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*

  ⚠ Note: <style> tag with @keyframes ships unconditionally on every mount. 
  If StarField is used more than once on a page, the keyframes are 
  injected multiple times (harmless but redundant). Move to globals.css 
  if that bothers you

  There is no randomization of stars 

  EXTRACT: copy the @keyframes blocks below to your globals.css and use
  the animation strings directly on your elements if you don't want the wrapper.

  @keyframes twinkle {
    0%, 100% { opacity: var(--star-o); }
    50%       { opacity: 0; }
  }

  @keyframes twinkle-slow {
    0%, 100% { opacity: var(--star-o); }
    50%       { opacity: 0; }
  }

  Then on each element:
  style={{ "--star-o": 0.6, animation: "twinkle 5s 1.2s ease-in-out infinite" }}
*/

// ─── Types ────────────────────────────────────────────────────────

type StarShape = "dot" | "4point" | "6point" | "sparkle";

type StarDatum = {
  cx: number;
  cy: number;
  r: number;
  d: string;
  t: "twinkle" | "twinkle-slow";
  o: number;
};

// ─── Pregenerated star positions ──────────────────────────────────
// Pregenerated at author-time — zero JS at runtime.

const ALL_STARS: StarDatum[] = [
  { cx: 3, cy: 124, r: 1.1, d: "0.0s", t: "twinkle", o: 0.6 },
  { cx: 58, cy: 430, r: 0.7, d: "1.2s", t: "twinkle-slow", o: 0.4 },
  { cx: 112, cy: 55, r: 1.4, d: "2.8s", t: "twinkle", o: 0.55 },
  { cx: 175, cy: 310, r: 0.5, d: "0.7s", t: "twinkle-slow", o: 0.35 },
  { cx: 234, cy: 190, r: 1.2, d: "3.5s", t: "twinkle", o: 0.5 },
  { cx: 289, cy: 512, r: 0.8, d: "1.9s", t: "twinkle-slow", o: 0.45 },
  { cx: 341, cy: 78, r: 1.0, d: "0.3s", t: "twinkle", o: 0.6 },
  { cx: 398, cy: 395, r: 0.6, d: "4.1s", t: "twinkle-slow", o: 0.38 },
  { cx: 452, cy: 220, r: 1.3, d: "2.2s", t: "twinkle", o: 0.52 },
  { cx: 510, cy: 600, r: 0.9, d: "0.9s", t: "twinkle-slow", o: 0.42 },
  { cx: 563, cy: 145, r: 1.1, d: "3.3s", t: "twinkle", o: 0.58 },
  { cx: 618, cy: 460, r: 0.7, d: "1.6s", t: "twinkle-slow", o: 0.36 },
  { cx: 674, cy: 30, r: 1.4, d: "2.5s", t: "twinkle", o: 0.65 },
  { cx: 729, cy: 340, r: 0.5, d: "0.4s", t: "twinkle-slow", o: 0.33 },
  { cx: 783, cy: 555, r: 1.2, d: "3.8s", t: "twinkle", o: 0.48 },
  { cx: 838, cy: 175, r: 0.8, d: "1.1s", t: "twinkle-slow", o: 0.44 },
  { cx: 894, cy: 415, r: 1.0, d: "2.0s", t: "twinkle", o: 0.57 },
  { cx: 947, cy: 90, r: 0.6, d: "4.4s", t: "twinkle-slow", o: 0.39 },
  { cx: 1003, cy: 490, r: 1.3, d: "0.6s", t: "twinkle", o: 0.53 },
  { cx: 1058, cy: 255, r: 0.9, d: "3.1s", t: "twinkle-slow", o: 0.41 },
  { cx: 1112, cy: 620, r: 1.1, d: "1.4s", t: "twinkle", o: 0.59 },
  { cx: 1167, cy: 380, r: 0.7, d: "2.7s", t: "twinkle-slow", o: 0.37 },
  { cx: 1221, cy: 115, r: 1.4, d: "0.2s", t: "twinkle", o: 0.62 },
  { cx: 1278, cy: 445, r: 0.5, d: "3.6s", t: "twinkle-slow", o: 0.34 },
  { cx: 1334, cy: 200, r: 1.2, d: "1.8s", t: "twinkle", o: 0.5 },
  { cx: 1389, cy: 565, r: 0.8, d: "4.2s", t: "twinkle-slow", o: 0.43 },
  { cx: 72, cy: 670, r: 1.0, d: "2.4s", t: "twinkle", o: 0.56 },
  { cx: 155, cy: 580, r: 0.6, d: "0.8s", t: "twinkle-slow", o: 0.4 },
  { cx: 263, cy: 695, r: 1.3, d: "3.0s", t: "twinkle", o: 0.51 },
  { cx: 370, cy: 640, r: 0.9, d: "1.5s", t: "twinkle-slow", o: 0.38 },
  { cx: 478, cy: 685, r: 1.1, d: "2.3s", t: "twinkle", o: 0.6 },
  { cx: 586, cy: 655, r: 0.7, d: "4.0s", t: "twinkle-slow", o: 0.35 },
  { cx: 694, cy: 675, r: 1.4, d: "0.5s", t: "twinkle", o: 0.64 },
  { cx: 802, cy: 690, r: 0.5, d: "3.4s", t: "twinkle-slow", o: 0.32 },
  { cx: 910, cy: 660, r: 1.2, d: "1.7s", t: "twinkle", o: 0.49 },
  { cx: 1018, cy: 680, r: 0.8, d: "2.6s", t: "twinkle-slow", o: 0.44 },
  { cx: 1126, cy: 645, r: 1.0, d: "0.1s", t: "twinkle", o: 0.55 },
  { cx: 1234, cy: 670, r: 0.6, d: "3.9s", t: "twinkle-slow", o: 0.37 },
  { cx: 1342, cy: 688, r: 1.3, d: "1.3s", t: "twinkle", o: 0.52 },
  { cx: 130, cy: 360, r: 0.9, d: "2.9s", t: "twinkle-slow", o: 0.41 },
  { cx: 490, cy: 480, r: 1.1, d: "0.6s", t: "twinkle", o: 0.58 },
  { cx: 720, cy: 265, r: 0.7, d: "1.0s", t: "twinkle-slow", o: 0.36 },
  { cx: 960, cy: 155, r: 1.4, d: "3.7s", t: "twinkle", o: 0.63 },
  { cx: 1150, cy: 505, r: 0.5, d: "2.1s", t: "twinkle-slow", o: 0.33 },
  { cx: 310, cy: 530, r: 1.2, d: "4.3s", t: "twinkle", o: 0.47 },
  { cx: 44, cy: 240, r: 0.8, d: "1.5s", t: "twinkle", o: 0.5 },
  { cx: 199, cy: 450, r: 1.1, d: "3.2s", t: "twinkle-slow", o: 0.44 },
  { cx: 425, cy: 120, r: 0.6, d: "0.4s", t: "twinkle", o: 0.38 },
  { cx: 655, cy: 540, r: 1.3, d: "2.6s", t: "twinkle-slow", o: 0.6 },
  { cx: 880, cy: 320, r: 0.9, d: "4.0s", t: "twinkle", o: 0.52 },
  { cx: 1070, cy: 610, r: 0.7, d: "1.8s", t: "twinkle-slow", o: 0.35 },
  { cx: 1300, cy: 85, r: 1.4, d: "0.9s", t: "twinkle", o: 0.65 },
  { cx: 540, cy: 350, r: 0.5, d: "3.1s", t: "twinkle-slow", o: 0.32 },
  { cx: 760, cy: 470, r: 1.0, d: "2.0s", t: "twinkle", o: 0.57 },
  { cx: 990, cy: 230, r: 0.8, d: "4.4s", t: "twinkle-slow", o: 0.42 },
];

// ─── Density slices ───────────────────────────────────────────────

const DENSITY_COUNT: Record<string, number> = {
  sparse: 20,
  normal: 35,
  dense: ALL_STARS.length,
};

// ─── Speed map ────────────────────────────────────────────────────

const SPEED_DURATION: Record<string, string> = {
  slow: "8s",
  normal: "5s",
  fast: "2.5s",
};

// ─── Color presets ────────────────────────────────────────────────

const COLOR_PRESETS: Record<string, string> = {
  gold: "#f5c842",
  silver: "#c0cad6",
  white: "#ffffff",
  blue: "#7eb8f7",
  rose: "#f9a8d4",
};

// ─── Shape renderers ─────────────────────────────────────────────
// All shapes are drawn centered at 0,0 — the <g> handles positioning.

function renderDot(r: number, fill: string) {
  return <circle cx={0} cy={0} r={r} fill={fill} />;
}

function render4Point(r: number, fill: string) {
  const o = r * 2.8;
  const i = r * 0.45;
  // 4-point star via polygon with 8 points alternating outer/inner
  const pts = [0, -o, i, -i, o, 0, i, i, 0, o, -i, i, -o, 0, -i, -i].join(" ");
  return <polygon points={pts} fill={fill} />;
}

function render6Point(r: number, fill: string) {
  const o = r * 2.6;
  const i = r * 0.5;
  const pts = [
    0,
    -o,
    i * 0.6,
    -i,
    o * 0.866,
    -o * 0.5,
    i,
    0,
    o * 0.866,
    o * 0.5,
    i * 0.6,
    i,
    0,
    o,
    -i * 0.6,
    i,
    -o * 0.866,
    o * 0.5,
    -i,
    0,
    -o * 0.866,
    -o * 0.5,
    -i * 0.6,
    -i,
  ].join(" ");
  return <polygon points={pts} fill={fill} />;
}

function renderSparkle(r: number, fill: string) {
  const o = r * 3.2;
  const m = r * 0.18;
  // 4-point elongated sparkle — long vertical/horizontal, tiny diagonals
  const pts = [0, -o, m, -m, o, 0, m, m, 0, o, -m, m, -o, 0, -m, -m].join(" ");
  return <polygon points={pts} fill={fill} />;
}

// ─── CVA ──────────────────────────────────────────────────────────

const starFieldVariants = cva(
  "pointer-events-none absolute inset-0 h-full w-full",
  {
    variants: {
      // density and speed are consumed as props — not Tailwind classes.
      // CVA is here for future className-level variants (e.g. blur, contrast).
    },
  },
);

// ─── Props ────────────────────────────────────────────────────────

type StarFieldProps = Omit<React.ComponentProps<"svg">, "color"> & {
  /** Built-in shape. Ignored when customShape is provided. */
  shape?: StarShape;
  /** Fully custom shape. Receives the star's radius; render centered at 0,0. */
  customShape?: (radius: number, fill: string) => React.ReactNode;
  /** Named color preset. */
  colorPreset?: keyof typeof COLOR_PRESETS;
  /** Any hex/css color. Overrides colorPreset when both are provided. */
  color?: string;
  /** Global opacity multiplier (0–1). */
  starOpacity?: number;
  /** Twinkle speed. */
  speed?: "slow" | "normal" | "fast";
  /** Number of stars rendered. */
  density?: "sparse" | "normal" | "dense";
};

// ─── Component ───────────────────────────────────────────────────

export function StarField({
  shape = "dot",
  customShape,
  colorPreset = "gold",
  color,
  starOpacity = 0.55,
  speed = "normal",
  density = "normal",
  className,
  ...props
}: StarFieldProps) {
  const fill = color ?? COLOR_PRESETS[colorPreset];
  const duration = SPEED_DURATION[speed];
  const stars = ALL_STARS.slice(0, DENSITY_COUNT[density]);

  function renderShape(r: number) {
    if (customShape) return customShape(r, fill);
    if (shape === "4point") return render4Point(r, fill);
    if (shape === "6point") return render6Point(r, fill);
    if (shape === "sparkle") return renderSparkle(r, fill);
    return renderDot(r, fill);
  }

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-o); }
          50%       { opacity: 0; }
        }
        @keyframes twinkle-slow {
          0%, 100% { opacity: var(--star-o); }
          50%       { opacity: 0; }
        }
      `}</style>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1400 700"
        className={cn(starFieldVariants(), className)}
        {...props}
      >
        {stars.map((s, i) => (
          <g
            key={i}
            transform={`translate(${s.cx} ${s.cy})`}
            style={
              {
                "--star-o": s.o * starOpacity,
                animation: `${s.t} ${duration} ${s.d} ease-in-out infinite`,
              } as React.CSSProperties
            }
          >
            {renderShape(s.r)}
          </g>
        ))}
      </svg>
    </>
  );
}

StarField.displayName = "StarField";

/*
  Usage examples:

  // Default gold dots
  <StarField />

  // Dense silver sparkles, fast
  <StarField shape="sparkle" colorPreset="silver" density="dense" speed="fast" />

  // Blue 4-point stars, slow, sparse
  <StarField shape="4point" colorPreset="blue" density="sparse" speed="slow" />

  // Custom hex color
  <StarField shape="6point" color="#ff6aff" />

  // Custom shape escape hatch
  <StarField
    customShape={(r, fill) => (
      <path d={`M0,${-r * 3} L${r},0 L0,${r * 3} L${-r},0 Z`} fill={fill} />
    )}
  />

  // Wrapper
  <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-950">
    <StarField shape="sparkle" colorPreset="rose" density="dense" />
  </div>
*/
