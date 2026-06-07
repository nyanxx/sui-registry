"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

// ─── Context ──────────────────────────────────────────────────────────────────

type NavContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavContext = React.createContext<NavContextValue | null>(null);

function useNav() {
  const ctx = React.useContext(NavContext);
  if (!ctx)
    throw new Error("Nav compound components must be used within <Nav>");
  return ctx;
}

// ─── Nav (root) ───────────────────────────────────────────────────────────────

type NavProps = React.ComponentProps<"header"> & {
  variant?: "default" | "transparent" | "blur";
};

export function Nav({
  children,
  className,
  variant = "default",
  ...props
}: NavProps) {
  const [open, setOpen] = React.useState(false);

  const variantClass = {
    default: "bg-background border-b border-border",
    transparent: "bg-transparent",
    blur: "bg-background/60 backdrop-blur-md border-b border-border/50",
  }[variant];

  return (
    <NavContext.Provider value={{ open, setOpen }}>
      <header
        className={cn("relative z-20 w-full", variantClass, className)}
        {...props}
      >
        {children}
      </header>
    </NavContext.Provider>
  );
}

// ─── NavContainer ─────────────────────────────────────────────────────────────

export function NavContainer({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        "mx-auto flex max-w-7xl items-center justify-between px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

// ─── NavBrand ─────────────────────────────────────────────────────────────────

export function NavBrand({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-xl font-bold text-foreground", className)}
      {...props}
    />
  );
}

// ─── NavDesktop ───────────────────────────────────────────────────────────────

export function NavDesktop({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("hidden items-center gap-6 md:flex", className)}
      {...props}
    />
  );
}

// ─── NavActions ───────────────────────────────────────────────────────────────
// Groups CTA buttons with consistent spacing.
// Place inside NavDesktop for desktop, or at the bottom of NavMobileMenu.

export function NavActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  );
}

// ─── NavMobileToggle ──────────────────────────────────────────────────────────

export const NavMobileToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { open, setOpen } = useNav();

  return (
    <button
      ref={ref}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls="nav-mobile-menu"
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden",
        className,
      )}
      {...props}
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
});
NavMobileToggle.displayName = "NavMobileToggle";

// ─── NavMobileMenu ────────────────────────────────────────────────────────────
// Must be placed OUTSIDE NavContainer — it renders below the nav bar, not inline.

export function NavMobileMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open } = useNav();

  if (!open) return null;

  return (
    <div
      id="nav-mobile-menu"
      className={cn(
        "mx-4 mb-3 flex flex-col gap-1 rounded-xl border border-border bg-background/95 p-3 backdrop-blur md:hidden",
        className,
      )}
      {...props}
    />
  );
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

const navLinkVariants = cva(
  "rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      placement: {
        desktop: "text-muted-foreground hover:text-foreground",
        mobile:
          "block px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground",
      },
    },
    defaultVariants: {
      placement: "desktop",
    },
  },
);

type NavLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof navLinkVariants>;

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, placement, ...props }, ref) => (
    <a
      ref={ref}
      className={navLinkVariants({ placement, className })}
      {...props}
    />
  ),
);
NavLink.displayName = "NavLink";

// ─── NavCta ───────────────────────────────────────────────────────────────────

const navCtaVariants = cva(
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border text-foreground hover:bg-accent",
        ghost: "text-foreground hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type NavCtaProps = React.ComponentProps<"button"> &
  VariantProps<typeof navCtaVariants>;

export const NavCta = React.forwardRef<HTMLButtonElement, NavCtaProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={navCtaVariants({ variant, className })}
      {...props}
    />
  ),
);
NavCta.displayName = "NavCta";

/*

<Nav variant="transparent">
  <NavContainer>
    <NavBrand>Aurora</NavBrand>

    <NavDesktop>
      <NavLink href="/features">Features</NavLink>
      <NavLink href="/pricing">Pricing</NavLink>
      <NavLink href="/about">About</NavLink>

      <NavActions>
        <NavCta variant="ghost">Login</NavCta>
        <NavCta variant="primary">Start Free</NavCta>
      </NavActions>
    </NavDesktop>

    <NavMobileToggle />
  </NavContainer>

  <NavMobileMenu>
    <NavLink placement="mobile" href="/features">
      Features
    </NavLink>
    <NavLink placement="mobile" href="/pricing">
      Pricing
    </NavLink>
    <NavLink placement="mobile" href="/about">
      About
    </NavLink>

    <NavActions className="mt-2">
      <NavCta variant="ghost">Login</NavCta>
      <NavCta variant="primary">Start Free</NavCta>
    </NavActions>
  </NavMobileMenu>
</Nav>

*/
