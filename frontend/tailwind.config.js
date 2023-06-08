/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'allShadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
        'allShadowLite': 'rgba(0, 0, 0, 0.35) 0px 0px 8px;'
      },
      fontFamily: {
        'script': 'var(--font-family1)',
        'jost': 'var(--font-family2)'
      }
    },
  },
  plugins: [],
}

