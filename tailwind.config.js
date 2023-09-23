/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#007F00',   
        secondary: '#00CC00',   
        tertiary: '#00FF00',  
        BaseBackground:'#163a16'   
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


