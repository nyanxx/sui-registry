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
} from "@/components/navs/base/navbase";

import { cn } from "@/lib/utils";

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
    title: "API",
    description: "Build custom experiences.",
    href: "#",
  },
];

const solutions = [
  {
    title: "Startups",
    description: "Built for fast teams.",
    href: "#",
  },
  {
    title: "Growth",
    description: "Scale operations.",
    href: "#",
  },
  {
    title: "Enterprise",
    description: "Security and compliance.",
    href: "#",
  },
];

const resources = [
  {
    title: "Documentation",
    description: "Developer docs.",
    href: "#",
  },
  {
    title: "Guides",
    description: "Tutorials and examples.",
    href: "#",
  },
  {
    title: "Blog",
    description: "Updates and news.",
    href: "#",
  },
];

function DesktopTrigger({
  value,
  active,
  setActive,
  children,
}: {
  value: string;
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}) {
  const open = active === value;

  return (
    <button
      type="button"
      onClick={() => setActive(open ? null : value)}
      className={cn(
        "flex items-center gap-1",
        "rounded-md px-3 py-2",
        "text-sm font-medium transition-colors",
        open
          ? "text-foreground bg-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      {children}

      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

function MenuPanel({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full mt-3",
        "transition-all duration-200",
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none",
      )}
    >
      <div
        className="
          w-160

          rounded-3xl

          border border-border

          bg-background/95
          backdrop-blur-xl

          shadow-2xl

          p-5
        "
      >
        {children}
      </div>
    </div>
  );
}

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
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          py-3
        "
      >
        {title}

        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all",
          open ? "max-h-64 pb-3" : "max-h-0",
        )}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <NavbarMobileItem key={item.title} href={item.href}>
              {item.title}
            </NavbarMobileItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StripeNavbarClick() {
  const [active, setActive] = React.useState<string | null>(null);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setActive(null);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Navbar fixed trackScroll>
      <div ref={wrapperRef} className="relative">
        <NavbarBar
          className="
            mx-auto
            max-w-7xl
            h-16
            px-6

            border-b
            border-border

            bg-background/80
            backdrop-blur-xl
          "
        >
          <NavbarBrand>
            <span className="font-semibold">Acme</span>
          </NavbarBrand>

          <ul
            className="
              hidden
              md:flex
              items-center
              gap-2
            "
          >
            <li className="relative">
              <DesktopTrigger
                value="products"
                active={active}
                setActive={setActive}
              >
                Products
              </DesktopTrigger>

              <MenuPanel open={active === "products"}>
                <div className="grid gap-2">
                  {products.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="
                        rounded-xl
                        p-4
                        hover:bg-accent
                      "
                    >
                      <div className="font-medium">{item.title}</div>

                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </a>
                  ))}
                </div>
              </MenuPanel>
            </li>

            <li className="relative">
              <DesktopTrigger
                value="solutions"
                active={active}
                setActive={setActive}
              >
                Solutions
              </DesktopTrigger>

              <MenuPanel open={active === "solutions"}>
                <div className="grid gap-2">
                  {solutions.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="
                        rounded-xl
                        p-4
                        hover:bg-accent
                      "
                    >
                      <div className="font-medium">{item.title}</div>

                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </a>
                  ))}
                </div>
              </MenuPanel>
            </li>

            <li className="relative">
              <DesktopTrigger
                value="resources"
                active={active}
                setActive={setActive}
              >
                Resources
              </DesktopTrigger>

              <MenuPanel open={active === "resources"}>
                <div className="grid gap-2">
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

                        hover:bg-accent
                      "
                    >
                      <div>
                        <div className="font-medium">{item.title}</div>

                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </MenuPanel>
            </li>

            <li>
              <a
                href="#pricing"
                className="
                  px-3 py-2 text-sm
                  text-muted-foreground
                  hover:text-foreground
                "
              >
                Pricing
              </a>
            </li>
          </ul>

          <NavbarActions>
            <a
              href="#signin"
              className="
                hidden sm:inline-flex
                px-4 py-2 text-sm
              "
            >
              Sign in
            </a>

            <a
              href="#start"
              className="
                rounded-full

                bg-foreground
                text-background

                px-4 py-2
                text-sm
              "
            >
              Start free
            </a>

            <NavbarToggle />
          </NavbarActions>
        </NavbarBar>
      </div>

      <NavbarDrawer className="bg-background border-t border-border">
        <div className="p-4">
          <MobileSection title="Products" items={products} />

          <MobileSection title="Solutions" items={solutions} />

          <MobileSection title="Resources" items={resources} />
        </div>
      </NavbarDrawer>
    </Navbar>
  );
}
