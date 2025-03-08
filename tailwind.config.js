/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        courier: ["CourierPrime-Regular", "sans-serif"],
        "courier-bold": ["CourierPrime-Bold", "sans-serif"],
        "courier-bold-italic": ["CourierPrime-BoldItalic", "sans-serif"],
        "courier-italic": ["CourierPrime-Italic", "sans-serif"],
      },
      padding: {
        standardPagePadding: "20px",
      },
      colors: {
        primary: {
          100: "#fff3e1A1",
          200: "#fff3e1",
          300: "#fff3e1A2",
        },
        accent: {},
        danger: "#F75555",
        toaster: {
          // Original colors
          blue: "#87CEFA",
          green: "#98FB98",
          pink: "#FFA7B6",
          yellow: "#FFD787",
          orange: "#FFA07A",
          purple: "#DDA0DD",

          "light-blue": "#D9F1FD",
          "light-green": "#D9F9E2",
          "light-pink": "#FCDEE4",
          "light-yellow": "#FFF2D9",
          "light-orange": "#FCDFD2",
          "light-purple": "#F3DFFC",
        },
      },
    },
  },
  plugins: [],
}
