import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        surface: {
          glass: "var(--surface-glass)",
        },
        accent: {
          cyan: "var(--accent-cyan)",
          emerald: "var(--accent-cyan)",
          amber: "var(--accent-amber)",
        },
        danger: {
          red: "var(--danger-red)",
        },
        success: {
          green: "var(--success-green)",
        },
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          subtle: "var(--border-subtle)",
        },
        grid: {
          line: "var(--grid-line)",
        },
      },
      boxShadow: {
        "cyan-glow": "var(--accent-cyan-glow)",
        "emerald-glow": "var(--accent-cyan-glow)",
        "amber-glow": "var(--accent-amber-glow)",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-red": "pulse-red 2s infinite",
        "live-blink": "blink 1.5s infinite",
      },
      keyframes: {
        "pulse-red": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 51, 85, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(255, 51, 85, 0)" },
        },
        blink: {
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
