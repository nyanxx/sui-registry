import { cva, VariantProps } from "class-variance-authority";

const mutedVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs leading-4",
      md: "text-sm leading-5",
      lg: "text-base leading-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export function Muted({
  className,
  size,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof mutedVariants>) {
  return <p className={mutedVariants({ size, className })} {...props} />;
}
