import { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// ─── Built-in pattern definitions ────────────────────────────────────────────
// Each returns an SVG string for the repeating tile.
// size: the width/height of the tile in px.

// absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-size-[40px_40px]
const builtInPatterns = {
  dots: (fill: string, size: number) => ({
    tile: `<circle cx="${size * 0.1}" cy="${size * 0.1}" r="${size * 0.1}" fill="${fill}" />`,
    size,
  }),
  grid: (fill: string, size: number) => ({
    tile: `<path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${fill}" stroke-width="0.5" />`,
    size,
  }),
  crosshatch: (fill: string, size: number) => ({
    tile: `
      <line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${fill}" stroke-width="0.5"/>
      <line x1="${size}" y1="0" x2="0" y2="${size}" stroke="${fill}" stroke-width="0.5"/>
    `,
    size,
  }),
  diagonal: (fill: string, size: number) => ({
    tile: `<line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${fill}" stroke-width="0.5"/>`,
    size,
  }),
  plus: (fill: string, size: number) => ({
    tile: `
      <line x1="${size / 2}" y1="0" x2="${size / 2}" y2="${size}" stroke="${fill}" stroke-width="0.5"/>
      <line x1="0" y1="${size / 2}" x2="${size}" y2="${size / 2}" stroke="${fill}" stroke-width="0.5"/>
    `,
    size,
  }),
  circles: (fill: string, size: number) => ({
    tile: `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.35}" fill="none" stroke="${fill}" stroke-width="0.5"/>`,
    size,
  }),
  spaciousGrid: (fill: string, size: number) => ({
    tile: `
    <path
      d="M ${size} 0 L 0 0 0 ${size}"
      fill="none"
      stroke="${fill}"
      stroke-width="0.5"
    />
  `,
    size: size * 2,
  }),
} as const;

export type PatternPreset = keyof typeof builtInPatterns;

// ─── Color tokens ─────────────────────────────────────────────────────────────

const colorMap = {
  amber: "#92400e",
  neutral: "#737373",
  slate: "#475569",
  white: "#ffffff",
  black: "#000000",
  rose: "#9f1239",
  blue: "#1e40af",
  emerald: "#065f46",
} as const;

export type PatternColor = keyof typeof colorMap;

// ─── Variants (only things that map to classes) ───────────────────────────────

const bgPatternVariants = cva(
  "absolute inset-0 h-full w-full pointer-events-none",
  {
    variants: {
      opacity: {
        xs: "opacity-[0.03]",
        subtle: "opacity-[0.06]",
        soft: "opacity-[0.12]",
        strong: "opacity-[0.20]",
      },
    },
    defaultVariants: {
      opacity: "subtle",
    },
  },
);

// ─── Props ────────────────────────────────────────────────────────────────────

type BgPatternProps = Omit<React.ComponentProps<"svg">, "color"> &
  VariantProps<typeof bgPatternVariants> & {
    /**
     * Preset pattern name, or pass `customTile` to use your own SVG markup.
     * @default "dots"
     */
    pattern?: PatternPreset;
    /**
     * Raw SVG markup for one tile. Used when `pattern` is not enough.
     * Must include a `tileSize` prop alongside it.
     * e.g. customTile='<circle cx="2" cy="2" r="2" fill="#000"/>'
     */
    customTile?: string;
    /** Tile width/height in px. Only needed with `customTile`. @default 24 */
    tileSize?: number;
    /** Fill/stroke color token. @default "neutral" */
    color?: PatternColor;
    /** Override the resolved hex color directly. Useful for brand colors. */
    colorValue?: string;
    /** Spacing scale — multiplies the base tile size. @default "md" */
    spacing?: "sm" | "md" | "lg";
  };

const spacingMultiplier = { sm: 0.75, md: 1, lg: 1.5 } as const;

// ─── Component ────────────────────────────────────────────────────────────────
/**@description Background pattern */
export function BgPattern({
  className,
  opacity,
  pattern = "dots",
  customTile,
  tileSize = 24,
  color = "neutral",
  colorValue,
  spacing = "md",
  ...props
}: BgPatternProps) {
  const id = useId();
  const patternId = `bg-pattern-${id}`;

  const fill = colorValue ?? colorMap[color];
  const multiplier = spacingMultiplier[spacing];

  const resolved = customTile
    ? { tile: customTile, size: tileSize }
    : builtInPatterns[pattern](fill, Math.round(24 * multiplier));

  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      className={bgPatternVariants({ opacity, className })}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={resolved.size}
          height={resolved.size}
          patternUnits="userSpaceOnUse"
        >
          {/* Safe: only rendered in SVG defs, not user-facing HTML */}
          <g dangerouslySetInnerHTML={{ __html: resolved.tile }} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/*

<BgPattern
  customTile='<path d="M 10 0 L 0 0 0 10" fill="none" stroke="#000" stroke-width="0.5"/>'
  tileSize={10}
/>

or

<BgPattern pattern="dots" colorValue="#3b0764" />


or


<BgPattern pattern="dots" color="amber" spacing="md" opacity="subtle" />
<BgPattern pattern="grid" color="neutral" opacity="xs" />


or

 <BgPattern
  pattern="grid"
  opacity="strong"
  spacing="lg"
  className="mask-b-to-50%"
/>

or

<main className="relative min-h-screen overflow-hidden bg-slate-950">
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
    <BgPattern pattern="grid" opacity="strong" spacing="lg" />
  </div>
</main>


*/

/*
3. dangerouslySetInnerHTML

You're using:

dangerouslySetInnerHTML

for custom SVG tiles.

Not necessarily wrong.

But if this ever becomes a public library, I'd want either:

sanitization
or a giant warning in docs

because users can inject arbitrary markup.

For internal projects it's fine.

4. Missing memoization

Every render recreates:

resolved
patternId
tile markup

Not a big deal.

But for a design-system component I'd probably do:

useMemo(...)

for the resolved pattern.

*/
