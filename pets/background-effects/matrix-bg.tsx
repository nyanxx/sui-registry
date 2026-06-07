"use client";

import { useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// ─── Presets ──────────────────────────────────────────────────────────────────

const colorPresets = {
  blue: { deep: "15,52,96", shallow: "22,78,144" },
  green: { deep: "5,46,22", shallow: "21,128,61" },
  red: { deep: "69,10,10", shallow: "153,27,27" },
  amber: { deep: "92,40,14", shallow: "146,64,14" },
  violet: { deep: "46,16,101", shallow: "109,40,217" },
  neutral: { deep: "30,30,30", shallow: "100,100,100" },
} as const;

const charPresets = {
  matrix: "404NOTFOUND01エラーページ不明",
  binary: "01",
  hex: "0123456789ABCDEF",
  katakana: "アイウエオカキクケコサシスセソタチツテトナニヌネノ",
  digits: "0123456789",
} as const;

export type MatrixColorPreset = keyof typeof colorPresets;
export type MatrixCharPreset = keyof typeof charPresets;

// ─── Variants (class-only concerns) ──────────────────────────────────────────

const matrixBgVariants = cva("pointer-events-none absolute inset-0 z-0", {
  variants: {
    opacity: {
      xs: "opacity-20",
      subtle: "opacity-40",
      soft: "opacity-60",
      strong: "opacity-80",
    },
  },
  defaultVariants: {
    opacity: "soft",
  },
});

// ─── Props ────────────────────────────────────────────────────────────────────

type MatrixBgProps = Omit<React.ComponentProps<"canvas">, "color"> &
  VariantProps<typeof matrixBgVariants> & {
    /** Color theme preset. @default "blue" */
    color?: MatrixColorPreset;
    /** Character set preset. @default "matrix" */
    chars?: MatrixCharPreset;
    /** Provide a custom character string instead of a preset. */
    customChars?: string;
    /** Column width in px — controls density. @default 20 */
    fontSize?: number;
    /** Speed in ms per frame. Lower = faster. @default 40 */
    speed?: number;
    /** Background fade opacity per frame — lower = longer trails. @default 0.07 */
    fade?: number;
  };

// ─── Component ────────────────────────────────────────────────────────────────

export function MatrixBg({
  className,
  opacity,
  color = "blue",
  chars = "matrix",
  customChars,
  fontSize = 14,
  speed = 40,
  fade = 0.07,
  ...props
}: MatrixBgProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const charSet = customChars ?? charPresets[chars];
    const palette = colorPresets[color];
    const colWidth = fontSize + 6;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const cols = Math.floor(canvas.width / colWidth);
    const drops: number[] = Array(cols).fill(1);

    let id: number;
    let last = 0;

    const draw = (ts: number) => {
      id = requestAnimationFrame(draw);
      if (ts - last < speed) return;
      last = ts;

      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charSet[Math.floor(Math.random() * charSet.length)];
        const deep = drops[i] * colWidth > canvas.height * 0.6;
        const rgb = deep ? palette.deep : palette.shallow;
        const a = (Math.random() * 0.4 + 0.1).toFixed(2);

        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fillText(char, i * colWidth, drops[i] * colWidth);

        if (drops[i] * colWidth > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    };

    id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
  }, [color, chars, customChars, fontSize, speed, fade]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={matrixBgVariants({ opacity, className })}
      {...props}
    />
  );
}

/*
  <MatrixBg color="blue" chars="matrix" opacity="soft" />


  <MatrixBg color="green" chars="katakana" speed={50} fade={0.05} />



<MatrixBg color="violet" customChars="ΔΨΩλμπ" speed={80} fade={0.04} opacity="subtle" />

*/
