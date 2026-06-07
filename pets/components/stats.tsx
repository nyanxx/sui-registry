import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statsVariants = cva("grid w-full gap-4", {
  variants: {
    cols: {
      2: "grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
      5: "grid-cols-2 md:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    },
    spacing: {
      tight: "gap-2",
      normal: "gap-4",
      loose: "gap-8",
    },
  },
  defaultVariants: {
    cols: 3,
    spacing: "normal",
  },
});

const statsItemVariants = cva("p-4 text-card-foreground", {
  variants: {
    variant: {
      default:
        "rounded-2xl border border-border bg-card shadow-sm dark:border-border dark:bg-card",
      transparent: "bg-transparent border-0 shadow-none",
      blur: "rounded-2xl border border-white/10 bg-white/5 text-center backdrop-blur",
      solid: "rounded-xl bg-primary text-primary-foreground shadow",
      subtle: "rounded-xl bg-muted text-muted-foreground",
      outline: "rounded-xl border border-border bg-transparent",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    size: {
      sm: "p-2 text-sm",
      md: "p-4 text-base",
      lg: "p-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "center",
    size: "md",
  },
});

type StatsProps = React.ComponentProps<"dl"> &
  VariantProps<typeof statsVariants>;
type StatsItemProps = React.ComponentProps<"div"> &
  VariantProps<typeof statsItemVariants>;
type StatsValueProps = React.ComponentProps<"dd">;
type StatsLabelProps = React.ComponentProps<"dt">;

const Stats = React.forwardRef<HTMLDListElement, StatsProps>(
  ({ className, cols, ...props }, ref) => {
    return (
      <dl ref={ref} className={statsVariants({ cols, className })} {...props} />
    );
  },
);
Stats.displayName = "Stats";

const StatsItem = React.forwardRef<HTMLDivElement, StatsItemProps>(
  ({ className, variant, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={statsItemVariants({ variant, align, className })}
        {...props}
      />
    );
  },
);
StatsItem.displayName = "StatsItem";

const StatsValue = React.forwardRef<HTMLElement, StatsValueProps>(
  ({ className, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        className={cn(
          "text-3xl font-bold tracking-tight text-foreground dark:text-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
StatsValue.displayName = "StatsValue";

const StatsLabel = React.forwardRef<HTMLElement, StatsLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(
          "text-sm font-medium text-muted-foreground dark:text-muted-foreground",
          className,
        )}
        {...props}
      />
    );
  },
);
StatsLabel.displayName = "StatsLabel";

export { Stats, StatsItem, StatsValue, StatsLabel };

/*
  Usage Example:
  
  const items = [
    { value: "99.99%", label: "Uptime" },
    { value: "4x", label: "Faster Launches" },
    { value: "120k+", label: "Users Served" },
  ];

  export default function HeroSection() {
    return (
      <div className="mt-10 max-w-2xl w-full">
        <Stats cols={3}>
          {originalItems.map((item) => (
            <StatsItem key={item.label} variant="blur">
              <StatsValue className="text-xl">{item.value}</StatsValue>
              <StatsLabel>{item.label}</StatsLabel>
            </StatsItem>
          ))}
        </Stats>
      </div>
    )
  }


----



<div className="animate-hero-5 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
    <Reveal stagger={500}>
      <RevealItem index={1}>
        <Stats cols={3} className="flex flex-col">
          {[
            { value: "$4.2T", label: "Assets monitored" },
            { value: "0.3ms", label: "Signal latency" },
            { value: "340+", label: "Data sources" },
            //
          ].map((s) => (
            <StatsItem
              variant="transparent"
              align={"left"}
              key={s.value}
            >
              <StatsValue className="text-xl font-black tracking-tighter text-white">
                {s.value}
              </StatsValue>
              <StatsLabel className="text-xs text-zinc-500 uppercase tracking-widest">
                {s.label}
              </StatsLabel>
            </StatsItem>
          ))}
        </Stats>
      </RevealItem>
    </Reveal>
  </div>
</div>



*/
