"use client";

import { GlowOrb } from "@/components/pets/glow-orb";
import { HeroBadge } from "@/components/pets/hero-badge";
import {
  InstantStats,
  InstantStatsItem,
} from "@/components/pets/instant-stats";
import { StarField } from "@/components/pets/star-field-js";
import { Play } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavBadgeProps {
  brand?: string;
}

function NavBadge({ brand = "Aurum" }: NavBadgeProps) {
  return (
    <Link
      href="/"
      aria-label={`${brand} homepage`}
      className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
    >
      {/* Mark */}
      <span className="flex h-7 w-7 items-center justify-center rounded border border-amber-400/60 bg-amber-400/10 text-amber-400 transition group-hover:bg-amber-400/20">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 1L13 13H1L7 1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-(--font-display) text-lg tracking-tight text-white">
        {brand}
      </span>
    </Link>
  );
}

interface NavLinksProps {
  links?: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Company", href: "#company" },
];

function NavLinks({ links = DEFAULT_LINKS }: NavLinksProps) {
  return (
    <nav aria-label="Primary navigation">
      <ul className="hidden md:flex items-center gap-7">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface HeroNavProps {
  brand?: string;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

function HeroNav({ brand, links, ctaLabel, ctaHref }: HeroNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const effectiveLinks = links ?? DEFAULT_LINKS;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-zinc-950/80 backdrop-blur-md"
          : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavBadge brand={brand} />
        <NavLinks links={effectiveLinks} />
        <Link
          href={"#waitlist"}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-400/25 hover:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {"Get early access"}
          <span aria-hidden="true">→</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex md:hidden flex-col gap-1.5 p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          <span
            className={`block h-px w-5 bg-white transition-transform ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-white transition-transform ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-md px-6 pb-6 pt-4"
        >
          <ul className="flex flex-col gap-4">
            {effectiveLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-base text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={ctaHref ?? "#waitlist"}
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300"
              >
                {ctaLabel ?? "Get early access"} →
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function HeroCTAGroup() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="#waitlist"
        className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-zinc-950"
        style={{ backgroundColor: "#f5c842" }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-100"
          style={{ backgroundColor: "#f5c842" }}
        />

        <span className="relative z-10">Request access</span>
        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>

      <Link
        href={"#demo"}
        className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full  border-zinc-700 border-2 transition group-hover:border-zinc-500">
          <Play className="w-3 transition fill-current  " />
        </span>
        {"Watch 90s demo"}
      </Link>
    </div>
  );
}

interface HeroSectionProps {
  brand?: string;
  navLinks?: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
  eyebrow?: string;
  headlineLineOne?: string;
  headlineLineTwo?: string;
  headlineAccent?: string;
  accentColor?: string;
  subcopy?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function HeroSection({
  brand = "Aurum",
  navLinks = DEFAULT_LINKS,
  navCtaLabel = "Get early access",
  navCtaHref = "#waitlist",
  accentColor = "#f5c842",
}: HeroSectionProps) {
  return (
    <>
      {/* Keyframe animations that Tailwind cannot express inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;600;700;900&display=swap');
        :root { --font-display: 'DM Serif Display', serif; }
        body { font-family: 'DM Sans', sans-serif; }


        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-1 { animation: hero-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.15s both; }
        .animate-hero-2 { animation: hero-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.30s both; }
        .animate-hero-3 { animation: hero-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.45s both; }
        .animate-hero-4 { animation: hero-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.60s both; }
        .animate-hero-5 { animation: hero-fade-up 0.7s cubic-bezier(.22,1,.36,1) 0.75s both; }


        @keyframes grid-drift {
          0%   { transform: translateY(0); }
          100% { transform: translateY(48px); }
        }
        .animate-grid { animation: grid-drift 18s linear infinite alternate; }
      `}</style>

      <HeroNav
        brand={brand}
        links={navLinks}
        ctaLabel={navCtaLabel}
        ctaHref={navCtaHref}
      />

      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden bg-zinc-950"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Ambient background glows */}
        <GlowOrb className="h-150 w-150 -left-32 top-10 bg-amber-500/10" />
        <GlowOrb className="h-125 w-125 right-0 top-1/3 bg-indigo-600/8" />
        <GlowOrb className="h-75 w-75 left-1/2 bottom-0 bg-amber-400/6" />

        {/* Animated star particles (star-field-css) */}
        {/* <StarField color={accentColor} /> */}
        {/* if you want to use star-field-js */}
        <StarField size={"fine"} density={"normal"} speed={"fast"} />

        {/* Perspective grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.045]"
        >
          {/* grid animation */}
          <div
            className="animate-grid absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f5c842 1px, transparent 1px),
                linear-gradient(to bottom, #f5c842 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center min-h-screen px-6 pt-28 pb-20 lg:pt-36">
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
            {/* Left: copy stack */}
            <div className="flex flex-col gap-8">
              <div className="animate-hero-1">
                <HeroBadge variant={"retro"}>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"
                  />
                  <span className="text-xs font-medium tracking-widest text-amber-300 uppercase">
                    Now in public beta
                  </span>
                </HeroBadge>
              </div>

              <div className="animate-hero-2">
                <h1 className="text-[clamp(2.6rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter text-white">
                  <span className="block">{"The intelligence"}</span>
                  <span className="block">{"layer for modern"}</span>
                  <span
                    className="block italic"
                    style={{
                      color: "#f5c842",
                      textShadow: `0 0 48px ${"#f5c842"}66`,
                    }}
                  >
                    {"finance."}
                  </span>
                </h1>
              </div>

              <div className="animate-hero-3">
                <p className="max-w-md text-base leading-relaxed text-zinc-400">
                  {
                    "Aurum synthesises real-time market signals, regulatory filings, and portfolio data into decisions your team can trust — before the market moves."
                  }
                </p>
              </div>

              <div className="animate-hero-4">
                <HeroCTAGroup />
              </div>

              <InstantStats
                layout="row"
                className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8"
              >
                <InstantStatsItem value="$4.2T" label="Assets monitored" />
                <InstantStatsItem value="0.3ms" label="Signal latency" />
                <InstantStatsItem value="340" label="Data sources" />
              </InstantStats>
              {/* <div className="animate-hero-5 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
                <Reveal stagger={500}>
                  <RevealItem index={1}>
                    <Stats cols={3} className="flex flex-col">
                      {[
                        { value: "$4.2T", label: "Assets monitored" },
                        { value: "0.3ms", label: "Signal latency" },
                        { value: "340+", label: "Data sources" },
                        //
                      ].map((s) => (
                        <StatsItem
                          variant="transparent"
                          align={"left"}
                          key={s.value}
                        >
                          <StatsValue className="text-xl font-black tracking-tighter text-white">
                            {s.value}
                          </StatsValue>
                          <StatsLabel className="text-xs text-zinc-500 uppercase tracking-widest">
                            {s.label}
                          </StatsLabel>
                        </StatsItem>
                      ))}
                    </Stats>
                  </RevealItem>
                </Reveal>
              </div> */}
            </div>

            {/* Right: decorative terminal card */}
            <aside
              aria-label="Live signal preview"
              className="hidden lg:flex flex-col gap-0 w-80 rounded-xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60"
            >
              {/* Terminal title bar */}
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3 bg-white/4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 text-[10px] text-zinc-500 tracking-widest uppercase">
                  aurum · live signals
                </span>
              </div>

              {/* Signal rows */}
              <div className="flex flex-col divide-y divide-white/5 px-4 py-2">
                {[
                  {
                    ticker: "BTC",
                    change: "+2.41%",
                    label: "Bullish momentum cross",
                    up: true,
                  },
                  {
                    ticker: "SPX",
                    change: "-0.18%",
                    label: "Volatility compression",
                    up: false,
                  },
                  {
                    ticker: "XAU",
                    change: "+0.93%",
                    label: "Safe-haven inflow",
                    up: true,
                  },
                  {
                    ticker: "DXY",
                    change: "-0.34%",
                    label: "Dollar softness signal",
                    up: false,
                  },
                  {
                    ticker: "OIL",
                    change: "+1.07%",
                    label: "Supply shock detected",
                    up: true,
                  },
                ].map((row) => (
                  <div
                    key={row.ticker}
                    className="flex items-center justify-between py-2.5"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">
                        {row.ticker}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {row.label}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold tabular-nums ${
                        row.up ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {row.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-3 text-[10px] text-zinc-600 border-t border-white/5"
                style={{
                  background: `linear-gradient(to right, ${accentColor}06, transparent)`,
                }}
              >
                Updated 312ms ago · 340 sources active
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
