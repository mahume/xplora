const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['env'] },
    },
  ],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions ' })];
    },
  },
};

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
