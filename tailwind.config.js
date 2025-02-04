/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
      animation: {
        'slide-down': 'slide-down 1s ease-out'
      },
      keyframes: {
        'slide-down': {
          '0%': {
              transform: 'translateY(0)'
          },      
          '100%': {
              transform: 'translateY(108%)'
          }
        }
      }
    },
    plugins: [],
  }