import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TerminalVariant = "macos" | "windows" | "linux" | "retro" | "fancy";

// ─── Variant maps ─────────────────────────────────────────────────────────────

const containerVariants = cva(
  "rounded font-mono text-xs text-left overflow-hidden",
  {
    variants: {
      variant: {
        macos: "bg-[#1e1e1e] border border-[#3a3a3a] shadow-xl",
        windows: "bg-[#0c0c0c] border border-[#3a3a3a] shadow-xl",
        linux: "bg-[#1a1a2e] border border-[#2a2a4a] shadow-lg",
        retro:
          "bg-[#0a0a00] border-2 border-[#3a3a00] shadow-[0_0_20px_rgba(180,160,0,0.2)]",
        fancy:
          "bg-[#0d0d1a]/80 border border-[rgba(79,163,224,0.3)] shadow-[0_0_30px_rgba(79,163,224,0.1)] backdrop-blur-md",
      },
    },
    defaultVariants: { variant: "macos" },
  },
);

const titleBarVariants = cva("flex items-center px-3 py-2 select-none", {
  variants: {
    variant: {
      macos: "bg-[#2d2d2d] border-b border-[#3a3a3a]",
      windows: "bg-[#1a1a1a] border-b border-[#333]",
      linux: "bg-[#16213e] border-b border-[#2a2a4a]",
      retro: "bg-[#1a1a00] border-b-2 border-[#3a3a00]",
      fancy:
        "bg-[rgba(79,163,224,0.08)] border-b border-[rgba(79,163,224,0.2)]",
    },
  },
  defaultVariants: { variant: "macos" },
});

const bodyVariants = cva("px-4 py-3 leading-relaxed", {
  variants: {
    variant: {
      macos: "text-[#cdd6f4]",
      windows: "text-[#cccccc]",
      linux: "text-[#a0ffb0]",
      retro: "text-[#c8b400] [text-shadow:0_0_8px_rgba(200,180,0,0.6)]",
      fancy: "text-[#e8f4ff]",
    },
  },
  defaultVariants: { variant: "macos" },
});

// ─── Context ──────────────────────────────────────────────────────────────────

import { createContext, useContext } from "react";

const TerminalContext = createContext<{ variant: TerminalVariant }>({
  variant: "macos",
});
const useTerminal = () => useContext(TerminalContext);

// ─── Terminal (root) ──────────────────────────────────────────────────────────

type TerminalProps = React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    /** Animated glowing border. Only visible on fancy variant by default. */
    animated?: boolean;
  };

export function Terminal({
  children,
  className,
  variant = "macos",
  animated = false,
  ...props
}: TerminalProps) {
  return (
    <TerminalContext.Provider value={{ variant: variant as TerminalVariant }}>
      <div
        className={containerVariants({ variant, className })}
        style={
          animated
            ? { animation: "pulse-border 3s ease-in-out infinite" }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    </TerminalContext.Provider>
  );
}

// ─── TerminalTitleBar ─────────────────────────────────────────────────────────

type TerminalTitleBarProps = React.ComponentProps<"div"> & {
  title?: string;
  user?: string;
  host?: string;
};

export function TerminalTitleBar({
  className,
  title,
  user = "user",
  host = "localhost",
  ...props
}: TerminalTitleBarProps) {
  const { variant } = useTerminal();

  return (
    <div className={titleBarVariants({ variant, className })} {...props}>
      {variant === "macos" && (
        <>
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          {title && (
            <span className="mx-auto text-[11px] text-[#6b6b6b]">{title}</span>
          )}
        </>
      )}

      {variant === "windows" && (
        <>
          {title && (
            <span className="flex-1 text-[11px] text-[#cccccc]">
              {title ?? "Terminal"}
            </span>
          )}
          <div className="flex gap-3 text-[11px] text-[#999]">
            <span className="cursor-pointer hover:text-white">─</span>
            <span className="cursor-pointer hover:text-white">□</span>
            <span className="cursor-pointer hover:text-red-400">✕</span>
          </div>
        </>
      )}

      {variant === "linux" && (
        <span className="text-[11px] text-[#7a7aaa]">
          {user}@{host}
          {title ? `: ${title}` : ""}
        </span>
      )}

      {variant === "retro" && (
        <span className="text-[11px] text-[#8a7a00] tracking-widest uppercase">
          {title ?? "terminal"}
        </span>
      )}

      {variant === "fancy" && (
        <>
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[rgba(79,163,224,0.1)] border border-[rgba(79,163,224,0.3)]" />
            <span className="h-2 w-2 rounded-full bg-[rgba(79,163,224,0.2)] border border-[rgba(79,163,224,0.4)]" />
            <span className="h-2 w-2 rounded-full bg-[rgba(79,163,224,0.4)] border border-[rgba(79,163,224,0.6)]" />
          </div>
          {title && (
            <span className="mx-auto text-[11px] text-[#4fa3e0]/60">
              {title}
            </span>
          )}
        </>
      )}
    </div>
  );
}

// ─── TerminalBody ─────────────────────────────────────────────────────────────

export function TerminalBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { variant } = useTerminal();
  return <div className={bodyVariants({ variant, className })} {...props} />;
}

// ─── TerminalLine ─────────────────────────────────────────────────────────────
// A single line of output — plain text, no prompt.

export function TerminalLine({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("leading-relaxed", className)} {...props} />;
}

