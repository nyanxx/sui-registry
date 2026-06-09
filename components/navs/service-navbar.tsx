"use client";

/**
 * Service / Agency Navbar
 *
 * Two-tier: a slim top utility bar (location, phone, social) and
 * the main navigation bar below it. The utility bar hides on scroll
 * and the main bar sticks + gains a shadow.
 *
 * Good for: agencies, law firms, clinics, local businesses, restaurants.
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
  { value: "services", label: "Services", href: "#services" },
  { value: "work", label: "Our Work", href: "#work" },
  { value: "about", label: "About", href: "#about" },
  { value: "careers", label: "Careers", href: "#careers" },
];

// ── Utility bar (hides on scroll) ──────────────────────────────────────────

function UtilityBar() {
  const { scrolled } = useNavbar();

  return (
    <div
      className={cn(
        "w-full overflow-hidden transition-all duration-300",
        scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
      )}
    >
      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between text-xs">
          <span className="text-background/70">📍 Mumbai, India</span>
          <span className="hidden sm:block text-background/70">
            Mon – Fri, 9 AM – 6 PM
          </span>
          <a
            href="tel:+919999999999"
            className="text-background/90 hover:text-background transition-colors"
          >
            +91 99999 99999
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main bar ───────────────────────────────────────────────────────────────

function MainBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-7xl h-16 px-6 bg-background border-b border-border",
        scrolled && "shadow-md shadow-black/5",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function ServiceNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={10}>
      <UtilityBar />

      <MainBar>
        {/* Brand */}
        <NavbarBrand>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">
              Meridian
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
              Creative Studio
            </span>
          </div>
        </NavbarBrand>

        {/* Desktop links */}
        <NavbarNav>
          {links.map((l) => (
            <NavbarItem key={l.value} value={l.value} href={l.href}>
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* CTA */}
        <NavbarActions>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold
                       bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Let&apos;s talk
          </a>
          <NavbarToggle />
        </NavbarActions>
      </MainBar>

      {/* Mobile drawer */}
      <NavbarDrawer className="bg-background border-t border-border">
        <nav className="flex flex-col gap-0.5 p-3">
          {links.map((l) => (
            <NavbarMobileItem key={l.value} href={l.href}>
              {l.label}
            </NavbarMobileItem>
          ))}
        </nav>
        <div className="px-3 pb-4 flex flex-col gap-2">
          <a
            href="#contact"
            className="text-center py-2.5 rounded-lg text-sm font-semibold bg-foreground text-background"
          >
            Let&apos;s talk
          </a>
          <div className="text-center text-xs text-muted-foreground">
            📍 Mumbai &nbsp;·&nbsp; +91 99999 99999
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
