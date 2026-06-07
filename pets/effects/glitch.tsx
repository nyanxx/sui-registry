"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GlitchVariant = "offset" | "slice" | "flicker" | "noise";
export type GlitchColor =
  | "blue"
  | "red"
  | "green"
  | "amber"
  | "violet"
  | "white";

const colorMap: Record<GlitchColor, { a: string; b: string }> = {
  blue: { a: "#4fa3e0", b: "#e05050" },
  red: { a: "#e05050", b: "#4fa3e0" },
  green: { a: "#34d399", b: "#f87171" },
  amber: { a: "#fbbf24", b: "#818cf8" },
  violet: { a: "#a78bfa", b: "#fb7185" },
  white: { a: "#dddddd", b: "#aaaaaa" },
};

// CSS keyframes for each variant.
// `noise` falls back to JS-driven logic since Math.random() can't be CSS.
const cssKeyframes: Record<Exclude<GlitchVariant, "noise">, string> = {
  offset: `
    @keyframes glitch-a {
      0%,100% { opacity:0; clip-path:inset(0 0 100% 0); }
      20%     { opacity:.75; clip-path:inset(10% 0 60% 0); transform:translate(-3px, 2px); }
      40%     { opacity:.75; clip-path:inset(50% 0 20% 0); transform:translate( 3px,-2px); }
      60%     { opacity:.75; clip-path:inset(30% 0 40% 0); transform:translate(-2px, 1px); }
      80%     { opacity:.75; clip-path:inset(70% 0 10% 0); transform:translate( 2px,-1px); }
    }
    @keyframes glitch-b {
      0%,100% { opacity:0; clip-path:inset(0 0 100% 0); }
      20%     { opacity:.55; clip-path:inset(60% 0 10% 0); transform:translate( 3px,-2px); }
      40%     { opacity:.55; clip-path:inset(20% 0 50% 0); transform:translate(-3px, 2px); }
      60%     { opacity:.55; clip-path:inset(40% 0 30% 0); transform:translate( 2px,-1px); }
      80%     { opacity:.55; clip-path:inset(10% 0 70% 0); transform:translate(-2px, 1px); }
    }
  `,
  slice: `
    @keyframes glitch-a {
      0%,100% { opacity:0; clip-path:inset(0 0 100% 0); }
      25%     { opacity:.7; clip-path:inset(15% 0 55% 0); transform:translateX( 4px); }
      50%     { opacity:.7; clip-path:inset(45% 0 25% 0); transform:translateX(-4px); }
      75%     { opacity:.7; clip-path:inset(65% 0 15% 0); transform:translateX( 2px); }
    }
    @keyframes glitch-b {
      0%,100% { opacity:0; clip-path:inset(0 0 100% 0); }
      25%     { opacity:.5; clip-path:inset(55% 0 15% 0); transform:translateX(-3px); }
      50%     { opacity:.5; clip-path:inset(25% 0 45% 0); transform:translateX( 3px); }
      75%     { opacity:.5; clip-path:inset(75% 0  5% 0); transform:translateX(-2px); }
    }
  `,
  flicker: `
    @keyframes glitch-a {
      0%,100%             { opacity:0; }
      10%,30%,50%,70%,90% { opacity:.75; }
      20%,40%,60%,80%     { opacity:0; }
    }
    @keyframes glitch-b {
      0%,100%             { opacity:0; }
      15%,35%,55%,75%,95% { opacity:.55; }
      25%,45%,65%,85%     { opacity:0; }
    }
  `,
};

// JS-driven layer styles — only used for `noise`
type LayerStyle = React.CSSProperties;
function getNoiseStyles(tick: number): [LayerStyle, LayerStyle] {
  const dx = () => (Math.random() - 0.5) * 6;
  const dy = () => (Math.random() - 0.5) * 6;
  const slices = [
    "inset(20% 0 50% 0)",
    "inset(60% 0 10% 0)",
    "inset(35% 0 35% 0)",
    "inset(80% 0  5% 0)",
    "inset(10% 0 75% 0)",
  ];
  const t = tick % slices.length;
  return [
    {
      opacity: 0.7,
      clipPath: slices[t],
      transform: `translate(${dx()}px,${dy()}px)`,
    },
    {
      opacity: 0.5,
      clipPath: slices[(t + 2) % slices.length],
      transform: `translate(${dx()}px,${dy()}px)`,
    },
  ];
}

type GlitchProps = React.ComponentProps<"div"> & {
  variant?: GlitchVariant;
  color?: GlitchColor;
  interval?: number;
  duration?: number;
  tickRate?: number;
  disabled?: boolean;
};

export function Glitch({
  children,
  className,
  variant = "offset",
  color = "blue",
  interval = 3500,
  duration = 200,
  tickRate = 50,
  disabled = false,
  ...props
}: GlitchProps) {
  const [active, setActive] = useState(false);
  const [tick, setTick] = useState(0);
  const refs = useRef<{
    outer: ReturnType<typeof setInterval> | null;
    inner: ReturnType<typeof setInterval> | null;
    timeout: ReturnType<typeof setTimeout> | null;
    initial: ReturnType<typeof setTimeout> | null;
  }>({ outer: null, inner: null, timeout: null, initial: null });

  const isNoise = variant === "noise";

  useEffect(() => {
    if (disabled) return;
    const r = refs.current;

    const burst = () => {
      setActive(true);
      // Only run JS tick loop for noise variant
      if (isNoise) {
        let t = 0;
        r.inner = setInterval(() => setTick(++t), tickRate);
      }
      r.timeout = setTimeout(() => {
        if (r.inner) clearInterval(r.inner);
        setActive(false);
      }, duration);
    };

    r.initial = setTimeout(() => {
      burst();
      r.outer = setInterval(burst, interval);
    }, Math.random() * 1000);

    return () => {
      if (r.initial) clearTimeout(r.initial);
      if (r.outer) clearInterval(r.outer);
      if (r.inner) clearInterval(r.inner);
      if (r.timeout) clearTimeout(r.timeout);
    };
  }, [disabled, interval, duration, tickRate, isNoise]);

  const palette = colorMap[color];
  const noiseLayers = isNoise && active ? getNoiseStyles(tick) : null;

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <style>{`
        .glitch-a, .glitch-a * { color: ${palette.a} !important; fill: ${palette.a} !important; }
        .glitch-b, .glitch-b * { color: ${palette.b} !important; fill: ${palette.b} !important; }
        ${!isNoise && active && cssKeyframes[variant as Exclude<GlitchVariant, "noise">]}
        .glitch-a { animation: glitch-a ${duration}ms steps(1) 1 forwards; }
        .glitch-b { animation: glitch-b ${duration}ms steps(1) 1 forwards; }
      `}</style>

      {children}

      {active && (
        <>
          <div
            aria-hidden
            className="glitch-a pointer-events-none absolute inset-0"
            style={
              noiseLayers
                ? { ...noiseLayers[0], transition: "none" }
                : undefined
            }
          >
            {children}
          </div>
          <div
            aria-hidden
            className="glitch-b pointer-events-none absolute inset-0"
            style={
              noiseLayers
                ? { ...noiseLayers[1], transition: "none" }
                : undefined
            }
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

/*

<Glitch color="white" variant="offset" duration={400}>
  <h1 className="text-9xl font-bol text-[#e8f4ff] font-bold leading-none tracking-tight  text-[clamp(120px,22vw,200px)] [text-shadow:0_0_60px_rgba(79,163,224,0.3)]">
    404
  </h1>
</Glitch>

*/
