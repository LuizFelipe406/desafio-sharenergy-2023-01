/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EBE7D9',
        dcream: '#C7C0B8',
        green: '#618565',
        dgreen: '#4C694F',
        golden: '#C5B688'
      },
      fontFamily: {
        plexSans: ['IBM Plex Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
