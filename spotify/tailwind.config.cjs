/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "green": "#11512c",
        "black-base": "#121212",
        "black-primary": "#191414",
        "black-secondary":"#171818",
        "light-black": "#282828",
        "dark": "#191414",
        "secondary": "#b3b3b3",
        "gray": "#535353"
      },
      gridTemplateColumns:{
        'auto-fill-cards': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/line-clamp'),
  ],
}
