"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsContextValue = {
  active: string;
  setActive: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  return ctx;
}

// ─── Tabs (root) ──────────────────────────────────────────────────────────────

type TabsProps = React.ComponentProps<"div"> & {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const active = value ?? internal;
  const setActive = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn(className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ─── TabsList ─────────────────────────────────────────────────────────────────

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      "flex items-center gap-1 border-b border-border px-4",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

const tabsTriggerVariants = cva(
  "relative -mb-px px-3 py-2.5 text-sm font-medium transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      active: {
        true: "border-b-2 border-foreground text-foreground",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type TabsTriggerProps = React.ComponentProps<"button"> &
  VariantProps<typeof tabsTriggerVariants> & {
    value: string;
  };

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ value, className, ...props }, ref) => {
  const { active, setActive } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActive(value)}
      className={tabsTriggerVariants({ active: isActive, className })}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

// ─── TabsContent ──────────────────────────────────────────────────────────────

type TabsContentProps = React.ComponentProps<"div"> & {
  value: string;
};

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...props }, ref) => {
    const { active } = useTabsContext();
    if (active !== value) return null;

    return (
      <div ref={ref} role="tabpanel" className={cn(className)} {...props} />
    );
  },
);
TabsContent.displayName = "TabsContent";

/*

// Uncontrolled
<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">...</TabsContent>
  <TabsContent value="code">...</TabsContent>
</Tabs>

// Controlled
<Tabs value={tab} onValueChange={setTab} defaultValue="preview">
  ...
</Tabs>

*/
