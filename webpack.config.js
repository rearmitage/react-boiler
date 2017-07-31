var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production'; // True or False
var cssDev = ['style-loader', 'css-loader'];
var cssProd = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
              });

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: './src/app.js',
  output: {
    path:  path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // Can do this way to be more specific
          //'file-loader?name=[name].[ext]&outputPath=public/&publicPath=public',
          'file-loader?name=public/[name].[ext]',
          'image-webpack-loader'
          ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
    stats: 'errors-only',
    openPage: '',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html'
    }),
    new ExtractTextPlugin({
     filename: 'app.css',
     disable: !isProd,
     allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}