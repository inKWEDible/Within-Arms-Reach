const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports ={
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output:{
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins:[new HTMLWebpackPlugin({template: './client/index.html'})],
  devServer: {
    static:{
      directory: path.join(__dirname, 'client'),
      publicPath: '/'
    },
    compress:true,
    proxy:{
      '/': 'http://localhost:3000'
    }
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      }
    },
    {
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.css$/i,
      use: ['css-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}