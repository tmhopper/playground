import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dirt: {
          50: "#F4EDE0",
          100: "#E8D9BE",
          200: "#C9AE82",
          300: "#A48353",
          400: "#7A5E3C",
          500: "#4A3728",
          600: "#3B2C20",
          700: "#2C2018",
          800: "#1D1510",
          900: "#0F0A08",
        },
        hazard: {
          DEFAULT: "#FF6B1A",
          dark: "#C94F0C",
          light: "#FF8A47",
        },
        caution: {
          DEFAULT: "#F5C518",
          dark: "#B8930F",
        },
        rust: "#8B2C1F",
        concrete: "#7A7A78",
        bone: "#F4EDE0",
      },
      fontFamily: {
        display: ["Bungee", "Impact", "sans-serif"],
        body: ["\"Roboto Slab\"", "Georgia", "serif"],
        marker: ["\"Permanent Marker\"", "cursive"],
      },
      backgroundImage: {
        "caution-tape":
          "repeating-linear-gradient(45deg, #F5C518 0 20px, #1D1510 20px 40px)",
        jobsite:
          "radial-gradient(ellipse at top, #7A5E3C 0%, #4A3728 40%, #2C2018 100%)",
      },
      boxShadow: {
        jobsite: "0 10px 30px -10px rgba(74, 55, 40, 0.6)",
        hazard: "0 0 0 3px #FF6B1A",
      },
    },
  },
  plugins: [],
};

export default config;
