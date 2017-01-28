var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  context : path.resolve('./src'),
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './index.js'
  ],
  target: 'web',
  output: {
    path: path.resolve('./build/js/'),
    publicPath: '/public/assets/js',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  eslint: {
    configFile: './config/.eslintrc'
  },
  module: {
    preLoaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
    loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015']
                } 
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|ttf|eot)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=10000'
            }
        ]
  }
};
