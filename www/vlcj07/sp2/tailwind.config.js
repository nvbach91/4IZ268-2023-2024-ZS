/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'widescreen': { 'raw': '(min-aspect-ratio: 3/2)' },
        'tallscreen': { 'raw': '(max-aspect-ratio: 13/20)' },
      },
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' },

        },
        'spinning': {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',  
        'spinning': 'spinning 2s linear infinite'
      }
    },
  },
  plugins: [],
}

