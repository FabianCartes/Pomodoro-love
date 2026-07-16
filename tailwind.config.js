/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cat: {
          cream: '#FFFBF0',
          peach: '#FFB085',
          pink: '#FFD1D1',
          brown: '#5C4033',
          dark: '#3A2820',
          white: '#FFFFFF',
          accent: '#FFA07A',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'sans-serif'],
      },
      keyframes: {
        'fast-fall': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      animation: {
        'fast-fall': 'fast-fall 0.3s linear infinite'
      }
    },
  },
  plugins: [],
}
