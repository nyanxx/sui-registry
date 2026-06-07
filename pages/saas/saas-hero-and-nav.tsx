// "use client";
import { BgPattern } from "@/components/pets/bg-pattern";
import { Glow } from "@/components/pets/glow";
import { HeroBadge } from "@/components/pets/hero-badge";
import {
  Nav,
  NavActions,
  NavBrand,
  NavContainer,
  NavCta,
  NavDesktop,
  NavLink,
  NavMobileMenu,
  NavMobileToggle,
} from "@/components/pets/nav";
import {
  Stats,
  StatsItem,
  StatsLabel,
  StatsValue,
} from "@/components/pets/stats";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type HeroContentProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute  inset-0 overflow-hidden">
      <Glow
        color="custom"
        size={"sm"}
        intensity={"strong"}
        className="bg-[#7c3aed] left-[-10%] top-[-10%]"
      />
      <Glow
        color="custom"
        size={"sm"}
        intensity={"strong"}
        className="bg-[#06b6d4] bottom-[-10%] right-[-10%]"
      />
      <BgPattern pattern="grid" opacity="strong" spacing="lg" />
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

function HeroContent({
  title = "Build products that feel impossibly fast.",
  description = "Launch, scale, and iterate with a modern platform designed for teams that care about performance, reliability, and great user experiences.",
  primaryLabel = "Get Started",
  secondaryLabel = "View Demo",
  primaryHref = "#",
  secondaryHref = "#",
}: HeroContentProps) {
  const originalItems = [
    { value: "99.99%", label: "Uptime" },
    { value: "4x", label: "Faster Launches" },
    { value: "120k+", label: "Users Served" },
  ];
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <HeroBadge className="p-8 mb-4" variant={"blue"}>
        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide">
          New
        </span>
        <span className="text-muted-foreground">
          Faster deployments with zero downtime
        </span>
        <ArrowRight className="h-3.5 w-3.5 opacity-70" />
      </HeroBadge>

      <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        {description}
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href={primaryHref}
          aria-label={primaryLabel}
          className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          {primaryLabel}
        </Link>

        <Link
          href={secondaryHref}
          aria-label={secondaryLabel}
          className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30"
        >
          {secondaryLabel}
        </Link>
      </div>

      <div className="mt-10 max-w-2xl w-full">
        <Stats cols={3}>
          {originalItems.map((item) => (
            <StatsItem key={item.label} variant="blur">
              <StatsValue className="text-xl">{item.value}</StatsValue>
              <StatsLabel>{item.label}</StatsLabel>
            </StatsItem>
          ))}
        </Stats>
      </div>
    </div>
  );
}

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <HeroBackground />
      <Nav variant="transparent">
        <NavContainer>
          <NavBrand>Aurora</NavBrand>

          <NavDesktop>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/about">About</NavLink>

            <NavActions>
              <NavCta variant="ghost">Login</NavCta>
              <NavCta variant="primary">Start Free</NavCta>
            </NavActions>
          </NavDesktop>

          <NavMobileToggle />
        </NavContainer>

        <NavMobileMenu>
          <NavLink placement="mobile" href="/features">
            Features
          </NavLink>
          <NavLink placement="mobile" href="/pricing">
            Pricing
          </NavLink>
          <NavLink placement="mobile" href="/about">
            About
          </NavLink>

          <NavActions className="mt-2">
            <NavCta variant="ghost">Login</NavCta>
            <NavCta variant="primary">Start Free</NavCta>
          </NavActions>
        </NavMobileMenu>
      </Nav>
      <section className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
        <div className="w-full">
          <HeroContent />
        </div>
      </section>
    </main>
  );
}
