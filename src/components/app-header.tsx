"use client";

import Link from "next/link";
import { CursorLogo } from "@/components/cursor-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/upload", label: "Upload" },
  { href: "/login", label: "Sign in" },
] as const;

export function AppHeader() {
  return (
    <header className="border-b border-card-02 bg-bg">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/leaderboard" className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <CursorLogo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <ThemeToggle />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-fg/80 transition-colors hover:bg-card hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
