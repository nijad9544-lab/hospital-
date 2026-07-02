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
        primary: {
          DEFAULT: "#0057B8",
          dark: "#003E82",
        },
        secondary: {
          DEFAULT: "#00A99D",
        },
        offwhite: "#F7F9F9",
        darktext: "#1A2B2B",
        muted: "#5A7070",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "24px",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,87,184,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
