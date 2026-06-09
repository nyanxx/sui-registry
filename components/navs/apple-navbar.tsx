"use client";

import * as React from "react";

import {
  Navbar,
  NavbarBar,
  NavbarBrand,
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
    value: "store",
    label: "Store",
    href: "#",
  },
  {
    value: "mac",
    label: "Mac",
    href: "#",
  },
  {
    value: "ipad",
    label: "iPad",
    href: "#",
  },
  {
    value: "iphone",
    label: "iPhone",
    href: "#",
  },
  {
    value: "watch",
    label: "Watch",
    href: "#",
  },
  {
    value: "airpods",
    label: "AirPods",
    href: "#",
  },
  {
    value: "support",
    label: "Support",
    href: "#",
  },
];

function AppleBar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto",

        "h-12",

        "px-6",

        "transition-all duration-300",

        scrolled
          ? [
              "bg-background/70",
              "backdrop-blur-xl",
              "border-b border-border/50",
            ]
          : ["bg-background/20", "backdrop-blur-md"],
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function AppleNavbar() {
  return (
    <Navbar fixed trackScroll scrollThreshold={8}>
      <AppleBar>
        {/* Brand */}
        <NavbarBrand>
          <Link
            href="/"
            className="
              text-sm
              font-medium
              tracking-tight
            "
          >
            ◉
          </Link>
        </NavbarBrand>

        {/* Center Nav */}
        <ul
          className="
            hidden
            md:flex

            absolute
            left-1/2
            -translate-x-1/2

            items-center
            gap-1
          "
        >
          {links.map((link) => (
            <li key={link.value}>
              <a
                href={link.href}
                className="
                  rounded-md

                  px-3
                  py-1.5

                  text-xs

                  text-muted-foreground

                  transition-colors

                  hover:text-foreground
                "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <NavbarActions>
          <a
            href="#search"
            className="
              hidden
              md:inline-flex

              h-8
              w-8

              items-center
              justify-center

              rounded-full

              text-muted-foreground

              hover:bg-accent
              hover:text-foreground
            "
          >
            ⌕
          </a>

          <a
            href="#bag"
            className="
              hidden
              md:inline-flex

              h-8
              w-8

              items-center
              justify-center

              rounded-full

              text-muted-foreground

              hover:bg-accent
              hover:text-foreground
            "
          >
            ◌
          </a>

          <NavbarToggle />
        </NavbarActions>
      </AppleBar>

      {/* Mobile Drawer */}
      <NavbarDrawer
        className="
          bg-background/95
          backdrop-blur-xl

          border-t
          border-border/50
        "
      >
        <nav className="p-4">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavbarMobileItem
                key={link.value}
                href={link.href}
                className="
                  py-3

                  text-base
                  font-light

                  border-b
                  border-border/30
                "
              >
                {link.label}
              </NavbarMobileItem>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <a
              href="#search"
              className="
                flex-1

                rounded-xl

                border
                border-border

                py-2.5

                text-center
                text-sm
              "
            >
              Search
            </a>

            <a
              href="#bag"
              className="
                flex-1

                rounded-xl

                border
                border-border

                py-2.5

                text-center
                text-sm
              "
            >
              Bag
            </a>
          </div>
        </nav>
      </NavbarDrawer>
    </Navbar>
  );
}
