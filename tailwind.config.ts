import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      grotesk: ["Space Grotesk", "sans-serif"],
    },

    screens: {
      xlg: { min: "1201px" },
      lg: { max: "1200px" },
      md: { max: "1024px" },
      mobile: { max: "700px" },
      mobileSm: { max: "500px" },
      sm: { max: "390px" },
    },
    extend: {
      spacing: {
        14: "clamp(10px,1vw,14px)",
        18: "clamp(12px,1.1vw,18px)",
        25: "clamp(16px,1.5vw,25px)",
        68: "clamp(52px,4.1vw,68px)",
      },
      colors: {
        "primary-gold-100": "#FEEFC3",
        "primary-gold-200": "#FEE38B",
        "primary-gold-300": "#FDD649",
        "base-100-dark": "#292929",
        "base-300-dark": "#696969",
        "base-500-dark": "#888888",
        "base-700-dark-tertiary": "#B7B7B7",
        "base-800-dark": "#CFCFCF",
        "base-900-dark": "#FEFEFE",
      },
      lineHeight: {
        144: "144%",
      },
    },
  },
  plugins: [],
};
export default config;
