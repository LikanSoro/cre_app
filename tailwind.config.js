/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5',    // indigo‑600
          light:   '#EEF2FF',    // indigo‑50
          dark:    '#3730A3',    // indigo‑700
        },
        surface:   '#F9FAFB',    // gray‑50
        card:      '#FFFFFF',    // white
      },
      fontFamily: {
        sans: ['Inter','ui-sans-serif','system-ui'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
