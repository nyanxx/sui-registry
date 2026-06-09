"use client";

/**
 * Portfolio Navbar
 *
 * Sidebar-inspired top bar. Name/initials on the left, section anchors
 * in the center, availability status + resume CTA on the right.
 * Hairline border fades in on scroll. Very low profile — content is king.
 *
 * Good for: dev portfolios, design portfolios, freelancers.
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
  { value: "work", label: "Work", href: "#work" },
  { value: "about", label: "About", href: "#about" },
  { value: "writing", label: "Writing", href: "#writing" },
];

function Bar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-2xl h-14 px-6 bg-background transition-all duration-300",
        scrolled && "border-b border-border/50",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function PortfolioNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={32}>
      <Bar>
        {/* Brand — initials avatar */}
        <NavbarBrand>
          <div
            className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-bold"
          >
            AK
          </div>
          <span className="text-sm font-medium text-foreground">
            Arjun Kulkarni
          </span>
        </NavbarBrand>

        {/* Desktop links */}
        <NavbarNav className="gap-0">
          {links.map((l) => (
            <NavbarItem
              key={l.value}
              value={l.value}
              href={l.href}
              indicator={false}
              className="text-sm hover:bg-transparent"
            >
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Availability badge + resume */}
        <NavbarActions>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to work
          </span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium
                       border border-border hover:bg-accent transition-colors"
          >
            Résumé ↗
          </a>
          <NavbarToggle />
        </NavbarActions>
      </Bar>

      {/* Mobile drawer */}
      <NavbarDrawer className="bg-background border-t border-border/50">
        <nav className="flex flex-col gap-0.5 px-4 pt-3">
          {links.map((l) => (
            <NavbarMobileItem key={l.value} href={l.href}>
              {l.label}
            </NavbarMobileItem>
          ))}
        </nav>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to work
          </span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-accent transition-colors"
          >
            Résumé ↗
          </a>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
