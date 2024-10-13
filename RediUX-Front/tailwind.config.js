/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      black: "#212529",
      blue: {
        light: "#BECBEA",
        DEFAULT: "#6489D1",
        dark: "#0C2D8A",
      },
      gray: {
        offwhite: "#F9F9F7",
        light: "#E9ECEF",
        DEFAULT: "#CED4DA",
        medium: "#6C757D",
        dark: "#6C757D",
      },
      tags: {
        red: "#FFB1B1",
        green: "#AAFFB4",
        yellow: "#FFF7AF",
        purple: "#DC94F1",
        orange: "#FFD09D",
      },
      status: {
        green: "#28A745",
        red: "#DC3545",
        yellow: "#FFC107",
      },
      table: {
        divider: "#0000001f",
      },
    },
    extend: {},
  },
  plugins: [],
};
