/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#04773B",
      },
      width: {
        27: "27%",
      },
    },
  },
  plugins: [],
};

