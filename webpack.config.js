const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const TARGET = process.env.npm_lifecycle_event;

const common = {
  entry: {
    vendor: [
      '@babel/polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'prop-types',
      'react-children-utilities',
    ],
    'react-ui-library': ['./src/index.js'],
    styleguide: ['./styleguide/styleguide.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        enforce: 'post',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins() {
                  return [autoprefixer];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
        enforce: 'post',
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        enforce: 'post',
      },
      {
        test: /\.md$/,
        use: ['babel-loader', 'react-markdown-loader'],
        enforce: 'post',
      },
    ],
  },
  plugins: [
    new StyleLintPlugin({ syntax: 'scss' }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './styleguide/styleguide.html',
      inject: 'body',
      hash: true,
    }),
  ],
  stats: {
    colors: true,
    chunks: false,
    children: false,
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
    quiet: true,
  },
};

const dev = {
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

if (TARGET === 'start' || TARGET === 'test') {
  module.exports = merge(common, dev);
} else {
  module.exports = merge(common);
}
