"use client";

/**
 * navbar.tsx — Unified Navbar compound component
 *
 * Philosophy:
 *  - The root <Navbar> owns three pieces of shared state: open, active, scrolled.
 *  - All visual behavior (sticky, floating, transparent→blur transition) is
 *    opt-in via props / className — nothing is hard-coded into the root.
 *  - Every child reads from context, so any piece can react to scroll/open/active
 *    without prop-drilling.
 *  - Transitions use CSS (max-h + opacity) — never `if (!open) return null`,
 *    so animations always play correctly.
 *  - The `useNavbar` hook is exported so you can build headless extensions on
 *    top of the same context.
 *
 * Variants supported out of the box (all composable):
 *  - Default sticky with scroll-aware background
 *  - Floating / dock (pill shape that appears on scroll)
 *  - Transparent hero navbar that frosts on scroll
 *  - Simple static bar
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type NavbarContextValue = {
  /** Whether the mobile drawer is open */
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** Which nav item is currently active/hovered */
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  /** True once the page has scrolled past `scrollThreshold` */
  scrolled: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

const NavbarContext = React.createContext<NavbarContextValue | null>(null);

export function useNavbar(): NavbarContextValue {
  const ctx = React.useContext(NavbarContext);
  if (!ctx)
    throw new Error("Navbar compound components must be used inside <Navbar>");
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal hooks
// ─────────────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 16, enabled = true): boolean {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;

    const check = () => setScrolled(window.scrollY > threshold);
    check();

    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold, enabled]);

  return scrolled;
}

// ─────────────────────────────────────────────────────────────────────────────
// Navbar (root)
// ─────────────────────────────────────────────────────────────────────────────

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Fix the bar to the viewport top.
   * @default true
   */
  fixed?: boolean;
  /**
   * Track window.scrollY and expose `scrolled` via context + data-scrolled attr.
   * @default true
   */
  trackScroll?: boolean;
  /**
   * Pixels of scroll before `scrolled` flips to true.
   * @default 16
   */
  scrollThreshold?: number;
  /**
   * Close the mobile drawer when the viewport reaches this width (px).
   * @default 768
   */
  mobileBreakpoint?: number;
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      children,
      className,
      fixed = true,
      trackScroll = true,
      scrollThreshold = 16,
      mobileBreakpoint = 768,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<string | null>(null);
    const scrolled = useScrolled(scrollThreshold, trackScroll);

    // Close drawer on desktop resize
    React.useEffect(() => {
      const handler = () => {
        if (window.innerWidth >= mobileBreakpoint) setOpen(false);
      };
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }, [mobileBreakpoint]);

    // Close drawer on Escape
    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
      <NavbarContext.Provider
        value={{ open, setOpen, active, setActive, scrolled }}
      >
        <header
          ref={ref}
          data-scrolled={scrolled ? "" : undefined}
          data-open={open ? "" : undefined}
          className={cn(
            "w-full z-50 transition-all duration-300",
            fixed && "fixed inset-x-0 top-0",
            className,
          )}
          {...props}
        >
          {children}
        </header>
      </NavbarContext.Provider>
    );
  },
);
Navbar.displayName = "Navbar";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarBar
//
// The visible horizontal strip. Accepts any className for visual variants —
// see the usage examples below for how scroll-aware styling works.
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { scrolled } = useNavbar();

  return (
    <div
      ref={ref}
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "flex items-center justify-between transition-all duration-300",
        className,
      )}
      {...props}
    />
  );
});
NavbarBar.displayName = "NavbarBar";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarBrand
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
));
NavbarBrand.displayName = "NavbarBrand";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarNav  (desktop link list)
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarNav = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    role="list"
    className={cn("hidden md:flex items-center gap-1", className)}
    {...props}
  />
));
NavbarNav.displayName = "NavbarNav";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarItem  (desktop nav link)
// ─────────────────────────────────────────────────────────────────────────────

export interface NavbarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Unique identifier used to track the active item */
  value: string;
  /** Override active state manually */
  active?: boolean;
  /** Show the bottom-line indicator when active */
  indicator?: boolean;
}

export const NavbarItem = React.forwardRef<HTMLAnchorElement, NavbarItemProps>(
  (
    {
      value,
      active: activeProp,
      indicator = true,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const { active, setActive } = useNavbar();
    const isActive = activeProp ?? active === value;

    return (
      <li>
        <a
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "relative inline-flex items-center rounded-md px-3.5 py-1.5",
            "text-sm transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent",
            className,
          )}
          onMouseEnter={(e) => {
            setActive(value);
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            setActive(null);
            onMouseLeave?.(e);
          }}
          onFocus={(e) => {
            setActive(value);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setActive(null);
            onBlur?.(e);
          }}
          {...props}
        >
          {indicator && (
            <span
              aria-hidden
              className={cn(
                "absolute bottom-0.5 left-1/2 -translate-x-1/2",
                "h-0.5 rounded-full bg-primary",
                "transition-all duration-200",
                isActive ? "w-4 opacity-100" : "w-0 opacity-0",
              )}
            />
          )}
          {children}
        </a>
      </li>
    );
  },
);
NavbarItem.displayName = "NavbarItem";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarActions  (right-side slot — buttons, avatar, etc.)
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
NavbarActions.displayName = "NavbarActions";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarToggle  (hamburger — auto-shows on mobile)
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { open, setOpen } = useNavbar();

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls="navbar-drawer"
      aria-label={open ? "Close navigation" : "Open navigation"}
      className={cn(
        "inline-flex md:hidden items-center justify-center",
        "h-9 w-9 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      onClick={(e) => {
        setOpen((v) => !v);
        onClick?.(e);
      }}
      {...props}
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
});
NavbarToggle.displayName = "NavbarToggle";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarDrawer  (mobile slide-down panel)
//
// Uses max-h + opacity for smooth animation — never unmounts so transitions
// always play. Place this as a sibling of NavbarBar, not inside it.
// ─────────────────────────────────────────────────────────────────────────────

