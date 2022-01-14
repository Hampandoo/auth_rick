module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'lime-500': '#84cc16',
        'cyan-500': '#06b6d4'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
