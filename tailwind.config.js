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
          100: "#EDE1D80A",
          200: "#EDE1D81A",
          300: "#EDE1D8",
        },
        accent: {},
        danger: "#F75555",
        toaster: {
          yellow: "#FFD787",
          green: "#BAFFA0",
          blue: "#87CEFA",
          pink: "#FF69B4",
          orange: "#FF7F50",
          purple: "#B19CD9",
        },
        mainBackground: "#EDE1D8",
      },
    },
  },
  plugins: [],
}
