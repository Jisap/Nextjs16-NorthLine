import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      mobile: { max: "900px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        graphite: "#17181a",
        sand: "#f4f2ec",
        rust: "#e2571c",
      },
      fontFamily: {
        display: ['"Northline"', '"Northline Display"', "Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
        editorial: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      fontSize: {
        "display-1": ["16vw", { lineHeight: "0.8" }],
        "display-2": ["12vw", { lineHeight: "0.8" }],
        "display-3": ["4vw", { lineHeight: "0.9" }],
      },
      zIndex: {
        "menu-bar": "100",
        "menu-overlay": "1000",
        transition: "10000",
      },
      keyframes: {
        "vinyl-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        // same 20s linear infinite spin as the original .spinning class
        "vinyl-spin": "vinyl-spin 20s linear infinite",
        // same 40s linear infinite scroll as the original .marquee class
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
