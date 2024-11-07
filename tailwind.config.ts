import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xsm": "375px",
      xsm: "425px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        flipIn: {
          "0%": { opacity: "0", transform: " rotateY(180deg)" },
          "100%": { opacity: "1", transform: " rotateY(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInX: {
          "0%": { opacity: "0", transform: "translateX(-1rem)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideLeftToRight: {
          "0%": { transform: "translateX(-100%)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        flipIn: "flipIn 1s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeInX: "fadeInX 0.6s ease-in-out forwards",
        slideLeftToRight: "slideLeftToRight 1s ease forwards",
      },
      colors: {
        primary: "#008ECC",
        secondary: "#80CAEE",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
