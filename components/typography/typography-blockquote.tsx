import { cva, VariantProps } from "class-variance-authority";

const blockquoteVariants = cva("border-l-2 pl-6 italic text-foreground", {
  variants: {
    variant: {
      default: "border-border",
      muted: "border-border text-muted-foreground",
      accent: "border-primary text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Blockquote({
  className,
  variant,
  ...props
}: React.ComponentProps<"blockquote"> &
  VariantProps<typeof blockquoteVariants>) {
  return (
    <blockquote
      className={blockquoteVariants({ variant, className })}
      {...props}
    />
  );
}
