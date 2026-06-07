import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const heroBadgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted text-muted-foreground dark:border-border dark:bg-muted dark:text-muted-foreground",
        primary:
          "border-primary/20 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary",
        info: "border-info/20 bg-info/10 text-info dark:border-info/30 dark:bg-info/10 dark:text-info",
        blue: "border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200",
        retro: "border-amber-400/30 bg-amber-400/8 px-3.5 py-1"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type HeroBadgeProps = React.ComponentProps<"div"> &
  VariantProps<typeof heroBadgeVariants>;

const HeroBadge = React.forwardRef<HTMLDivElement, HeroBadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={heroBadgeVariants({ variant, className })}
        {...props}
      />
    );
  },
);
HeroBadge.displayName = "HeroBadge";

export { HeroBadge, heroBadgeVariants };

/*
  Usage Example:
  
  import { ArrowRight } from "lucide-react"

  export default function HeroSection() {
    return (
      <div className="p-8 space-y-4">
        <HeroBadge variant="primary">
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
            New
          </span>
          <span className="text-muted-foreground">
            Faster deployments with zero downtime
          </span>
          <ArrowRight className="h-3.5 w-3.5 opacity-70" />
        </HeroBadge>
      </div>
    )
  }

-----

<HeroBadge className="p-8 mb-4" variant={"blue"}>
  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
    New
  </span>
  <span className="text-muted-foreground">
    Faster deployments with zero downtime
  </span>
  <ArrowRight className="h-3.5 w-3.5 opacity-70" />
</HeroBadge>

---

<HeroBadge variant={"retro"}>
  <span
    aria-hidden="true"
    className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"
  />
  <span className="text-xs font-medium tracking-widest text-amber-300 uppercase">
    Now in public beta
  </span>
</HeroBadge>



*/
