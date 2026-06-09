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
    title: "API",
    description: "Build custom experiences.",
    href: "#",
  },
  {
    title: "Workflows",
    description: "Automate operations.",
    href: "#",
  },
  {
    title: "AI Agents",
    description: "Deploy intelligent workflows.",
    href: "#",
  },
];

const solutions = [
  {
    title: "Startups",
    description: "Move fast.",
    href: "#",
  },
  {
    title: "Growth",
    description: "Scale efficiently.",
    href: "#",
  },
  {
    title: "Enterprise",
    description: "Security and governance.",
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
    description: "News and updates.",
    href: "#",
  },
];

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
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          py-3
        "
      >
        <span>{title}</span>

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
            <NavbarMobileItem key={item.title} href={item.href}>
              {item.title}
            </NavbarMobileItem>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hybrid Trigger */
/* -------------------------------------------------------------------------- */

function HybridTrigger({
  value,
  label,
  active,
  locked,
  setActive,
  setLocked,
}: {
  value: string;
  label: string;
  active: string | null;
  locked: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  setLocked: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const open = active === value;

  return (
    <button
      type="button"
      onMouseEnter={() => {
        if (!locked) {
          setActive(value);
        }
      }}
      onClick={() => {
        if (locked === value) {
          setLocked(null);
          setActive(null);
        } else {
          setLocked(value);
          setActive(value);
        }
      }}
      className={cn(
        "flex items-center gap-1",
        "rounded-md px-3 py-2",
        "text-sm font-medium transition-colors",

        open
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      {label}

      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Panel */
/* -------------------------------------------------------------------------- */

function Panel({
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
          w-170

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

/* -------------------------------------------------------------------------- */
/* Navbar */
/* -------------------------------------------------------------------------- */

export function StripeNavbarHybrid() {
  const [active, setActive] = React.useState<string | null>(null);

  const [locked, setLocked] = React.useState<string | null>(null);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setLocked(null);
        setActive(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar fixed trackScroll>
      <div
        ref={wrapperRef}
        className="relative"
        onMouseLeave={() => {
          if (!locked) {
            setActive(null);
          }
        }}
      >
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
              <HybridTrigger
                value="products"
                label="Products"
                active={active}
                locked={locked}
                setActive={setActive}
                setLocked={setLocked}
              />

              <Panel open={active === "products"}>
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
              </Panel>
            </li>

            <li className="relative">
              <HybridTrigger
                value="solutions"
                label="Solutions"
                active={active}
                locked={locked}
                setActive={setActive}
                setLocked={setLocked}
              />

              <Panel open={active === "solutions"}>
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
              </Panel>
            </li>

            <li className="relative">
              <HybridTrigger
                value="resources"
                label="Resources"
                active={active}
                locked={locked}
                setActive={setActive}
                setLocked={setLocked}
              />

              <Panel open={active === "resources"}>
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
              </Panel>
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
                hidden
                sm:inline-flex

                px-4 py-2
                text-sm
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
