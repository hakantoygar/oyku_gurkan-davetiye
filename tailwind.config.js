/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAEE',
          100: '#FAF6EE',
          200: '#F4ECE1',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A059',
          600: '#8B6F39',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        cursive: ['Pinyon Script', 'cursive'],
      }
    },
  },
  plugins: [],
}