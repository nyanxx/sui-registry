import { cva, VariantProps } from "class-variance-authority";
import { Separator } from "@/components/ui/separator";

const textedSeparatorVariants = cva("flex items-center gap-3 w-full", {
  variants: {
    variant: {
      default: "[&>span]:text-muted-foreground",
      strong: "[&>span]:text-foreground [&>span]:font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function TextedSeparator({
  children,
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof textedSeparatorVariants> & {
    children: string;
  }) {
  return (
    <div className={textedSeparatorVariants({ variant, className })} {...props}>
      <Separator className="flex-1" />
      <span className="text-sm text-nowrap">{children}</span>
      <Separator className="flex-1" />
    </div>
  );
}
