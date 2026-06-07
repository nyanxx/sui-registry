"use client";
import { cn } from "@/lib/utils";

/*
  EXTRACT: copy the @keyframes block below to your globals.css and use
  className="animate-[flicker_4s_linear_infinite]" directly if you
  don't want the wrapper.

  @keyframes flicker {
    0%,94%,98%,100% { opacity: 1; }
    95%             { opacity: 0.4; }
    97%             { opacity: 0.6; }
  }
*/

// How deep opacity drops during the flicker burst
const intensityMap = {
  subtle: { low: 0.7, mid: 0.85 },
  normal: { low: 0.4, mid: 0.6 },
  strong: { low: 0.05, mid: 0.3 },
} as const;

const speedMap = {
  slow: "8s",
  normal: "4s",
  fast: "2s",
} as const;

type FlickerProps = React.ComponentProps<"div"> & {
  speed?: "slow" | "normal" | "fast";
  intensity?: "subtle" | "normal" | "strong";
  disabled?: boolean;
};

export function Flicker({
  children,
  className,
  speed = "normal",
  intensity = "normal",
  disabled = false,
  ...props
}: FlickerProps) {
  const { low, mid } = intensityMap[intensity];

  return (
    <div
      className={cn(className)}
      style={
        disabled
          ? undefined
          : { animation: `flicker ${speedMap[speed]} linear infinite` }
      }
      {...props}
    >
      <style>{`
        @keyframes flicker {
          0%,94%,98%,100% { opacity: 1; }
          95%             { opacity: ${low}; }
          97%             { opacity: ${mid}; }
        }
      `}</style>
      {children}
    </div>
  );
}

/*

<Flicker intensity="subtle">soft neon sign</Flicker>
<Flicker intensity="normal">standard flicker</Flicker>
<Flicker intensity="strong" speed="fast">dying light</Flicker>


*/
