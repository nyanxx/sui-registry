import { cva, type VariantProps } from "class-variance-authority";

const gradientLineVariants = cva("shrink-0", {
  variants: {
    color: {
      blue: "[--gl-color:79,163,224]",
      amber: "[--gl-color:251,191,36]",
      violet: "[--gl-color:167,139,250]",
      rose: "[--gl-color:251,113,133]",
      emerald: "[--gl-color:52,211,153]",
      white: "[--gl-color:255,255,255]",
      neutral: "[--gl-color:156,163,175]",
    },
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    intensity: {
      subtle: "[--gl-opacity:0.3]",
      soft: "[--gl-opacity:0.5]",
      strong: "[--gl-opacity:0.8]",
    },
  },
  defaultVariants: {
    color: "blue",
    orientation: "horizontal",
    intensity: "soft",
  },
});

type GradientLineProps = React.ComponentProps<"div"> &
  VariantProps<typeof gradientLineVariants>;

export function GradientLine({
  className,
  color,
  orientation,
  intensity,
  style,
  ...props
}: GradientLineProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      aria-hidden
      className={gradientLineVariants({
        color,
        orientation,
        intensity,
        className,
      })}
      style={{
        background: isVertical
          ? "linear-gradient(to bottom, transparent, rgba(var(--gl-color), var(--gl-opacity, 0.5)), transparent)"
          : "linear-gradient(to right,  transparent, rgba(var(--gl-color), var(--gl-opacity, 0.5)), transparent)",
        ...style,
      }}
      {...props}
    />
  );
}

/*
<GradientLine />
<GradientLine className="mb-6 h-px w-full" />
<GradientLine color="amber" intensity="strong" />
<GradientLine color="violet" orientation="vertical" className="h-24" />
<GradientLine color="amber" intensity={"strong"} orientation="vertical" className="mx-auto min-h-23"/>
<GradientLine color="emerald" intensity="subtle" />
*/
