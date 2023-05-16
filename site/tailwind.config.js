/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx,md}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      screens: {
        md: '848px',
      },
    },
  },
  plugins: [],
}
