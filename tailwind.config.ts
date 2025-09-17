import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { 
      center: true, 
      padding: { 
        DEFAULT: "1rem", 
        lg: "2rem", 
        xl: "5rem" 
      } 
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        script: ["var(--font-vibes)", "cursive"],
      },
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        muted: "#666666",
        "muted-light": "#AAAAAA",
        lime: "#C6FF00",       // минимальные акценты - максимум 5% интерфейса
        // Оранжевый не в UI! Только в изображениях/бэкграунд-текстурах кейсов.
      },
      borderRadius: { 
        xl: "24px", 
        '2xl': "32px" 
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,.12)",
        glow: "0 12px 40px rgba(198,255,0,.35)"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
