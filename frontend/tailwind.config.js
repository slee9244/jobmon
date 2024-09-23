/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "gmarket-sans": ["Gmarket Sans", "sans-serif"],
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
      colors: {
        gray: {
          100: "#f9f9f9",
          200: "#f4f4f4",
          300: "#ebebeb",
          400: "#c4c4c4",
          500: "#878787",
          600: "#545454",
          700: "#494949",
          800: "#333333",
        },
      },
    },
  },
  plugins: [],
};
