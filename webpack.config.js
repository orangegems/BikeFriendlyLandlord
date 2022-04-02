const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/src/index.js',
    app: './client/src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    // publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
      publicPath: process.env.NODE_ENV === 'production' ? 'build' : 'auto',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './client/public/app.html',
      filename: 'app.html',
      publicPath: process.env.NODE_ENV === 'production' ? 'build' : 'auto',
      chunks: ['app'],
    }),
  ],
  devServer: {
    // historyApiFallback: true,
    hot: true,
    magicHtml: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/app': {
        // ? understand hov this works
        // target: 'http://localhost:3000',
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/app.html';
          }
        },
      },
    },
  },
};
