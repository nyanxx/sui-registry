import { cva, VariantProps } from "class-variance-authority";

const leadVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      default: "text-xl leading-8",
      small: "text-sm leading-6 md:text-base md:leading-7",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Lead({
  className,
  variant,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof leadVariants>) {
  return <p className={leadVariants({ variant, className })} {...props} />;
}
