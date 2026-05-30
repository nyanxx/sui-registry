import { cva, VariantProps } from "class-variance-authority";

const h3Variants = cva("scroll-m-20 text-2xl font-semibold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      dimmed: "text-foreground/60",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function H3({
  className,
  variant,
  ...props
}: React.ComponentProps<"h3"> & VariantProps<typeof h3Variants>) {
  return <h3 className={h3Variants({ variant, className })} {...props} />;
}
