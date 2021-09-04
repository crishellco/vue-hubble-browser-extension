module.exports = {
  purge: [
    './src/**/*.svelte',
    // may also want to include HTML files
    './src/**/*.html',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        popup: '22.75rem',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover'],
    },
  },
  plugins: [],
};
