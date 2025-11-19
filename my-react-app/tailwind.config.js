module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css}",
    "./src/styles/tailwind.css"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        'brand-gray': '#333333',
      },
    },
  },
  plugins: [],
};