export const NavbarDrawer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useNavbar();

  return (
    <div
      ref={ref}
      id="navbar-drawer"
      aria-hidden={!open}
      className={cn(
        "md:hidden overflow-hidden",
        "transition-all duration-300 ease-in-out",
        "motion-reduce:transition-none",
        open ? "max-h-128 opacity-100" : "max-h-0 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
NavbarDrawer.displayName = "NavbarDrawer";

// ─────────────────────────────────────────────────────────────────────────────
// NavbarMobileItem  (link inside the drawer)
// ─────────────────────────────────────────────────────────────────────────────

export interface NavbarMobileItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Auto-close the drawer when this link is clicked */
  closeOnSelect?: boolean;
}

export const NavbarMobileItem = React.forwardRef<
  HTMLAnchorElement,
  NavbarMobileItemProps
>(({ closeOnSelect = true, onClick, className, ...props }, ref) => {
  const { setOpen } = useNavbar();

  return (
    <a
      ref={ref}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2.5",
        "text-sm text-muted-foreground",
        "hover:text-foreground hover:bg-accent",
        "transition-colors",
        className,
      )}
      onClick={(e) => {
        if (closeOnSelect) setOpen(false);
        onClick?.(e);
      }}
      {...props}
    />
  );
});
NavbarMobileItem.displayName = "NavbarMobileItem";

// ─────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLES
// ─────────────────────────────────────────────────────────────────────────────
//
// ─── 1. Minimal sticky bar ────────────────────────────────────────────────────
//
// <Navbar>
//   <NavbarBar className="mx-auto max-w-6xl h-16 px-6">
//     <NavbarBrand>Acme</NavbarBrand>
//     <NavbarNav>
//       <NavbarItem value="about" href="#about">About</NavbarItem>
//       <NavbarItem value="pricing" href="#pricing">Pricing</NavbarItem>
//     </NavbarNav>
//     <NavbarActions>
//       <button className="...">Login</button>
//     </NavbarActions>
//   </NavbarBar>
// </Navbar>
//
//
// ─── 2. Transparent hero → frosted glass on scroll ───────────────────────────
//
// <Navbar
//   className={cn(
//     scrolled
//       ? "border-b border-border bg-background/80 backdrop-blur-md shadow-sm"
//       : "bg-transparent",
//   )}
// >
//   {/* ... */}
// </Navbar>
//
// Or use data-scrolled attribute in CSS:
//
//   .navbar[data-scrolled] { background: ...; backdrop-filter: blur(12px); }
//
//
// ─── 3. Floating pill / dock ─────────────────────────────────────────────────
//
// <Navbar className="px-4 pt-4">
//   <NavbarBar
//     className={cn(
//       "mx-auto max-w-3xl h-14 px-5 rounded-2xl border border-border",
//       scrolled
//         ? "bg-background/90 backdrop-blur-md shadow-lg"
//         : "bg-background shadow-sm",
//     )}
//   >
//     {/* ... */}
//   </NavbarBar>
// </Navbar>
//
//
// ─── 4. With mobile drawer ───────────────────────────────────────────────────
//
// <Navbar className="bg-background border-b border-border">
//   <NavbarBar className="mx-auto max-w-6xl h-16 px-6">
//     <NavbarBrand>Acme</NavbarBrand>
//     <NavbarNav>
//       <NavbarItem value="docs" href="/docs">Docs</NavbarItem>
//     </NavbarNav>
//     <NavbarActions>
//       <NavbarToggle />
//     </NavbarActions>
//   </NavbarBar>
//
//   <NavbarDrawer className="border-t border-border bg-background/95">
//     <nav className="p-3 flex flex-col gap-0.5">
//       <NavbarMobileItem href="/docs">Docs</NavbarMobileItem>
//       <NavbarMobileItem href="/blog">Blog</NavbarMobileItem>
//     </nav>
//   </NavbarDrawer>
// </Navbar>
//
//
// ─── 5. Headless — build your own scroll-reactive child ──────────────────────
//
// function MyCustomBadge() {
//   const { scrolled } = useNavbar();
//   return <span className={scrolled ? "opacity-100" : "opacity-0"}>↑ Top</span>;
// }
