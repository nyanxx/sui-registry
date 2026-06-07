"use client";

import { cva, type VariantProps } from "class-variance-authority";

const scanLineVariants = cva(
  "pointer-events-none absolute left-0 right-0 z-20",
  {
    variants: {
      color: {
        blue: "[--sl-mid:#4fa3e0] [--sl-edge:#164e90]",
        green: "[--sl-mid:#4ade80] [--sl-edge:#166534]",
        red: "[--sl-mid:#f87171] [--sl-edge:#991b1b]",
        amber: "[--sl-mid:#fbbf24] [--sl-edge:#92400e]",
        violet: "[--sl-mid:#a78bfa] [--sl-edge:#4c1d95]",
        white: "[--sl-mid:#ffffff] [--sl-edge:#9ca3af]",
      },
      thickness: {
        sm: "h-px",
        md: "h-0.5",
        lg: "h-1",
      },
      speed: {
        slow: "[--sl-duration:8s]",
        normal: "[--sl-duration:4s]",
        fast: "[--sl-duration:2s]",
      },
    },
    defaultVariants: {
      color: "blue",
      thickness: "sm",
      speed: "normal",
    },
  },
);

type ScanLineProps = React.ComponentProps<"div"> &
  VariantProps<typeof scanLineVariants>;

export function ScanLine({
  className,
  color,
  thickness,
  speed,
  ...props
}: ScanLineProps) {
  return (
    <div
      aria-hidden
      className={scanLineVariants({ color, thickness, speed, className })}
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--sl-edge) 20%, var(--sl-mid) 50%, var(--sl-edge) 80%, transparent)",
        animation: "scan-line var(--sl-duration, 4s) linear infinite",
        top: 0,
      }}
      {...props}
    >
      <style>{`
        @keyframes scan-line {
          0%   { top: -2; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/*
<ScanLine />
<ScanLine color="green" speed="slow" thickness="md" />
<ScanLine color="amber" speed="fast" />
*/
