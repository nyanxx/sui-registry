import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const listVariants = cva("my-0 pl-0 list-none flex flex-col", {
  variants: {
    size: {
      sm: "[&>li]:text-sm gap-0.5",
      md: "[&>li]:text-base gap-1",
      lg: "[&>li]:text-lg gap-1.5",
    },
    bordered: {
      true: "rounded-md border divide-y divide-border overflow-hidden [&>li]:px-3 [&>li]:py-2.5 gap-0",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface ListProps
  extends
    React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  as?: "ul" | "ol";
}

export function List({
  as: Tag = "ul",
  className,
  bordered,
  size,
  ...props
}: ListProps) {
  return (
    <Tag className={listVariants({ bordered, size, className })} {...props} />
  );
}

const listItemVariants = cva("py-0.5 text-foreground leading-6", {
  variants: {
    variant: {
      disc: "flex items-baseline gap-2 before:content-['•'] before:text-muted-foreground before:shrink-0",
      check:
        "flex items-baseline gap-2 before:content-['✔'] before:text-emerald-600 before:shrink-0 before:text-xs",
      plain: "",
    },
    muted: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "disc",
  },
});

interface ListItemProps
  extends
    React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {}

export function ListItem({
  className,
  variant,
  muted,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn(listItemVariants({ variant, muted, className }))}
      {...props}
    />
  );
}
