/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        backgroud: '#09090A'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

