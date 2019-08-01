/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');
const BebelHelper = require('../helpers/BebelHelper');

try {
  var named = require('vinyl-named-with-path');
  var webpackStream = require('webpack-stream');
} catch (e) {
  const chalk = require('chalk');
  console.error(e);
  console.error(`\nPlease run "${chalk.yellow('yarn add webpack-stream webpack-comment-remover-loader vinyl-named-with-path babel-loader')}" first.\n`);
  process.exit(255);
}

const Utilities = require('../Utilities');

class WebpackProcessor extends JsProcessor {
  prepareOptions(options) {
    if (!options.override) {
      options.webpack = Utilities.merge(
        this.getWebpackConfig(),
        options.webpack
      );
    }
    
    return options;
  }

  compile(dest, options) {
    this.pipe(named())
      .pipe(webpackStream(options.webpack));
  }

  getWebpackConfig() {
    return {
      mode: process.env.NODE_ENV || 'development',
      output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
      },
      stats: {
        all: false,
        errors: true,
        warnings: true,
        version: false,
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
