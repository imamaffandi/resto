/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Built around the black-and-white logo: warm paper, charcoal ink, two restrained accents.
      colors: {
        rice: "#F5F0E7", // page paper
        ink: "#1D1B18", // text, rules, dark surfaces
        wood: "#654331", // secondary text on paper
        terra: "#A65337", // primary accent: rules, headings, CTAs
        sand: "#D7C4A5", // backdrop, muted fills
        olive: "#777A53", // secondary accent, sparing
        "terra-deep": "#8C432C",
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
        sans: ['"Geist Variable"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
