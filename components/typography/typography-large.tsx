import { cva, VariantProps } from "class-variance-authority";

const largeVariants = cva("text-lg font-semibold", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Large({
  className,
  variant,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof largeVariants>) {
  return <p className={largeVariants({ variant, className })} {...props} />;
}
