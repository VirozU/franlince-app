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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#1a7a3a',
          600: '#156931',
          700: '#135a2a',
          800: '#104a23',
          900: '#0d3b1c',
        },
        secondary: {
          50: '#f4f7fb',
          100: '#e9eff5',
          200: '#cedce9',
          300: '#a3bdd6',
          400: '#7199be',
          500: '#4f7ca7',
          600: '#3d638c',
          700: '#325072',
          800: '#2c455f',
          900: '#293b50',
        }
      }
    },
  },
  plugins: [],
}
