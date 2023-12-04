/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: "#ED7D31",
          secondary: "#F9B572",
          ternary: "#F6F1EE",
        },
        purple: {
          primary: "#6636DF",
          secondary: "#8828C5",
          ternary: "#9B1FB6",
        },
        blue: {
          primary: "#0155B7",
          secondary: "#007DFE",
          ternary: "#64A5FF",
        },
        // green: {
        //   primary: "#137411",
        //   secondary: "#76DD52",
        // },
        // red: {
        //   primary: "#F14747",
        // },
        // yellow: {
        //   primary: "#D9DD02",
        // },
        mono: {
          white: "#FFFFFF",
          light_grey: "#A8A8A8",
          grey: "#6B6B6B",
          darkGrey: "#4F4A45",
          dark: "#1A2E35"
        },
        background: "#FAFAFF",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
}

