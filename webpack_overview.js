webpack

a thing that lets you run require. It is basically a resource loader.

var React = require('react');


const webpack = require('webpack');
require css page on app.js right before ReactDOM render!!
- Needs CSSloader
module.exports = {
  entry: './reactApp/app.js', <--- this is where webpack knows where to begin
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
    },
     { test: /\.s?css$/, loader: 'style-loader!css-loader' },
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
