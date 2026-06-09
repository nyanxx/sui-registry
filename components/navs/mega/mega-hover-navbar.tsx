"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

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

/* -------------------------------------------------------------------------- */
/* Data */
/* -------------------------------------------------------------------------- */

const products = [
  {
    title: "Analytics",
    description: "Understand usage and growth.",
    href: "#",
  },
  {
    title: "Workflows",
    description: "Automate repetitive work.",
    href: "#",
  },
  {
    title: "Integrations",
    description: "Connect your entire stack.",
    href: "#",
  },
  {
    title: "API",
    description: "Build custom experiences.",
    href: "#",
  },
  {
    title: "Observability",
    description: "Monitor critical systems.",
    href: "#",
  },
  {
    title: "AI Agents",
    description: "Deploy intelligent automation.",
    href: "#",
  },
];

const solutions = [
  {
    title: "Startups",
    description: "Move quickly with less overhead.",
    href: "#",
  },
  {
    title: "Growth",
    description: "Scale teams and processes.",
    href: "#",
  },
  {
    title: "Enterprise",
    description: "Security and compliance.",
    href: "#",
  },
  {
    title: "Agencies",
    description: "Manage client operations.",
    href: "#",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Everything you need to build.",
    href: "#",
  },
  {
    title: "Guides",
    description: "Best practices and tutorials.",
    href: "#",
  },
  {
    title: "Blog",
    description: "Product updates and stories.",
    href: "#",
  },
  {
    title: "Changelog",
    description: "See what's new.",
    href: "#",
  },
];

/* -------------------------------------------------------------------------- */
/* Desktop Mega Menu Trigger */
/* -------------------------------------------------------------------------- */

function MegaMenuTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { active, setActive } = useNavbar();

  const open = active === value;

  return (
    <button
      type="button"
      onMouseEnter={() => setActive(value)}
      className={cn(
        "flex items-center gap-1",
        "rounded-md px-3 py-2",
        "text-sm font-medium",
        "transition-colors",
        open
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      {children}

      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel Wrapper */
/* -------------------------------------------------------------------------- */

function MegaMenuPanel({
  value,
  width = "w-[720px]",
  children,
}: {
  value: string;
  width?: string;
  children: React.ReactNode;
}) {
  const { active, setActive } = useNavbar();

  const open = active === value;

  return (
    <div
      onMouseEnter={() => setActive(value)}
      onMouseLeave={() => setActive(null)}
      className={cn(
        "absolute left-1/2 top-full z-50 mt-4",
        "-translate-x-1/2",
        "transition-all duration-200",
        open
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-2 opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          width,
          "rounded-3xl",
          "border border-border/50",
          "bg-background/95",
          "backdrop-blur-xl",
          "shadow-2xl",
          "overflow-hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Products */
/* -------------------------------------------------------------------------- */

function ProductsMenu() {
  return (
    <MegaMenuPanel value="products">
      <div className="p-6">
        <div className="mb-5">
          <h3 className="font-semibold">Products</h3>
          <p className="text-sm text-muted-foreground">Explore the platform.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="
                rounded-2xl
                p-4
                transition-colors
                hover:bg-accent
              "
            >
              <div className="font-medium">{item.title}</div>

              <div className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </div>
            </a>
          ))}
        </div>
      </div>
    </MegaMenuPanel>
  );
}

/* -------------------------------------------------------------------------- */
/* Solutions */
/* -------------------------------------------------------------------------- */

function SolutionsMenu() {
  return (
    <MegaMenuPanel value="solutions" width="w-[640px]">
      <div className="grid grid-cols-2 gap-2 p-6">
        {solutions.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="
              rounded-2xl
              p-4
              transition-colors
              hover:bg-accent
            "
          >
            <div className="font-medium">{item.title}</div>

            <div className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </div>
          </a>
        ))}
      </div>
    </MegaMenuPanel>
  );
}

/* -------------------------------------------------------------------------- */
/* Resources */
/* -------------------------------------------------------------------------- */

function ResourcesMenu() {
  return (
    <MegaMenuPanel value="resources" width="w-[560px]">
      <div className="p-6">
        <div className="space-y-2">
          {resources.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="
                flex
                items-center
                justify-between

                rounded-xl
                p-4

                transition-colors
                hover:bg-accent
              "
            >
              <div>
                <div className="font-medium">{item.title}</div>

                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </MegaMenuPanel>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile Accordion */
/* -------------------------------------------------------------------------- */

function MobileSection({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between

          py-3
          text-left
          text-sm
          font-medium
        "
      >
        {title}

        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-64 pb-3" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <NavbarMobileItem
              key={item.title}
              href={item.href}
              className="pl-4"
            >
              {item.title}
            </NavbarMobileItem>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Navbar */
/* -------------------------------------------------------------------------- */

export function StripeNavbarHover() {
  const [menuActive, setMenuActive] = React.useState<string | null>(null);

  return (
    <Navbar fixed trackScroll scrollThreshold={20}>
      {/* Wrap navbar content so hover state can persist */}
      <div className="relative" onMouseLeave={() => setMenuActive(null)}>
        <NavbarBar
          className="
            mx-auto
            max-w-7xl
            h-16
            px-6

            border-b
            border-border/50

            bg-background/80
            backdrop-blur-xl
          "
        >
          {/* Brand */}
          <NavbarBrand>
            <Link href="/" className="font-semibold tracking-tight">
              Acme
            </Link>
          </NavbarBrand>

          {/* Desktop Nav */}
          <ul
            className="
              hidden
              md:flex
              items-center
              gap-1
            "
          >
            <li onMouseEnter={() => setMenuActive("products")}>
              <MegaMenuTrigger value="products">Products</MegaMenuTrigger>
            </li>

            <li onMouseEnter={() => setMenuActive("solutions")}>
              <MegaMenuTrigger value="solutions">Solutions</MegaMenuTrigger>
            </li>

            <li onMouseEnter={() => setMenuActive("resources")}>
              <MegaMenuTrigger value="resources">Resources</MegaMenuTrigger>
            </li>

            <li>
              <a
                href="#pricing"
                className="
                  rounded-md
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-muted-foreground
                  hover:text-foreground
                "
              >
                Pricing
              </a>
            </li>
          </ul>

          {/* Actions */}
          <NavbarActions>
            <a
              href="#signin"
              className="
                hidden
                sm:inline-flex

                px-4
                py-2

                text-sm

                text-muted-foreground
                hover:text-foreground
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
              "
            >
              Start free
            </a>

            <NavbarToggle />
          </NavbarActions>
        </NavbarBar>

        {/* Sync context active state */}
        <MegaMenuStateBridge active={menuActive} />

        <ProductsMenu />
        <SolutionsMenu />
        <ResourcesMenu />
      </div>

      {/* Mobile Drawer */}
      <NavbarDrawer className="bg-background border-t border-border">
        <div className="p-4">
          <MobileSection title="Products" items={products} />

          <MobileSection title="Solutions" items={solutions} />

          <MobileSection title="Resources" items={resources} />

          <div className="mt-2">
            <NavbarMobileItem href="#pricing">Pricing</NavbarMobileItem>
          </div>

          <div className="mt-4 grid gap-2">
            <a
              href="#signin"
              className="
                text-center
                py-2.5

                rounded-xl

                border
                border-border
              "
            >
              Sign in
            </a>

            <a
              href="#start"
              className="
                text-center
                py-2.5

                rounded-xl

                bg-foreground
                text-background
              "
            >
              Start free
            </a>
          </div>
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}

/* -------------------------------------------------------------------------- */
/* Bridge external state -> navbar context */
/* -------------------------------------------------------------------------- */

function MegaMenuStateBridge({ active }: { active: string | null }) {
  const { setActive } = useNavbar();

  React.useEffect(() => {
    setActive(active);
  }, [active, setActive]);

  return null;
}
