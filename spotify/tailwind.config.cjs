/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "green": "#11512c",
        "dark": "#191414"
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}