// ─── TerminalPrompt ───────────────────────────────────────────────────────────
// A command line with prompt symbol, command, flags, and args as children.

type TerminalPromptProps = React.ComponentProps<"div"> & {
  symbol?: string;
};

export function TerminalPrompt({
  className,
  symbol,
  children,
  ...props
}: TerminalPromptProps) {
  const { variant } = useTerminal();

  const defaultSymbol: Record<TerminalVariant, string> = {
    macos: "❯",
    windows: ">",
    linux: "$",
    retro: ">",
    fancy: "$",
  };

  const symbolColor: Record<TerminalVariant, string> = {
    macos: "text-[#89b4fa]",
    windows: "text-[#cccccc]",
    linux: "text-[#50fa7b]",
    retro: "text-[#c8b400]",
    fancy: "text-[#3d6a8a]",
  };

  return (
    <div
      className={cn("flex items-center gap-1.5 flex-wrap", className)}
      {...props}
    >
      <span className={cn("shrink-0", symbolColor[variant])}>
        {symbol ?? defaultSymbol[variant]}
      </span>
      {children}
    </div>
  );
}

// ─── TerminalCommand ──────────────────────────────────────────────────────────

export function TerminalCommand({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { variant } = useTerminal();

  const color: Record<TerminalVariant, string> = {
    macos: "text-[#89dceb]",
    windows: "text-[#4ec9b0]",
    linux: "text-[#50fa7b]",
    retro: "text-[#e8d000]",
    fancy: "text-[#4fa3e0]",
  };

  return <span className={cn(color[variant], className)} {...props} />;
}

// ─── TerminalFlag ─────────────────────────────────────────────────────────────

export function TerminalFlag({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { variant } = useTerminal();

  const color: Record<TerminalVariant, string> = {
    macos: "text-[#cba6f7]",
    windows: "text-[#9cdcfe]",
    linux: "text-[#8be9fd]",
    retro: "text-[#a09000]",
    fancy: "text-[#7ab8d8]",
  };

  return <span className={cn(color[variant], className)} {...props} />;
}

// ─── TerminalArg ──────────────────────────────────────────────────────────────

export function TerminalArg({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { variant } = useTerminal();

  const color: Record<TerminalVariant, string> = {
    macos: "text-[#a6e3a1]",
    windows: "text-[#ce9178]",
    linux: "text-[#f1fa8c]",
    retro: "text-[#c8b400]",
    fancy: "text-[#e8f4ff]",
  };

  return <span className={cn(color[variant], className)} {...props} />;
}

// ─── TerminalOutput ───────────────────────────────────────────────────────────

export function TerminalOutput({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mt-1 opacity-80", className)} {...props} />;
}

// ─── TerminalError ────────────────────────────────────────────────────────────

export function TerminalError({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("text-[#e05050]", className)} {...props} />;
}

// ─── TerminalSuccess ──────────────────────────────────────────────────────────

export function TerminalSuccess({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("text-[#50fa7b]", className)} {...props} />;
}

// ─── TerminalCursor ───────────────────────────────────────────────────────────

type TerminalCursorProps = React.ComponentProps<"span"> & {
  shape?: "block" | "bar" | "underline";
};

export function TerminalCursor({
  className,
  shape = "block",
  ...props
}: TerminalCursorProps) {
  const { variant } = useTerminal();

  const color: Record<TerminalVariant, string> = {
    macos: "bg-[#cdd6f4]",
    windows: "bg-[#cccccc]",
    linux: "bg-[#50fa7b]",
    retro: "bg-[#c8b400] shadow-[0_0_6px_rgba(200,180,0,0.8)]",
    fancy: "bg-[#4fa3e0]",
  };

  const shapeClass = {
    block: "inline-block w-2 h-[1em] translate-y-[2px]",
    bar: "inline-block w-0.5 h-[1em] translate-y-[2px]",
    underline: "inline-block w-2 h-0.5 translate-y-[1px]",
  }[shape];

  return (
    <span
      className={cn(
        shapeClass,
        color[variant],
        "animate-[blink_1s_step-end_infinite]",
        className,
      )}
      aria-hidden
      {...props}
    >
      <style>{`
        @keyframes blink {
          0%,100% { opacity:1; }
          50%     { opacity:0; }
        }
      `}</style>
    </span>
  );
}

/*


const resolvedPath = typeof window !== "undefined" ? window.location.pathname : "/unknown";
<Terminal animated variant={"fancy"} className="mb-6">
  <TerminalTitleBar className="flex-row-reverse" title=PS />
  <TerminalBody>
    <TerminalPrompt>
      <TerminalCommand>resolve</TerminalCommand>
      <TerminalFlag>--path</TerminalFlag>
      <TerminalArg>{resolvedPath}</TerminalArg>
      <TerminalCursor className="-translate-y-px" />
    </TerminalPrompt>
    <TerminalOutput>
      <TerminalError>✗ ERROR: destination unreachable</TerminalError>
    </TerminalOutput>
  </TerminalBody>
</Terminal>


<Terminal variant="retro">...</Terminal>
<Terminal variant="macos">...</Terminal>
<Terminal variant="linux">...</Terminal>

Primitives available:
Terminal, 
TerminalTitleBar, 
TerminalBody, 
TerminalLine, 
TerminalPrompt, 
TerminalCommand, 
TerminalFlag, 
TerminalArg, 
TerminalOutput, 
TerminalError, 
TerminalSuccess, 
TerminalCursor

*/
