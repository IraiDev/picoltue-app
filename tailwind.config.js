module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '75vh': '80vh',
      },
      minHeight: {
        'sb': '500px',
      },
      width: {
        table: '1550px',
        table_md: '920px',
        table_sm: '720px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
