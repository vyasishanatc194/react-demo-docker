const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NamedModulesPlugin = require('name-all-modules-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets'),
      Actions: path.resolve(__dirname, 'src/actions'),
      Components: path.resolve(__dirname, 'src/components'),
      Containers: path.resolve(__dirname, 'src/containers'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Pages: path.resolve(__dirname, 'src/pages'),
      Services: path.resolve(__dirname, 'src/services'),
      Network: path.resolve(__dirname, 'src/network'),
      Utils: path.resolve(__dirname, 'src/utils'),
      LessConstants: path.resolve(__dirname, 'src/styles/constants.less'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ico$/,
        use: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=[hash:base64:6]', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.pdf$/,
        use: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.(ttf|otf|eot)$/,
        use: 'file-loader?name=assets/[name].[ext]',
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?limit=10000&name=assets/[name].[ext]',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader?name=assets/audio/[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: 'src/assets/favicon.png',
    }),
    new ExtractTextPlugin('stylesheet.css'),
    new Dotenv(),
  ],
  devtool: 'eval',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    historyApiFallback: true,
    hot: true,
  },
  watchOptions: {
    // For hot reload Windows with Docker
    poll: true
  }
};
