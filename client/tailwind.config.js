/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'uni-green': '#829B9A',
        'uni-brown': '#62615F',
        'uni-gray': '#6C727F',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
