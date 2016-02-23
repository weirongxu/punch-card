module.exports = {
  entry: './index.js',
  output: {
    filename: 'app.js',
  },
  watch: true,
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js/, loader: 'babel' },
    ]
  },
  devtools: 'inline-source-map',
}
