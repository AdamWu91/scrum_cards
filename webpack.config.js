const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './app/src/index.js',
    libs: [
      'socket.io-client'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/dist")
        ],
        // issuer: { test, include, exclude },
        loader: "babel-loader",
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './app/src/index.html'})
  ]
}