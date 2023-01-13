/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EAE1D8',
        'shadow-cream': '#C7C0B8',
        green: '#618565',
        'dark-green': '#80947D'
      },
    },
  },
  plugins: [],
}
