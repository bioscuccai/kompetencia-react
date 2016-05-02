var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/main.js.jsx',
  devtool: 'source-map',
  output: {
    //path: path.join(__dirname, 'public'),
    path: __dirname,
    filename: './bundle.js'
  },
  module: {
    loaders: [
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
      //{ test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader?name=/[name].[ext]' },
      
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
