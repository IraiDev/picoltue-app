module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '75vh': '75vh',
      },
      minHeight: {
        'sb': '500px',
      },
      width: {
        table: '1550px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
