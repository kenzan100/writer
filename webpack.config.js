const path = require('path');

module.exports = {
  entry: './app/src/index.js',
  devServer: {
    contentBase: './app/dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist')
  }
};
