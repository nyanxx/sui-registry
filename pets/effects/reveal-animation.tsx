"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

type RevealContextValue = {
  revealed: boolean;
  stagger: number;
};

const RevealContext = React.createContext<RevealContextValue | null>(null);

const revealItemVariants = cva("transition-all will-change-transform", {
  variants: {
    animation: {
      "fade-up":
        "opacity-0 translate-y-2 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0",

      "fade-down":
        "opacity-0 -translate-y-2 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0",

      "fade-left":
        "opacity-0 translate-x-2 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0",

      "fade-right":
        "opacity-0 -translate-x-2 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-x-0",

      "zoom-in":
        "opacity-0 scale-95 data-[revealed=true]:opacity-100 data-[revealed=true]:scale-100",

      "blur-in":
        "opacity-0 blur-sm data-[revealed=true]:opacity-100 data-[revealed=true]:blur-none",
    },

    speed: {
      fast: "duration-300",
      normal: "duration-500",
      slow: "duration-700",
    },
  },

  defaultVariants: {
    animation: "fade-up",
    speed: "normal",
  },
});

type RevealProps = React.ComponentProps<"div"> & {
  threshold?: number;
  once?: boolean;
  stagger?: number;
};

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      children,
      threshold = 0.2,
      once = true,
      stagger = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const localRef = React.useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = React.useState(false);

    React.useEffect(() => {
      const element = localRef.current;

      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);

            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            setRevealed(false);
          }
        },
        {
          threshold,
        },
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, [threshold, once]);

    const contextValue = React.useMemo(
      () => ({
        revealed,
        stagger,
      }),
      [revealed, stagger],
    );

    return (
      <RevealContext.Provider value={contextValue}>
        <div
          {...props}
          ref={(node) => {
            localRef.current = node;

            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={className}
        >
          {children}
        </div>
      </RevealContext.Provider>
    );
  },
);

Reveal.displayName = "Reveal";

type RevealItemProps = React.ComponentProps<"div"> &
  VariantProps<typeof revealItemVariants> & {
    /**
     * Used with Reveal's stagger prop.
     * Defaults to 0 so all items reveal simultaneously.
     */
    index?: number;
  };

export const RevealItem = React.forwardRef<HTMLDivElement, RevealItemProps>(
  ({ className, animation, speed, index = 0, style, ...props }, ref) => {
    const context = React.useContext(RevealContext);

    if (!context) {
      throw new Error("RevealItem must be used inside Reveal");
    }

    return (
      <div
        {...props}
        ref={ref}
        data-revealed={context.revealed}
        style={{
          transitionDelay: `${index * context.stagger}ms`,
          ...style,
        }}
        className={revealItemVariants({
          animation,
          speed,
          className,
        })}
      />
    );
  },
);

RevealItem.displayName = "RevealItem";

/*
<Reveal stagger={100}>
  <RevealItem index={0}>
    <h1>Build faster.</h1>
  </RevealItem>

  <RevealItem index={1}>
    <p>Beautiful components for modern apps.</p>
  </RevealItem>

  <RevealItem index={2}>
    <Button>Get Started</Button>
  </RevealItem>
</Reveal>

---


<Reveal stagger={75}>
  {features.map((feature, index) => (
    <RevealItem
      key={feature.title}
      index={index}
      animation="zoom-in"
    >
      <FeatureCard {...feature} />
    </RevealItem>
  ))}
</Reveal>

---


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
