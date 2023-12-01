/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        darkest: "#06100c",
        dark: "#174634",
        mid: "#29a173",
        light: "#cfe8dc",
        lightest: "#ffffff",
        brand: "#f1b24a",
      },
    },
  },
  plugins: [],
};
