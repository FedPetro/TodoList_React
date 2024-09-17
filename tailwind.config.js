/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#ffffff',
        'secondary' : '#21b0fe',
        'third' : '#000000',
        'fourth' : '#FFEA00'
      },
      fontFamily: {
        'display' : "'Nunito', sans-serif"
      }
    },
  },
  plugins: [],
}