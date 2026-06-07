import { cva, type VariantProps } from "class-variance-authority";

const vignetteVariants = cva("pointer-events-none absolute inset-0 z-10", {
  variants: {
    color: {
      black:
        "bg-[radial-gradient(ellipse_at_center,transparent_var(--vignette-start),rgba(0,0,0,var(--vignette-opacity))_100%)]",
      dark: "bg-[radial-gradient(ellipse_at_center,transparent_var(--vignette-start),rgba(2,4,12,var(--vignette-opacity))_100%)]",
      white:
        "bg-[radial-gradient(ellipse_at_center,transparent_var(--vignette-start),rgba(255,255,255,var(--vignette-opacity))_100%)]",
    },
    shape: {
      ellipse: "",
      edges:
        "[background:linear-gradient(to_right,rgba(0,0,0,0.4),transparent_20%,transparent_80%,rgba(0,0,0,0.4))]",
      top: "[background:linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_40%)]",
      bottom:
        "[background:linear-gradient(to_top,rgba(0,0,0,0.6),transparent_40%)]",
    },
    intensity: {
      soft: "[--vignette-opacity:0.5]",
      medium: "[--vignette-opacity:0.75]",
      strong: "[--vignette-opacity:0.92]",
    },
    start: {
      sm: "[--vignette-start:20%]",
      md: "[--vignette-start:40%]",
      lg: "[--vignette-start:60%]",
    },
  },
  defaultVariants: {
    color: "dark",
    shape: "ellipse",
    intensity: "medium",
    start: "md",
  },
});

type VignetteProps = React.ComponentProps<"div"> &
  VariantProps<typeof vignetteVariants>;

export function Vignette({
  className,
  color,
  shape,
  intensity,
  start,
  ...props
}: VignetteProps) {
  return (
    <div
      aria-hidden
      className={vignetteVariants({
        color,
        shape,
        intensity,
        start,
        className,
      })}
      {...props}
    />
  );
}
/*

<Vignette />
<Vignette color="black" intensity="strong" start="lg" />
<Vignette shape="bottom" color="dark" intensity="soft" />
<Vignette shape="edges" />

*/
