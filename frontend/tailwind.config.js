/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      'ukblue': '#005BBB',
      'ukblue-darken': '#124c8a',
      'ukyellow': '#FFD500',
      'ukyellow-op5': '#E6FFD500',
    },
  },
  plugins: [],
}
