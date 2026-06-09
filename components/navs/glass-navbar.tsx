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
    value: "product",
    label: "Product",
    href: "#product",
  },
  {
    value: "solutions",
    label: "Solutions",
    href: "#solutions",
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
];

function GlassBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto h-16 max-w-7xl px-6",
        "transition-all duration-500 ease-out",

        scrolled
          ? [
              "border-b border-border/50",
              "bg-background/70",
              "backdrop-blur-xl",
              "shadow-sm",
              "supports-backdrop-filter:bg-background/60",
            ]
          : ["bg-transparent"],
      )}
    >
      {children}
    </NavbarBar>
  );
}

function Logo() {
  const { scrolled } = useNavbar();

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 transition-all duration-300",
        scrolled && "scale-[0.97]",
      )}
    >
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

      <span className="font-semibold tracking-tight">Acme</span>
    </Link>
  );
}

export function PremiumGlassNavbar() {
  return (
    <Navbar fixed trackScroll scrollThreshold={24}>
      <GlassBar>
        {/* Brand */}
        <NavbarBrand>
          <Logo />
        </NavbarBrand>

        {/* Center Nav */}
        <NavbarNav
          className="
            absolute
            left-1/2
            -translate-x-1/2
            gap-1
          "
        >
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
            href="#start"
            className="
              inline-flex
              items-center

              rounded-full

              bg-foreground
              text-background

              px-4
              py-2

              text-sm
              font-medium

              hover:bg-foreground/90
              transition-colors
            "
          >
            Start Free
          </a>

          <NavbarToggle />
        </NavbarActions>
      </GlassBar>

      {/* Mobile Drawer */}
      <NavbarDrawer>
        <div
          className="
            border-t
            border-border/50

            bg-background/80
            backdrop-blur-2xl
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
                href="#start"
                className="
                  flex
                  items-center
                  justify-center

                  rounded-xl

                  bg-foreground
                  text-background

                  px-4
                  py-2.5

                  text-sm
                  font-medium
                "
              >
                Start Free
              </a>
            </div>
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
