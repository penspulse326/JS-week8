/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*/*.html", "./dist/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD370",
        dark: "#333333",
      },
      textColor: {
        alert: "#D87355",
      },

      backgroundImage: {
        logo: "url('../src/images/logo_lg.svg')",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC, sans-serif"],
    },
  },
  plugins: [],
};
