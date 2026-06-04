import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base":     "#050505",
        "bg-secondary":"#0B0B0B",
        "bg-card":     "#111111",
        "bg-elevated": "#161616",
        "bg-surface":  "#202020",
        "border-dim":  "rgba(255,255,255,0.08)",
        "border-mid":  "rgba(255,255,255,0.14)",
        "border-bright":"rgba(255,255,255,0.22)",
        "text-primary": "#FFFFFF",
        "text-muted":  "rgba(255,255,255,0.65)",
        "text-faint":  "rgba(255,255,255,0.35)",
        "text-ghost":  "rgba(255,255,255,0.18)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter:    ["var(--font-inter)", "system-ui", "sans-serif"],
        mono:     ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-7px)" },
        },
      },
      animation: {
        shimmer:     "shimmer 1.8s linear infinite",
        float:       "float 5s ease-in-out infinite",
        "float-slow":"float-slow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
