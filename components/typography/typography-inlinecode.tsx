import { cva, VariantProps } from "class-variance-authority";

const inlineCodeVariants = cva(
  "rounded font-mono text-sm font-semibold px-[0.3rem] py-[0.2rem]",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        destructive: "bg-destructive/10 text-destructive",
        ghost: "text-foreground underline underline-offset-4 decoration-dashed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function InlineCode({
  className,
  variant,
  ...props
}: React.ComponentProps<"code"> & VariantProps<typeof inlineCodeVariants>) {
  return (
    <code className={inlineCodeVariants({ variant, className })} {...props} />
  );
}
