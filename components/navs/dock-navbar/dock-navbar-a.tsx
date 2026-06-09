"use client";

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
import Link from "next/link";

const links = [
  {
    value: "features",
    label: "Features",
    href: "#features",
  },
  {
    value: "pricing",
    label: "Pricing",
    href: "#pricing",
  },
  {
    value: "docs",
    label: "Docs",
    href: "#docs",
  },
  {
    value: "blog",
    label: "Blog",
    href: "#blog",
  },
];

function DockBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        scrolled ? "px-4 pt-3" : "px-0 pt-0",
      )}
    >
      <NavbarBar
        className={cn(
          "mx-auto h-16 px-6 transition-all duration-500 ease-out",

          scrolled
            ? [
                "max-w-5xl",
                "rounded-2xl",
                "border border-border/60",
                "bg-background/75",
                "backdrop-blur-xl",
                "shadow-xl",
                "supports-backdrop-filter:bg-background/60",
              ]
            : ["max-w-7xl", "bg-transparent"],
        )}
      >
        {children}
      </NavbarBar>
    </div>
  );
}

export function DockNavbarA() {
  return (
    <Navbar
      scrollThreshold={40}
      trackScroll
      fixed
      className="pointer-events-none"
    >
      <div className="pointer-events-auto">
        <DockBar>
          {/* Brand */}
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl",
                  "bg-linear-to-br from-violet-500 via-fuchsia-500 to-cyan-500",
                  "text-white font-bold text-sm",
                )}
              >
                A
              </div>

              <span className="font-semibold tracking-tight">Acme AI</span>
            </Link>
          </NavbarBrand>

          {/* Desktop Nav */}
          <NavbarNav className="gap-1">
            {links.map((link) => (
              <NavbarItem
                key={link.value}
                value={link.value}
                href={link.href}
                className="
                  rounded-full
                  px-4
                  text-sm
                  font-medium
                "
              >
                {link.label}
              </NavbarItem>
            ))}
          </NavbarNav>

          {/* Actions */}
          <NavbarActions>
            <a
              href="#signin"
              className="
                hidden
                sm:inline-flex
                items-center
                px-4
                py-2
                text-sm
                text-muted-foreground
                hover:text-foreground
                transition-colors
              "
            >
              Sign in
            </a>

            <a
              href="#get-started"
              className="
                inline-flex
                items-center
                rounded-full
                bg-foreground
                px-4
                py-2
                text-sm
                font-medium
                text-background
                transition-all
                hover:scale-[1.02]
                hover:bg-foreground/90
              "
            >
              Get Started
            </a>

            <NavbarToggle />
          </NavbarActions>
        </DockBar>

        {/* Mobile Drawer */}
        <NavbarDrawer>
          <div
            className="
              mx-4
              mt-2
              mb-4
              overflow-hidden
              rounded-3xl
              border
              border-border/50
              bg-background/80
              backdrop-blur-2xl
              shadow-2xl
            "
          >
            <nav className="flex flex-col p-3">
              {links.map((link) => (
                <NavbarMobileItem
                  key={link.value}
                  href={link.href}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                  "
                >
                  {link.label}
                </NavbarMobileItem>
              ))}
            </nav>

            <div className="border-t border-border/50 p-3">
              <div className="grid gap-2">
                <a
                  href="#signin"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-border
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    hover:bg-accent
                    transition-colors
                  "
                >
                  Sign in
                </a>

                <a
                  href="#get-started"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-foreground
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-background
                    hover:bg-foreground/90
                    transition-colors
                  "
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </NavbarDrawer>
      </div>
    </Navbar>
  );
}
