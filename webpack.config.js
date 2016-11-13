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
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
        loader: ExtractTextPlugin.extract('css?sourceMap&minimize!postcss?sourceMap!sass?sourceMap')
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
    return [ autoprefixer({ browsers: [ '> 0.1%', 'last 3 versions' ] }) ];
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'react-ui-library' }),
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
    stats: {
      colors: true,
      chunks: false,
      reasons: true,
      children: false
    }
  }
};

const dev = {
  entry: {
    'react-ui-library': [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080/',
      // 'webpack/hot/only-dev-server',
      // reloads if it can't hot replace
      'webpack/hot/dev-server',
      './src/index.js'
    ],
    styleguide: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080/',
      // 'webpack/hot/only-dev-server',
      // reloads if it can't hot replace
      'webpack/hot/dev-server',
      './styleguide/styleguide.js'
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

const dist = {
  entry: {
    'react-ui-library': [ './src/index.js' ],
    styleguide: [ './styleguide/styleguide.js' ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, output: { comments: false } })
  ]
};


if (TARGET === 'dist') {
  module.exports = merge(common, dist);
}

if (TARGET === 'start') {
  module.exports = merge(common, dev);
}
