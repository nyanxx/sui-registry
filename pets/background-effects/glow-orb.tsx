import { cn } from "@/lib/utils";
import React from "react";

type GlowOrbProps = React.ComponentProps<"div">;

export const GlowOrb = React.forwardRef<HTMLDivElement, GlowOrbProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px]",
        className,
      )}
      {...props}
    />
  ),
);
GlowOrb.displayName = "GlowOrb";

/*

<GlowOrb className="h-150 w-150 -left-32 top-10 bg-amber-500/10" />
<GlowOrb className="h-125 w-125 right-0 top-1/3 bg-indigo-600/8" />
<GlowOrb className="h-75 w-75 left-1/2 bottom-0 bg-amber-400/6" />

Purple orb, top-right 
<GlowOrb className="top-[-80px] right-[-60px] h-64 w-64 bg-purple-500/40" />

 Teal orb, bottom-left 
<GlowOrb className="bottom-0 left-[-40px] h-48 w-48 bg-teal-400/30" />

*/
