"use client";
import { BackgroundNoise } from "@/components/pets/bg-noise";
// by mistral ai -- lechat
// starter-page.tsx

import { useState } from "react";

// --- HeroBackground ---
const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700" /> */}
    <BackgroundNoise />
  </div>
);

// --- MobileNavToggle ---
type MobileNavToggleProps = {
  onClick: () => void;
  isOpen: boolean;
};
const MobileNavToggle = ({ onClick, isOpen }: MobileNavToggleProps) => (
  <button
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
  >
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  </button>
);

// --- MobileNavMenu ---
type MobileNavMenuProps = {
  links: Array<{ label: string; href: string }>;
  isOpen: boolean;
};
const MobileNavMenu = ({ links, isOpen }: MobileNavMenuProps) => (
  <div
    className={`md:hidden absolute top-full left-0 right-0 bg-indigo-700/95 backdrop-blur-sm p-4 rounded-b-lg transition-all duration-300 ${
      isOpen ? "block" : "hidden"
    }`}
  >
    <nav className="flex flex-col space-y-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {link.label}
        </a>
      ))}
    </nav>
  </div>
);

// --- HeroNav ---
type HeroNavProps = {
  links?: Array<{ label: string; href: string }>;
};
const HeroNav = ({
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
}: HeroNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-20 w-full p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Logo</div>
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <MobileNavToggle onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        <MobileNavMenu links={links} isOpen={isOpen} />
      </nav>
    </header>
  );
};

// --- HeroSection (Default Export) ---
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      <HeroBackground />
      <HeroNav />
      <div className="flex-grow flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1
            className={`text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-200`}
          >
            {"Build the Future with Next.js"}
          </h1>
          <p className={`mt-4 text-xl md:text-2xl text-white/90 max-w-2xl`}>
            {
              "Create modern, scalable applications with the power of React and TypeScript."
            }
          </p>
          <a
            href={"#"}
            className={`inline-flex items-center justify-center px-6 py-3 mt-8 text-lg font-semibold text-indigo-700 bg-white rounded-lg shadow-lg hover:bg-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600`}
            aria-label={`Primary call to action: ${"Get Started"}`}
          >
            {"Get Started"}
          </a>
        </div>
      </div>
    </section>
  );
}
