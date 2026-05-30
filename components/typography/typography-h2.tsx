import { cva, VariantProps } from "class-variance-authority";

const h2Variants = cva("scroll-m-20 text-3xl font-semibold tracking-tight", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      dimmed: "text-foreground/60",
      section: "border-b pb-2 text-foreground first:mt-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function H2({
  className,
  variant,
  ...props
}: React.ComponentProps<"h2"> & VariantProps<typeof h2Variants>) {
  return <h2 className={h2Variants({ variant, className })} {...props} />;
}
