/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#007F00',  
        primaryblue:'#4D6D85',
        primaryorange:'#EA580C',
        faintgreen:'#6AAD75',
        BaseBackground:'#163a16'   
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


