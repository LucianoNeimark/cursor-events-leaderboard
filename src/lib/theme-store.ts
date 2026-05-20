import {
  applyTheme,
  readStoredTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

const listeners = new Set<() => void>();

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitThemeChange(): void {
  listeners.forEach((listener) => listener());
}

export function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getThemeServerSnapshot(): Theme {
  return "light";
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore quota / private mode
  }
  emitThemeChange();
}

export function toggleTheme(): void {
  const next = getThemeSnapshot() === "light" ? "dark" : "light";
  setTheme(next);
}

/** Re-read DOM after hydration so client state matches ThemeScript. */
export function syncThemeAfterHydration(): void {
  const stored = readStoredTheme();
  if (stored) {
    applyTheme(stored);
  }
  emitThemeChange();
}
