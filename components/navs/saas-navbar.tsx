"use client";

/**
 * SaaS Navbar
 *
 * Floating pill that appears from the top on scroll.
 * Before scroll: flat transparent bar.
 * After scroll: compact frosted pill with shadow — classic "dock" pattern.
 * Has a "badge" on the brand for version/status.
 *
 * Good for: SaaS products, developer tools, API platforms.
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
  { value: "features", label: "Features", href: "#features" },
  { value: "pricing", label: "Pricing", href: "#pricing" },
  { value: "changelog", label: "Changelog", href: "#changelog" },
  { value: "docs", label: "Docs", href: "#docs" },
];

function Bar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto transition-all duration-300 ease-in-out px-5",
        scrolled
          ? // Floating pill mode
            "max-w-3xl h-12 rounded-2xl border border-border bg-background/90 backdrop-blur-lg shadow-lg shadow-black/5 mt-3"
          : // Full-width transparent mode
            "max-w-6xl h-16 rounded-none border-transparent bg-transparent",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function SaaSNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={60} className="px-4">
      <Bar>
        {/* Brand + beta badge */}
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L9.5 5.5H4.5L7 1Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path d="M2 9.5H12L7 13L2 9.5Z" fill="white" />
                <path d="M4.5 5.5H9.5V9.5H4.5V5.5Z" fill="white" fillOpacity="0.5" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Prism</span>
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-violet-500/10 text-violet-600 border border-violet-500/20">
              Beta
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

        {/* Actions */}
        <NavbarActions>
          <a
            href="#login"
            className="hidden sm:inline-flex px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium
                       bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            Start free
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <NavbarToggle />
        </NavbarActions>
      </Bar>

      {/* Mobile drawer */}
      <NavbarDrawer>
        <div className="mx-4 mb-3 rounded-2xl border border-border bg-background/95 backdrop-blur p-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavbarMobileItem key={l.value} href={l.href}>
              {l.label}
            </NavbarMobileItem>
          ))}
          <div className="mt-2 pt-2 border-t border-border flex flex-col gap-2">
            <a
              href="#login"
              className="text-center py-2 rounded-xl text-sm border border-border hover:bg-accent transition-colors"
            >
              Log in
            </a>
            <a
              href="#signup"
              className="text-center py-2 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
            >
              Start free →
            </a>
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
