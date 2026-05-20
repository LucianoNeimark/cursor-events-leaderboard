"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="inline-flex items-center gap-2 select-none">
      <span
        className={`text-xs transition-colors ${isDark ? "text-fg/60" : "text-fg"}`}
        aria-hidden
      >
        Light
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          isDark
            ? "border-card-03 bg-card-03"
            : "border-card-02 bg-card-02"
        }`}
      >
        <span className="sr-only">{isDark ? "Dark mode on" : "Light mode on"}</span>
        <span
          aria-hidden
          className={`pointer-events-none absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-fg shadow-sm transition-transform duration-200 ease-out ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
      <span
        className={`text-xs transition-colors ${isDark ? "text-fg" : "text-fg/60"}`}
        aria-hidden
      >
        Dark
      </span>
    </div>
  );
}
