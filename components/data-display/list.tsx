"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// ─── Context ──────────────────────────────────────────────────────────────────
// Shares variant + size down so ListItem never needs manual prop threading.

type ListVariant = "disc" | "check" | "numbered" | "steps" | "icon";

const ListContext = React.createContext<{
  variant: ListVariant;
  size: "sm" | "md" | "lg";
}>({ variant: "disc", size: "md" });

const useList = () => React.useContext(ListContext);

// ─── List ─────────────────────────────────────────────────────────────────────

const listVariants = cva("my-0 pl-0 list-none flex flex-col", {
  variants: {
    variant: {
      disc: "[&>li]:flex [&>li]:items-start [&>li]:gap-2",
      check: "[&>li]:flex [&>li]:items-start [&>li]:gap-2",
      numbered:
        "[counter-reset:list-counter] [&>li]:flex [&>li]:items-start [&>li]:gap-2.5",
      steps:
        "[counter-reset:list-counter] [&>li]:flex [&>li]:items-start [&>li]:gap-2.5",
      icon: "[&>li]:flex [&>li]:items-start [&>li]:gap-2.5",
    },
    size: {
      sm: "[&>li]:text-sm gap-1",
      md: "[&>li]:text-base gap-1.5",
      lg: "[&>li]:text-lg gap-2",
    },
    bordered: {
      true: "rounded-md border overflow-hidden [&>li]:px-3 [&>li]:py-2.5 gap-0 divide-y divide-border",
    },
  },
  defaultVariants: {
    variant: "disc",
    size: "md",
  },
});

interface ListProps
  extends
    React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  as?: "ul" | "ol";
}

function List({
  as,
  className,
  variant = "disc",
  size = "md",
  bordered,
  ...props
}: ListProps) {
  const Tag =
    as ?? (variant === "numbered" || variant === "steps" ? "ol" : "ul");

  return (
    <ListContext.Provider
      value={{
        variant: variant as ListVariant,
        size: size as "sm" | "md" | "lg",
      }}
    >
      <Tag
        className={listVariants({ variant, size, bordered, className })}
        {...props}
      />
    </ListContext.Provider>
  );
}

// ─── ListItem ─────────────────────────────────────────────────────────────────

const listItemVariants = cva("py-0.5 text-foreground", {
  variants: {
    variant: {
      disc: "before:content-['•'] before:text-muted-foreground before:shrink-0 before:leading-6",
      check: "",
      numbered: "[counter-increment:list-counter]",
      steps: "[counter-increment:list-counter]",
      icon: "",
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
    Omit<VariantProps<typeof listItemVariants>, "variant"> {
  variant?: ListVariant;
}

function ListItem({ className, variant, muted, ...props }: ListItemProps) {
  const { variant: contextVariant } = useList();
  const resolved = variant ?? contextVariant;

  return (
    <li
      className={cn(listItemVariants({ variant: resolved, muted, className }))}
      {...props}
    />
  );
}

// ─── ListItemMarker ───────────────────────────────────────────────────────────
// Renders the visible counter bubble for numbered/steps variants.
// Receives `index` as a prop — no CSS content trick needed.

const listItemMarkerVariants = cva(
  "flex items-center justify-center shrink-0 w-5 h-5 rounded-full text-[11px] font-semibold mt-0.5",
  {
    variants: {
      variant: {
        numbered: "bg-muted text-muted-foreground border border-border",
        steps: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "numbered",
    },
  },
);

interface ListItemMarkerProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof listItemMarkerVariants> {
  index: number;
}

function ListItemMarker({
  className,
  variant,
  index,
  ...props
}: ListItemMarkerProps) {
  const { variant: contextVariant } = useList();
  const resolved = (variant ?? contextVariant) as "numbered" | "steps";

  return (
    <span
      className={cn(listItemMarkerVariants({ variant: resolved, className }))}
      aria-hidden
      {...props}
    >
      {index}
    </span>
  );
}

// ─── ListItemCheckbox ─────────────────────────────────────────────────────────

const listItemCheckboxVariants = cva(
  "flex items-center justify-center shrink-0 w-4 h-4 rounded-full mt-1",
  {
    variants: {
      checked: {
        true: "bg-emerald-100 dark:bg-emerald-950",
        false: "bg-muted border border-border",
      },
    },
    defaultVariants: { checked: true },
  },
);

interface ListItemCheckboxProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof listItemCheckboxVariants> {}

function ListItemCheckbox({
  className,
  checked = true,
  ...props
}: ListItemCheckboxProps) {
  return (
    <span
      className={cn(listItemCheckboxVariants({ checked, className }))}
      aria-hidden
      {...props}
    >
      {checked && (
        <Check
          className="w-2.5 h-2.5 text-emerald-700 dark:text-emerald-400"
          strokeWidth={3}
        />
      )}
    </span>
  );
}

// ─── DescriptionList ──────────────────────────────────────────────────────────
// Semantically correct dl/dt/dd primitives.
// Kept separate from List since dl uses different HTML elements entirely.

function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      className={cn(
        "divide-y divide-border rounded-md border overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function DescriptionItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-3 py-2.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      className={cn("text-muted-foreground shrink-0", className)}
      {...props}
    />
  );
}

function DescriptionDetails({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return <dd className={cn("font-medium text-right", className)} {...props} />;
}

export {
  List,
  ListItem,
  ListItemMarker,
  ListItemCheckbox,
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
};

export type {
  ListProps,
  ListItemProps,
  ListItemMarkerProps,
  ListItemCheckboxProps,
  ListVariant,
};

// <List>
// <ListItem>Install dependencies</ListItem>
// <ListItem muted>Optional step</ListItem>
// </List>
// <List variant="numbered">
// <ListItem>
// <ListItemMarker index={1} />
// Create project
// </ListItem>
// <ListItem>
// <ListItemMarker index={2} />
// Add components
// </ListItem>
// </List>
// <List variant="steps">
// <ListItem>
// <ListItemMarker variant="steps" index={1} />
// Configure
// </ListItem>
// </List>
// <List variant="check">
// <ListItem>
// <ListItemCheckbox checked />
// TypeScript
// </ListItem>
// <ListItem>
// <ListItemCheckbox checked={false} />
// Dark mode
// </ListItem>
// </List>
// <DescriptionList>
// <DescriptionItem>
// <DescriptionTerm>Framework</DescriptionTerm>
// <DescriptionDetails>Next.js 15</DescriptionDetails>
// </DescriptionItem>
// </DescriptionList>
