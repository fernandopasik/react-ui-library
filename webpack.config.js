const
  path = require('path'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    styleguide: [
      'webpack-dev-server/client?http://localhost:8080/',
      // 'webpack/hot/only-dev-server',
      // reloads if it can't hot replace
      'webpack/hot/dev-server',
      './styleguide/styleguide.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'styleguide.js'
  },
  resolve: {
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&minimize!postcss!sass')
      },
      {
        test: /\.md$/,
        loader: 'babel!react-markdown'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ]
  },
  eslint: { failOnError: false },
  sassLoader: { outputStyle: 'expanded' },
  postcss() {
    return [ autoprefixer({ browsers: [ '> 0.1%', 'last 2 versions' ]}) ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({ syntax: 'scss' }),
    new ExtractTextPlugin('styleguide.css'),
    new HtmlWebpackPlugin({
      template: './styleguide/styleguide.html',
      inject: 'body',
      hash: true
    })
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
    stats: {
      colors: true,
      chunks: false,
      reasons: true,
      children: false
    }
  }
};
