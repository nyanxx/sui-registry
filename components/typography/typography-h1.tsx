import { cva, VariantProps } from "class-variance-authority";

const h1Variants = cva(
  "scroll-m-20 tracking-tight font-extrabold text-balance text-foreground",
  {
    variants: {
      variant: {
        default: "text-6xl leading-[1.1]",
        small: "text-4xl leading-tight",
        display: "text-7xl leading-[1.05]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function H1({
  className,
  variant,
  ...props
}: React.ComponentProps<"h1"> & VariantProps<typeof h1Variants>) {
  return <h1 className={h1Variants({ variant, className })} {...props} />;
}
