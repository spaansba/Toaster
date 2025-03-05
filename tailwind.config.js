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

          // Light variants
          "light-blue": "#87CEFAA2",
          "light-green": "#98FB98A2",
          "light-pink": "#FFA7B6A2",
          "light-yellow": "#FFD787A2",
          "light-orange": "#FFA07AA2",
          "light-purple": "#DDA0DDA2",
        },
      },
    },
  },
  plugins: [],
}
