const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  entry: {
    style: './client/styles/index.scss',
  },
  output: {
    path: path.join(__dirname, 'public/styles'),
    filename: 'style.css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
},
{
  entry: {
    script: ['babel-polyfill', './client/js/app.js']
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}];
