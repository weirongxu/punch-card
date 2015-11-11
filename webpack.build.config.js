var webpack = require('webpack');
module.exports = {
  entry: './index.js',
  output: {
    filename: 'app.js',
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js/, loader: 'babel' },
    ]
  },
}
