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

function FloatingDockBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <div className="px-4 pt-4">
      <NavbarBar
        className={cn(
          "mx-auto",
          "max-w-5xl",
          "h-14",
          "px-5",

          "rounded-2xl",

          "border border-border/50",

          "bg-background/70",
          "supports-backdrop-filter:bg-background/60",
          "backdrop-blur-xl",

          "transition-all duration-500 ease-out",

          scrolled ? "shadow-2xl translate-y-0" : "shadow-lg",
        )}
      >
        {children}
      </NavbarBar>
    </div>
  );
}

export function DockNavbarB() {
  return (
    <Navbar
      fixed
      trackScroll
      scrollThreshold={20}
      className="pointer-events-none"
    >
      <div className="pointer-events-auto">
        <FloatingDockBar>
          {/* Brand */}
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl

                  bg-linear-to-br
                  from-violet-500
                  via-fuchsia-500
                  to-cyan-500

                  text-sm
                  font-bold
                  text-white
                "
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

                bg-linear-to-r
                from-violet-500
                to-cyan-500

                px-4
                py-2

                text-sm
                font-medium
                text-white

                shadow-lg

                hover:scale-[1.02]
                transition-all
              "
            >
              Get Started
            </a>

            <NavbarToggle />
          </NavbarActions>
        </FloatingDockBar>

        {/* Mobile Drawer */}
        <NavbarDrawer>
          <div
            className="
              mx-4
              mt-3
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

                    bg-linear-to-r
                    from-violet-500
                    to-cyan-500

                    px-4
                    py-2.5

                    text-sm
                    font-medium
                    text-white
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
