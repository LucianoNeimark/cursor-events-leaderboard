import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        accent: "var(--color-accent)",
        card: {
          DEFAULT: "var(--color-card)",
          "01": "var(--color-card-01)",
          "02": "var(--color-card-02)",
          "03": "var(--color-card-03)",
          "04": "var(--color-card-04)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Cursor Gothic", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
