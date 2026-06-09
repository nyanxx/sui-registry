"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

/*
  Uses navigator.clipboard with a textarea fallback for older browsers.
  Copied state auto-resets after `resetDelay` ms.

  Variants:
  - default  — for use on normal page backgrounds (light + dark mode aware)
  - ghost    — for use on dark surfaces like code block headers (stays subtle)
*/

const copyButtonVariants = cva(
  "inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-ring select-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
        ghost:   "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200",
      },
      copied: {
        true:  "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        copied:  true,
        // className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
        className: "",
      },
      {
        variant: "ghost",
        copied:  true,
        className: "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/20",
      },
    ],
    defaultVariants: {
      variant: "default",
      copied:  false,
    },
  }
);

type CopyButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof copyButtonVariants> & {
    text:        string;
    resetDelay?: number;
  };

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, resetDelay = 2000, variant = "default", className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleCopy = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    }, [text, resetDelay]);

    return (
      <button
        ref={ref}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        aria-live="polite"
        className={cn(
          copyButtonVariants({ variant, copied }),
          className
        )}
        {...props}
      >
        {copied ? (
          <>
            <Check size={12} strokeWidth={2.5} />
            Copied
          </>
        ) : (
          <>
            <Copy size={12} strokeWidth={2} />
            Copy
          </>
        )}
      </button>
    );
  }
);
CopyButton.displayName = "CopyButton";


/*

<CopyButton text={code} variant="ghost" />
<CopyButton text={someText} />
*/