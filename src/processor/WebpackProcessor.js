/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');
const BebelHelper = require('../helpers/BebelHelper');

try {
  var named = require('vinyl-named');
  var webpackStream = require('webpack-stream');
} catch (e) {
  console.error(e);
  console.error('Please run "yarn add webpack-stream webpack-comment-remover-loader vinyl-named babel-loader" first.');
  process.exit(255);
}

class WebpackProcessor extends JsProcessor {
  prepareOptions(options) {
    options.webpack = options.webpack || this.getWebpackConfig();

    return options;
  }

  compile(dest, options) {
    this.pipe(named());
    this.pipe(webpackStream(options.webpack));
  }

  getWebpackConfig() {
    return {
      mode: process.env.NODE_ENV || 'development',
      output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
              loader: 'babel-loader',
              options: BebelHelper.basicOptions()
            }, 'webpack-comment-remover-loader']
          }
        ]
      },
      plugins: []
    };
  }
}

module.exports = WebpackProcessor;
