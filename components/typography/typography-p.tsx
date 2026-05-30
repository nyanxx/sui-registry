import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const pVariants = cva("", {
  variants: {
    variant: {
      body: "text-base leading-7 text-foreground",
      compact: "text-sm",
      lead: "text-xl leading-8 text-foreground/80 font-medium",
      muted: "text-sm leading-6 text-muted-foreground",
      caption: "text-xs leading-4 text-muted-foreground",
      error: "text-sm text-destructive font-medium",
      success: "text-sm text-emerald-600 dark:text-emerald-400 font-medium",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export function P({
  className,
  variant,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof pVariants>) {
  return <p className={pVariants({ variant, className })} {...props} />;
}

export function Chapter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}
