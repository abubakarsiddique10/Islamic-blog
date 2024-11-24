const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 1px 8px rgba(149, 157, 165, 0.2)',
      },
      screens: {
        'xs': '400px',
      },
      fontFamily: {
        'siliguri': ['', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        secondary: {
          100: '#242424',
          200: '#080404cc',
        },
      }
    }
  },
  plugins: [],
}

