const
  path = require('path'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  autoprefixer = require('autoprefixer'),
  StyleLintPlugin = require('stylelint-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  WebpackNotifierPlugin = require('webpack-notifier');

const TARGET = process.env.npm_lifecycle_event;

const common = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-dom',
      'prop-types',
      'react-children-utilities'
    ],
    'react-ui-library': [ './src/index.js' ],
    styleguide: [ './styleguide/styleguide.js' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    modules: [ 'node_modules' ],
    extensions: [ '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ],
        enforce: 'post'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'eslint-loader' ],
        enforce: 'pre'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins() { return [ autoprefixer ]; }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        }),
        enforce: 'post'
      },
      {
        test: /\.json$/,
        use: [ 'json-loader' ],
        enforce: 'post'
      },
      {
        test: /\.md$/,
        use: [ 'babel-loader', 'react-markdown-loader' ],
        enforce: 'post'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new StyleLintPlugin({ syntax: 'scss' }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: './styleguide/styleguide.html',
      inject: 'body',
      hash: true
    })
  ],
  stats: {
    colors: true,
    chunks: false,
    children: false
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      reasons: true,
      children: false
    }
  }
};

const dev = {
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

const dist = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ]
};


if (TARGET === 'start' || TARGET === 'test') {
  module.exports = merge(common, dev);
} else {
  module.exports = merge(common, dist);
}
