import { cva, type VariantProps } from "class-variance-authority";
import { useId } from "react";

const dotGridVariants = cva(
  "absolute inset-0 h-full w-full pointer-events-none",
  {
    variants: {
      color: {
        amber: { fill: "#92400e" },
        neutral: { fill: "#737373" },
        white: { fill: "#ffffff" },
        black: { fill: "#000000" },
      },
      spacing: {
        sm: { width: 16, height: 16 },
        md: { width: 24, height: 24 },
        lg: { width: 32, height: 32 },
      },
      radius: {
        sm: { r: 1 },
        md: { r: 1.5 },
        lg: { r: 2 },
      },
      opacity: {
        subtle: "opacity-[0.05]",
        soft: "opacity-[0.10]",
        strong: "opacity-[0.20]",
      },
    },
    defaultVariants: {
      color: "neutral",
      spacing: "md",
      radius: "md",
      opacity: "subtle",
    },
  },
);

// CVA doesn't handle non-class values well, so we pull the data out directly
const spacingMap = { sm: 16, md: 24, lg: 32 } as const;
const radiusMap = { sm: 1, md: 1.5, lg: 2 } as const;
const colorMap = {
  amber: "#92400e",
  neutral: "#737373",
  white: "#ffffff",
  black: "#000000",
} as const;
const opacityMap = {
  subtle: "opacity-[0.05]",
  soft: "opacity-[0.10]",
  strong: "opacity-[0.20]",
} as const;

type DotGridProps = Omit<React.ComponentProps<"svg">, "color"> &
  VariantProps<typeof dotGridVariants>;

export function DotGrid({
  className,
  color = "neutral",
  spacing = "md",
  radius = "md",
  opacity = "subtle",
  ...props
}: DotGridProps) {
  const id = useId();
  const patternId = `dot-grid-${id}`;

  const gap = spacingMap[spacing ?? "md"];
  const r = radiusMap[radius ?? "md"];
  const fill = colorMap[color ?? "neutral"];
  const opacityCls = opacityMap[opacity ?? "subtle"];

  return (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 h-full w-full pointer-events-none ${opacityCls}${className ? ` ${className}` : ""}`}
      {...props}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={r} cy={r} r={r} fill={fill} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/*
      <DotGrid color="amber" spacing="md" opacity="soft" />

*/
