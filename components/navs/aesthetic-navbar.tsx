"use client";

/**
 * Aesthetic Navbar
 *
 * Minimal, editorial, lots of whitespace. Thin font weights.
 * Logo is a wordmark in a serif or light sans. Links are spaced
 * generously with no background hovers — just color transitions.
 * On scroll: a hairline border appears, nothing more.
 *
 * Good for: fashion, beauty, editorial blogs, photography, studios.
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
  { value: "journal", label: "Journal", href: "#journal" },
  { value: "contact", label: "Contact", href: "#contact" },
];

function Bar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-6xl h-16 px-8 bg-background transition-all duration-500",
        scrolled ? "border-b border-border/60" : "border-b border-transparent",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function AestheticNavbar() {
  return (
    <Navbar trackScroll scrollThreshold={40}>
      <Bar>
        {/* Brand — delicate serif wordmark */}
        <NavbarBrand>
          <span
            className="text-lg font-light tracking-[0.2em] uppercase text-foreground"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Lumière
          </span>
        </NavbarBrand>

        {/* Desktop links — wide letter-spacing, no pill, no bg hover */}
        <NavbarNav className="gap-6">
          {links.map((l) => (
            <NavbarItem
              key={l.value}
              value={l.value}
              href={l.href}
              indicator={false}
              className="text-xs tracking-[0.15em] uppercase font-normal
                         text-muted-foreground hover:text-foreground
                         hover:bg-transparent px-0 py-1"
            >
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Actions */}
        <NavbarActions>
          <a
            href="#shop"
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground
                       hover:text-foreground transition-colors px-0"
          >
            Shop
          </a>
          <NavbarToggle className="border-0 text-muted-foreground hover:text-foreground hover:bg-transparent" />
        </NavbarActions>
      </Bar>

      {/* Mobile drawer — full bleed, centered links */}
      <NavbarDrawer className="bg-background border-t border-border/60">
        <nav className="flex flex-col items-center gap-1 py-6">
          {links.map((l) => (
            <NavbarMobileItem
              key={l.value}
              href={l.href}
              className="justify-center text-xs tracking-[0.2em] uppercase
                         hover:bg-transparent hover:text-foreground"
            >
              {l.label}
            </NavbarMobileItem>
          ))}
          <NavbarMobileItem
            href="#shop"
            className="justify-center text-xs tracking-[0.2em] uppercase
                       hover:bg-transparent hover:text-foreground mt-2"
          >
            Shop
          </NavbarMobileItem>
        </nav>
      </NavbarDrawer>
    </Navbar>
  );
}
