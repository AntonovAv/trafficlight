module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-url': {},
    'postcss-focus': {},
    'postcss-cssnext': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {
      clearMessages: true
    }
  }
}
