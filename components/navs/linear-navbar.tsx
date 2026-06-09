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
    value: "customers",
    label: "Customers",
    href: "#customers",
  },
  {
    value: "resources",
    label: "Resources",
    href: "#resources",
  },
  {
    value: "pricing",
    label: "Pricing",
    href: "#pricing",
  },
];

function LinearBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <div className="px-4 pt-4">
      <NavbarBar
        className={cn(
          "mx-auto max-w-6xl",
          "h-14 px-5",

          "rounded-2xl",

          "transition-all duration-500 ease-out",

          scrolled
            ? [
                "bg-background/75",
                "backdrop-blur-2xl",
                "border border-white/10",
                "shadow-2xl",
              ]
            : ["bg-background/40", "backdrop-blur-xl", "border border-white/5"],
        )}
      >
        {children}
      </NavbarBar>
    </div>
  );
}

function LinearLogo() {
  const { scrolled } = useNavbar();

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3",
        "transition-all duration-300",
        scrolled && "scale-[0.98]",
      )}
    >
      <div
        className="
          relative
          h-7
          w-7
          rounded-lg
          border
          border-white/10
          bg-white/3
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-lg
            bg-violet-500/20
            blur-md
          "
        />

        <span className="relative text-xs font-bold">L</span>
      </div>

      <span
        className="
          text-sm
          font-medium
          tracking-tight
        "
      >
        Linear AI
      </span>
    </Link>
  );
}

export function LinearNavbar() {
  return (
    <Navbar fixed trackScroll scrollThreshold={16}>
      <LinearBar>
        {/* Brand */}
        <NavbarBrand>
          <LinearLogo />
        </NavbarBrand>

        {/* Desktop Navigation */}
        <NavbarNav className="gap-0.5">
          {links.map((link) => (
            <NavbarItem
              key={link.value}
              value={link.value}
              href={link.href}
              indicator={false}
              className="
                rounded-lg

                px-3
                py-2

                text-sm

                text-muted-foreground
                hover:text-foreground

                hover:bg-white/4

                transition-all
              "
            >
              {link.label}
            </NavbarItem>
          ))}
        </NavbarNav>

        {/* Actions */}
        <NavbarActions>
          <a
            href="#login"
            className="
              hidden
              sm:inline-flex

              items-center

              px-3
              py-2

              text-sm

              text-muted-foreground
              hover:text-foreground

              transition-colors
            "
          >
            Log in
          </a>

          <a
            href="#signup"
            className="
              relative

              inline-flex
              items-center
              justify-center

              rounded-xl

              px-4
              py-2

              text-sm
              font-medium

              text-white

              bg-linear-to-r
              from-violet-500
              via-fuchsia-500
              to-cyan-500

              shadow-lg
              shadow-violet-500/20

              hover:scale-[1.02]

              transition-all
            "
          >
            Start Building
          </a>

          <NavbarToggle />
        </NavbarActions>
      </LinearBar>

      {/* Mobile Drawer */}
      <NavbarDrawer>
        <div
          className="
            mx-4
            mt-3

            overflow-hidden

            rounded-3xl

            border
            border-white/10

            bg-background/85
            backdrop-blur-3xl

            shadow-2xl
          "
        >
          <div className="p-4">
            <div
              className="
                mb-3

                rounded-xl

                border
                border-white/10

                bg-white/3

                px-4
                py-3

                text-sm
                text-muted-foreground
              "
            >
              Search...
            </div>

            <nav className="flex flex-col gap-1">
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
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="grid gap-2">
              <a
                href="#login"
                className="
                  flex
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-white/10

                  px-4
                  py-2.5

                  text-sm
                  font-medium

                  hover:bg-white/3

                  transition-colors
                "
              >
                Log in
              </a>

              <a
                href="#signup"
                className="
                  flex
                  items-center
                  justify-center

                  rounded-xl

                  bg-linear-to-r
                  from-violet-500
                  via-fuchsia-500
                  to-cyan-500

                  px-4
                  py-2.5

                  text-sm
                  font-medium

                  text-white
                "
              >
                Start Building
              </a>
            </div>
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
