"use client";

/**
 * Professional Navbar
 *
 * Always-visible solid bar. Tight, dense, enterprise feel.
 * Logo left, nav center, user actions right.
 * On scroll: a subtle shadow appears.
 *
 * Good for: dashboards, B2B tools, admin panels, corporate sites.
 */

import {
  Navbar,
  NavbarBar,
  NavbarBrand,
  NavbarNav,
  NavbarItem,
  NavbarActions,
  NavbarToggle,
  NavbarDrawer,
  NavbarMobileItem,
  useNavbar,
} from "@/components/navs/base/navbase";
import { cn } from "@/lib/utils";

const links = [
  { value: "solutions", label: "Solutions", href: "#solutions" },
  { value: "platform", label: "Platform", href: "#platform" },
  { value: "enterprise", label: "Enterprise", href: "#enterprise" },
  { value: "resources", label: "Resources", href: "#resources" },
];

function Bar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-7xl h-14 px-6 bg-background border-b border-border",
        scrolled && "shadow-sm",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function ProfessionalNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={8}>
      <Bar>
        {/* Brand — wordmark + optional logo mark */}
        <NavbarBrand>
          <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center">
            <span className="text-[10px] font-bold text-background">C</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Cortex
          </span>
          <span className="hidden sm:inline-block text-xs text-muted-foreground border-l border-border pl-3 ml-1">
            Platform
          </span>
        </NavbarBrand>

        {/* Desktop nav — center aligned */}
        <NavbarNav className="absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <NavbarItem
              key={l.value}
              value={l.value}
              href={l.href}
              indicator={false}
              className="text-xs font-medium uppercase tracking-wide"
            >
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Actions */}
        <NavbarActions>
          <a
            href="#contact"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded text-xs font-medium border border-border hover:bg-accent transition-colors"
          >
            Contact sales
          </a>
          <a
            href="#login"
            className="inline-flex px-3.5 py-1.5 rounded text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Sign in
          </a>
          <NavbarToggle />
        </NavbarActions>
      </Bar>

      {/* Mobile drawer */}
      <NavbarDrawer className="bg-background border-t border-border">
        <nav className="flex flex-col gap-0.5 p-3">
          {links.map((l) => (
            <NavbarMobileItem
              key={l.value}
              href={l.href}
              className="text-xs uppercase tracking-wide font-medium"
            >
              {l.label}
            </NavbarMobileItem>
          ))}
        </nav>
        <div className="px-3 pb-3 flex flex-col gap-2">
          <a
            href="#contact"
            className="text-center py-2 rounded text-xs font-medium border border-border hover:bg-accent transition-colors"
          >
            Contact sales
          </a>
          <a
            href="#login"
            className="text-center py-2 rounded text-xs font-medium bg-foreground text-background"
          >
            Sign in
          </a>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
