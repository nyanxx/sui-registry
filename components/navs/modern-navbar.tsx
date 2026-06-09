"use client";

/**
 * Modern Navbar
 *
 * Transparent on top of a hero. On scroll:
 *   - background frosts (backdrop-blur + bg-background/80)
 *   - a 1px bottom border fades in
 *   - the logo tightens slightly
 *
 * Good for: landing pages, marketing sites, SaaS homepages.
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
  { value: "product", label: "Product", href: "#product" },
  { value: "pricing", label: "Pricing", href: "#pricing" },
  { value: "docs", label: "Docs", href: "#docs" },
  { value: "blog", label: "Blog", href: "#blog" },
];

// Reads scrolled from context — no prop drilling needed
function ScrollAwareBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-6xl h-16 px-6",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function ModernNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={24}>
      <ScrollAwareBar>
        {/* Brand */}
        <NavbarBrand>
          <span className="text-base font-semibold tracking-tight">Acme</span>
        </NavbarBrand>

        {/* Desktop links */}
        <NavbarNav>
          {links.map((l) => (
            <NavbarItem key={l.value} value={l.value} href={l.href}>
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Actions */}
        <NavbarActions>
          <a
            href="#login"
            className="hidden sm:inline-flex px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Get started
          </a>
          <NavbarToggle />
        </NavbarActions>
      </ScrollAwareBar>

      {/* Mobile drawer */}
      <NavbarDrawer className="bg-background/95 backdrop-blur border-t border-border">
        <nav className="flex flex-col gap-0.5 p-3">
          {links.map((l) => (
            <NavbarMobileItem key={l.value} href={l.href}>
              {l.label}
            </NavbarMobileItem>
          ))}
        </nav>
        <div className="flex gap-2 px-3 pb-4">
          <a
            href="#login"
            className="flex-1 text-center py-2 rounded-lg text-sm border border-border hover:bg-accent transition-colors"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="flex-1 text-center py-2 rounded-lg text-sm bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Get started
          </a>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
