/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Forest palette carried over from the original brand. One accent: `brand` (amber).
      colors: {
        ink: "#06100c",
        forest: "#0d2119",
        moss: "#174634",
        bone: "#e8efe9",
        muted: "#9db3a8",
        brand: "#f1b24a",
        danger: "#ff8f7a",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        sans: ['"Geist Variable"', "system-ui", "sans-serif"],
      },
      // Radius system: media 28px, inputs 12px (rounded-xl), buttons full pill.
      borderRadius: {
        media: "28px",
      },
    },
  },
  plugins: [],
};
