const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    App: './public/javascripts/xplora-app.js',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js',
  },
};

process.noDeprecation = true;

module.exports = config;
