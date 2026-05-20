"use client";

import { useSyncExternalStore } from "react";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeTheme,
} from "@/lib/theme-store";

const LOGO_HEIGHT_PX = 24;
/** viewBox width / height from official lockup SVG */
const LOGO_ASPECT = 2238.7 / 532.09;
const BREATHING_ROOM_PX = Math.ceil(LOGO_HEIGHT_PX / 3);

export function CursorLogo() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  const src =
    theme === "dark"
      ? "/brand/lockup-horizontal-2d-dark.svg"
      : "/brand/lockup-horizontal-2d-light.svg";

  return (
    <div
      className="inline-flex items-center"
      style={{ padding: BREATHING_ROOM_PX }}
      aria-label="Cursor"
    >
      <img
        src={src}
        alt=""
        width={Math.round(LOGO_HEIGHT_PX * LOGO_ASPECT)}
        height={LOGO_HEIGHT_PX}
        className="h-6 w-auto"
        decoding="async"
      />
    </div>
  );
}
