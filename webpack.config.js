const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const React = require('react')

module.exports = {

  entry: {
    unused: './src/static.js',
    'scripts/main': './src/client/main.js',
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/build`,
    libraryTarget: 'umd',
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: [ '/' ],
      globals: { React },
    }),
  ],

  externals: { jquery: 'jQuery' },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ `${__dirname}/node_modules` ],
        use: [ 'babel-loader' ],
      },
      {
        test: /\.json$/,
        use: [ 'json-loader' ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'file-loader', options: { name: '[hash]-[name].[ext]', outputPath: '/styles/' } },
          'extract-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          { loader: 'file-loader', options: { name: '[hash]-[name].[ext]', outputPath: '/images/' } },
        ],
      },
    ],
  },
}
