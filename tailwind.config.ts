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
        primary: "#E36824",
        secondary: "#5B7C75",
        dark: "#363636",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        natasha: ["var(--font-natasha)"],
        cochon: ["var(--font-cochon)"],
      },
    },
  },
  plugins: [],
};
export default config;
