/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'brand-black': '#0A0A0A',
        'brand-white': '#F8F7F4',
        'brand-grey': {
          100: '#F0EFEC',
          200: '#D9D9D9',
          400: '#9A9A9A',
          600: '#5A5A5A',
          800: '#2A2A2A',
        }
      },
    },
  },
  plugins: [],
}