import { cva, VariantProps } from "class-variance-authority";

const smallVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "leading-none text-foreground",
      muted: "leading-none text-muted-foreground",
      label: "leading-none text-foreground uppercase tracking-wide",
      error: "leading-none text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Small({
  className,
  variant,
  ...props
}: React.ComponentProps<"small"> & VariantProps<typeof smallVariants>) {
  return <small className={smallVariants({ variant, className })} {...props} />;
}
