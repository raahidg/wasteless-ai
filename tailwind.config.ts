import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        lime: {
          accent: "#84cc16",
          glow: "#a3e635",
        },
        slate: {
          850: "#111827",
          900: "#0b1220",
          925: "#080e1a",
          950: "#030712",
        },
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 15px -3px rgba(16, 185, 129, 0.08)',
        'card-hover': '0 10px 30px -4px rgba(0, 0, 0, 0.6), 0 0 25px -2px rgba(16, 185, 129, 0.2)',
        'glow': '0 0 30px -5px rgba(16, 185, 129, 0.35)',
        'glow-lg': '0 0 50px -10px rgba(16, 185, 129, 0.45)',
        'glow-lime': '0 0 30px -5px rgba(132, 204, 22, 0.35)',
      },
      backgroundImage: {
        'mesh-glow': 'radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
        'subtle-emerald': 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 78, 59, 0.05) 100%)',
        'glass-card': 'linear-gradient(145deg, rgba(17, 24, 39, 0.75) 0%, rgba(11, 18, 32, 0.85) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
