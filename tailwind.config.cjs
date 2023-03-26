/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'Poppins' : ['Roboto', 'sans-serif']
    },
    extend: {
      colors :{
        theme : {
          100 : "#344e41",
          200 : "#3a5a40",
          300 : "#588157",
          400 : "#a3b18a",
          500 : "#dad7cd",
        }
      }
    },
  },
  plugins: [require("daisyui")],
}
