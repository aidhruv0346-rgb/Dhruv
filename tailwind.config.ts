import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-clash)", "Syne", "sans-serif"],
        heading: ["var(--font-syne)", "Syne", "sans-serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"]
      },
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          card: "var(--color-bg-card)"
        },
        accent: {
          violet: "var(--color-accent-1)",
          teal: "var(--color-accent-2)",
          coral: "var(--color-accent-3)"
        },
        ink: {
          primary: "var(--color-text-primary)",
          body: "var(--color-text-body)",
          muted: "var(--color-text-muted)"
        }
      },
      boxShadow: {
        card: "0 0 40px rgba(108,99,255,0.08)",
        glow: "0 0 60px rgba(108,99,255,0.20)",
        teal: "0 0 60px rgba(0,212,170,0.15)"
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        blob: "blob 20s ease-in-out infinite",
        pulseGlow: "pulseGlow 3.5s ease-in-out infinite",
        shimmer: "shimmer 1.3s ease-in-out"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        blob: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(18px,-28px,0) scale(1.06)" },
          "66%": { transform: "translate3d(-18px,18px,0) scale(.96)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: ".45", transform: "scale(.98)" },
          "50%": { opacity: ".95", transform: "scale(1.04)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
