"use client";

/**
 * Futuristic Navbar
 *
 * Dark-first. Glowing accent border. Monospace / technical font feel.
 * Logo has a subtle animated pulse ring. Active link uses a neon glow.
 * On scroll: a scanline / gradient border animation activates.
 *
 * Good for: AI products, crypto/web3, gaming, sci-fi themed sites,
 *           developer tools with a dark aesthetic.
 *
 * NOTE: This component is designed for a dark background (dark mode or
 *       a page with bg-black / bg-zinc-950). Flip --foreground /
 *       --background CSS vars accordingly.
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
  { value: "network", label: "Network", href: "#network" },
  { value: "protocol", label: "Protocol", href: "#protocol" },
  { value: "nodes", label: "Nodes", href: "#nodes" },
  { value: "terminal", label: "Terminal", href: "#terminal" },
];

function Bar({ children }: { children: React.ReactNode }) {
  const { scrolled } = useNavbar();

  return (
    <NavbarBar
      className={cn(
        "mx-auto max-w-6xl h-14 px-6 transition-all duration-500",
        // Base: dark bg, no border
        "bg-zinc-950",
        // Scrolled: glow border via box-shadow trick
        scrolled
          ? [
              "border-b border-cyan-500/30",
              "shadow-[0_1px_0_0_rgba(6,182,212,0.15),0_0_24px_0_rgba(6,182,212,0.08)]",
            ]
          : "border-b border-transparent",
      )}
    >
      {children}
    </NavbarBar>
  );
}

export function FuturisticNavbar() {
  return (
    // Force dark context on this navbar regardless of system theme
    <div className="dark">
      <Navbar trackScroll scrollThreshold={20} className="bg-zinc-950">
        <Bar>
          {/* Brand — monospace name + pulse ring */}
          <NavbarBrand>
            <div className="relative flex items-center justify-center h-7 w-7">
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border border-cyan-500/50 animate-ping opacity-40" />
              <span className="absolute inset-0 rounded-full border border-cyan-500/30" />
              <div className="h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center z-10">
                <span className="text-[8px] font-bold text-zinc-950">NX</span>
              </div>
            </div>
            <span
              className="text-sm font-mono font-bold tracking-widest text-zinc-100 uppercase"
            >
              Nexus
            </span>
            <span className="text-[9px] font-mono text-cyan-500/70 tracking-widest hidden sm:block">
              v2.4.1
            </span>
          </NavbarBrand>

          {/* Desktop links */}
          <NavbarNav>
            {links.map((l) => (
              <NavbarItem
                key={l.value}
                value={l.value}
                href={l.href}
                indicator={false}
                className={cn(
                  "font-mono text-xs tracking-widest uppercase",
                  "text-zinc-400 hover:text-cyan-400",
                  "hover:bg-cyan-500/5",
                  // Active glow via CSS custom property trick
                  "data-[active=true]:text-cyan-400",
                  "data-[active=true]:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]",
                )}
              >
                {l.label}
              </NavbarItem>
            ))}
          </NavbarNav>

          {/* Actions */}
          <NavbarActions>
            {/* Status indicator */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 pr-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              ONLINE
            </span>

            <a
              href="#connect"
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest",
                "rounded border border-cyan-500/50 text-cyan-400",
                "hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)]",
                "transition-all duration-200",
              )}
            >
              Connect
            </a>
            <NavbarToggle className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border-zinc-700" />
          </NavbarActions>
        </Bar>

        {/* Mobile drawer — dark card */}
        <NavbarDrawer>
          <div className="mx-4 mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 flex flex-col gap-1">
            {/* System status line */}
            <div className="px-3 py-2 mb-1 flex items-center gap-2 border-b border-zinc-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest">
                ALL SYSTEMS NOMINAL
              </span>
            </div>

            {links.map((l) => (
              <NavbarMobileItem
                key={l.value}
                href={l.href}
                className="font-mono text-xs tracking-widest uppercase text-zinc-400
                           hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg"
              >
                {l.label}
              </NavbarMobileItem>
            ))}

            <a
              href="#connect"
              className="mt-2 text-center py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-widest
                         border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              Connect
            </a>
          </div>
        </NavbarDrawer>
      </Navbar>
    </div>
  );
}
