"use client";

/**
 * Fun Navbar
 *
 * Bold colors, playful font weight, chunky rounded pill links.
 * Active item gets a background fill instead of an underline.
 * Mobile drawer has an offset-shadow card feel.
 *
 * Good for: consumer apps, kids/education products,
 *           creative tools, side projects.
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
} from "./base/navbase";

const links = [
  { value: "play", label: "🎮 Play", href: "#play" },
  { value: "explore", label: "🗺️ Explore", href: "#explore" },
  { value: "create", label: "✏️ Create", href: "#create" },
  { value: "community", label: "🤝 Community", href: "#community" },
];

export function FunNavbar() {
  return (
    <Navbar trackScroll={false} fixed>
      <NavbarBar className="mx-auto max-w-5xl h-16 px-4 bg-background">
        {/* Brand — big, expressive wordmark */}
        <NavbarBrand>
          <span
            className="text-2xl font-black tracking-tighter"
            style={{ fontVariationSettings: "'wght' 900" }}
          >
            <span className="text-pink-500">z</span>
            <span className="text-violet-500">a</span>
            <span className="text-sky-500">p</span>
          </span>
        </NavbarBrand>

        {/* Desktop links — pill style, no underline indicator */}
        <NavbarNav className="gap-2">
          {links.map((l) => (
            <NavbarItem
              key={l.value}
              value={l.value}
              href={l.href}
              indicator={false}
              className="rounded-full px-4 py-1.5 text-sm font-semibold
                         data-active:bg-foreground data-active:text-background
                         hover:bg-accent"
            >
              {l.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Actions */}
        <NavbarActions>
          <a
            href="#signup"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold
                       bg-linear-to-r from-pink-500 to-violet-500 text-white
                       hover:opacity-90 transition-opacity"
          >
            Join free ✨
          </a>
          <NavbarToggle className="rounded-full border-2 border-border" />
        </NavbarActions>
      </NavbarBar>

      {/* Mobile drawer — card feel */}
      <NavbarDrawer>
        <div className="mx-4 mb-3 rounded-2xl border-2 border-border bg-background p-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavbarMobileItem
              key={l.value}
              href={l.href}
              className="rounded-xl text-base font-semibold hover:bg-accent"
            >
              {l.label}
            </NavbarMobileItem>
          ))}
          <div className="mt-2 pt-2 border-t border-border">
            <a
              href="#signup"
              className="block text-center py-2.5 rounded-xl text-sm font-bold
                         bg-linear-to-r from-pink-500 to-violet-500 text-white"
            >
              Join free ✨
            </a>
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
