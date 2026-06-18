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
        navy: {
          DEFAULT: "#0a1628",
          light: "#132238",
          dark: "#060d18",
        },
        accent: {
          red: "#e63946",
          "red-dark": "#c1121f",
          yellow: "#ffd60a",
          gold: "#f4a261",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        plate: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
