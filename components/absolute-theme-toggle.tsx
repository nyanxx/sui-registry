"use client";

/**
1. pnpm add next-themes
2. pnpm dlx shadcn@latest add dropdown 
3. "suppressHydrationWarning" in html tag
4. add in root layout's body -- <ThemeProvider attribute="class" defaultTheme="system" enableSystem> (ThemeProviderfrom "next-themes")
5. inject this file <ThemeToggle />
*/

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const options = [
    { label: "Light", value: "light", Icon: Sun },
    { label: "Dark", value: "dark", Icon: Moon },
    { label: "System", value: "system", Icon: Monitor },
  ];

  return (
    <div className={cn("fixed top-4 right-4 z-50", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md backdrop-blur-sm bg-background/80 border border-border hover:scale-105 transition-transform duration-150"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="mt-1 min-w-32">
          {options.map(({ label, value, Icon }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex items-center gap-2 cursor-pointer",
                theme === value && "font-semibold text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {theme === value && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
