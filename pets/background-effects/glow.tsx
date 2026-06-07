import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glowVariants = cva("absolute rounded-full blur-3xl pointer-events-none", {
  variants: {
    color: {
      amber: "bg-amber-100/60",
      orange: "bg-orange-100/50",
      blue: "bg-blue-100/50",
      violet: "bg-violet-100/50",
      rose: "bg-rose-100/50",
      emerald: "bg-emerald-100/50",
      white: "bg-white/20",
      custom: "",
    },
    size: {
      sm: "h-[300px] w-[300px]",
      md: "h-[500px] w-[500px]",
      lg: "h-[700px] w-[700px]",
      xl: "h-[900px] w-[900px]",
    },
    intensity: {
      subtle: "opacity-40",
      soft: "opacity-60",
      strong: "opacity-80",
    },
  },
  defaultVariants: {
    color: "amber",
    size: "md",
    intensity: "soft",
  },
});

type GlowProps = React.ComponentProps<"div"> &
  VariantProps<typeof glowVariants>;

/** @example <Glow color="orange" size="md" className="-bottom-40 -right-20"> */
export function Glow({
  className,
  color,
  size,
  intensity,
  ...props
}: GlowProps) {
  return (
    <div
      className={glowVariants({ color, size, intensity, className })}
      {...props}
    />
  );
}

export function GlowGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props} />
  );
}

/*

<GlowGroup className="h-screen">
  <Glow color="amber" size="lg" className="-left-32 -top-32" />
  <Glow color="orange" size="md" className="-bottom-40 -right-20" />
</GlowGroup>

<Glow color="orange" size="md" className="-bottom-40 -right-20" />

<Glow color="custom" size={"sm"} className="bg-[#06b6d4] bottom-[-10%] right-[-10%]" />

<Glow
  color="custom"
  size={"sm"}
  intensity={"strong"}
  className="bg-[#7c3aed] left-[-10%] top-[-10%]"
/>

*/
