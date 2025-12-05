/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B4CCA',
          light: '#5B6FE8',
          dark: '#2A3799',
        },
        secondary: {
          DEFAULT: '#FFCB05',
          light: '#FFD740',
          dark: '#E6B800',
        },
        accent: {
          DEFAULT: '#FF5350',
          light: '#FF7673',
          dark: '#E63835',
        },
        pokemon: {
          fire: '#F08030',
          water: '#6890F0',
          grass: '#78C850',
          electric: '#F8D030',
          ice: '#98D8D8',
          psychic: '#F85888',
          dark: '#705848',
          dragon: '#7038F8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
