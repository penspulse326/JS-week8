/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.html", "./pages/*/*.html", "./src/**/*.js"],
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
        logo: "url('../images/logo_lg.svg')",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC, sans-serif"],
    },
  },
  plugins: [],
};
