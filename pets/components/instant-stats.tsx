"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────

export interface Stat {
  value: React.ReactNode;
  label: React.ReactNode;
}

// ─── Context ───────────────────────────────────────────────────────

interface InstantStatsContextValue {
  animated: boolean;
  stagger: number;
}

const InstantStatsContext = React.createContext<InstantStatsContextValue>({
  animated: true,
  stagger: 75,
});

function useInstantStatsContext() {
  return React.useContext(InstantStatsContext);
}

// ─── Variants ──────────────────────────────────────────────────────

export const instantStatsVariants = cva("w-full", {
  variants: {
    layout: {
      row: "flex flex-wrap gap-x-10 gap-y-4",
      grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
    },
    variant: {
      default: "border-t pt-6",
      muted: "border-t border-border/50 pt-6",
      card: "rounded-lg border p-6",
    },
  },
  defaultVariants: {
    layout: "row",
    variant: "default",
  },
});

export const instantStatsItemVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "[&_[data-slot=value]]:text-xl [&_[data-slot=label]]:text-[10px]",
      md: "[&_[data-slot=value]]:text-2xl [&_[data-slot=label]]:text-xs",
      lg: "[&_[data-slot=value]]:text-4xl [&_[data-slot=label]]:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// ─── Root ──────────────────────────────────────────────────────────

export interface InstantStatsProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof instantStatsVariants> {
  items?: Stat[];
  animated?: boolean;
  stagger?: number;
  children?: React.ReactNode;
}

const InstantStats = React.forwardRef<HTMLDivElement, InstantStatsProps>(
  (
    {
      className,
      layout,
      variant,
      animated = true,
      stagger = 75,
      items,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <InstantStatsContext.Provider
        value={{
          animated,
          stagger,
        }}
      >
        <div
          ref={ref}
          role="list"
          aria-label="Statistics"
          className={cn(
            instantStatsVariants({
              layout,
              variant,
            }),
            className,
          )}
          {...props}
        >
          {items
            ? items.map((item, index) => (
                <InstantStatsItem
                  key={String(item.label)}
                  value={item.value}
                  label={item.label}
                  index={index}
                />
              ))
            : children}
        </div>
      </InstantStatsContext.Provider>
    );
  },
);

InstantStats.displayName = "InstantStats";

// ─── Item ──────────────────────────────────────────────────────────

export interface InstantStatsItemProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof instantStatsItemVariants> {
  value: React.ReactNode;
  label: React.ReactNode;
  index?: number;
}

const InstantStatsItem = React.forwardRef<
  HTMLDivElement,
  InstantStatsItemProps
>(({ className, value, label, size, index = 0, ...props }, ref) => {
  const { animated, stagger } = useInstantStatsContext();

  const [visible, setVisible] = React.useState(!animated);
  const itemRef = React.useRef<HTMLDivElement | null>(null);

  React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement);

  React.useEffect(() => {
    if (!animated) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function sv() {
      setVisible(true);
    }

    if (media.matches) {
      sv();
      return;
    }

    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [animated]);

  return (
    <div role="listitem">
      <div
        ref={itemRef}
        className={cn(
          instantStatsItemVariants({
            size,
          }),
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          "transition-all duration-500",
          className,
        )}
        style={
          animated
            ? {
                transitionDelay: `${index * stagger}ms`,
              }
            : undefined
        }
        {...props}
      >
        <span
          data-slot="value"
          className="text-2xl font-black tracking-tight text-foreground"
        >
          {value}
        </span>

        <span
          data-slot="label"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          {label}
        </span>
      </div>
    </div>
  );
});

InstantStatsItem.displayName = "InstantStatsItem";

// ─── Exports ───────────────────────────────────────────────────────

export { InstantStats, InstantStatsItem };

/**
 * ------------------------------------------------------------------
 * Usage Examples
 * ------------------------------------------------------------------
 *
 * // 1. Simple marketing stats
 *
 * <InstantStats
 *   items={[
 *     { value: "$4.2T", label: "Assets monitored" },
 *     { value: "0.3ms", label: "Signal latency" },
 *     { value: "340+", label: "Data sources" },
 *   ]}
 * />
 *
 *
 * // 2. Dashboard grid (large stats)
 *
 * <InstantStats layout="grid">
 *   <InstantStatsItem size="lg" value="12,481" label="Users" />
 *   <InstantStatsItem size="lg" value="$92K" label="Revenue" />
 *   <InstantStatsItem size="lg" value="99.99%" label="Uptime" />
 *   <InstantStatsItem size="lg" value="24" label="Regions" />
 * </InstantStats>
 *
 *
 * // 3. Card variant
 *
 * <InstantStats
 *   variant="card"
 *   items={[
 *     { value: "48", label: "Projects" },
 *     { value: "11", label: "Teams" },
 *   ]}
 * />
 *
 *
 * // 4. Compound composition
 *
 * <InstantStats layout="grid">
 *   <InstantStatsItem value="500+" label="Customers" />
 *   <InstantStatsItem value="32" label="Countries" />
 *   <InstantStatsItem value="99.9%" label="Availability" />
 * </InstantStats>
 *
 *
 * // 5. Custom row layout
 *
 * <InstantStats
 *   layout="row"
 *   className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8"
 * >
 *   <InstantStatsItem value="$4.2T" label="Assets monitored" />
 *   <InstantStatsItem value="0.3ms" label="Signal latency" />
 *   <InstantStatsItem value="340" label="Data sources" />
 * </InstantStats>
 *
 *
 * // 6. Static (no animation)
 *
 * <InstantStats
 *   animated={false}
 *   items={[
 *     { value: "1M+", label: "Downloads" },
 *     { value: "4.9/5", label: "Rating" },
 *   ]}
 * />
 */
