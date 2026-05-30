import { cva, VariantProps } from "class-variance-authority";

const h4Variants = cva("scroll-m-20 text-xl font-semibold tracking-tight", {
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

export function H4({
  className,
  variant,
  ...props
}: React.ComponentProps<"h4"> & VariantProps<typeof h4Variants>) {
  return <h4 className={h4Variants({ variant, className })} {...props} />;
}
