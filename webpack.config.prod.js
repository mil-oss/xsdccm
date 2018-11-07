var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common');
var ngw = require('@ngtools/webpack');

module.exports = webpackMerge(commonConfig, {
  entry: './assets/app/main.aot.ts',
  output: {
    path: path.resolve(__dirname, '/public/xsdccm/js/app'),
    publicPath: '/xsdccm/js/app/',
    filename: '[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.ts$/,
        use: [
          {loader: 'awesome-typescript-loader'},
          {loader: 'angular2-template-loader'},
          // {loader: 'angular-router-loader?aot=true'}
        ]
      }
    ]
  },
  plugins: [
    new ngw.AngularCompilerPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: './assets/app/app.module#AppModule'
    })
  ]
});