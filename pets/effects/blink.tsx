import { cn } from "@/lib/utils";

/*
  EXTRACT: copy the @keyframes block below to your globals.css and use
  className="animate-[blink_1s_step-end_infinite]" directly if you
  don't want the wrapper.

  @keyframes blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0; }
  }
*/

type BlinkProps = React.ComponentProps<"span"> & {
  /** @default "normal" */
  speed?: "slow" | "normal" | "fast";
  disabled?: boolean;
};

const speedMap = {
  slow: "2s",
  normal: "1s",
  fast: "0.5s",
} as const;

export function Blink({
  children,
  className,
  speed = "normal",
  disabled = false,
  ...props
}: BlinkProps) {
  const duration = speedMap[speed];

  return (
    <span className={cn(className)} {...props}>
      <style>{`
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
      `}</style>
      <span
        style={
          disabled
            ? undefined
            : { animation: `blink ${duration} step-end infinite` }
        }
      >
        {children}
      </span>
    </span>
  );
}

/*

<Blink>|</Blink>
<Blink speed="slow">●</Blink>
<Blink speed="fast" className="text-red-500">!</Blink>
<Blink disabled>|</Blink>

<Blink>
  <div className="ml-[3px] inline-block h-[12px] w-[8px] translate-y-[1px] bg-[#4fa3e0]"></div>
</Blink>

*/