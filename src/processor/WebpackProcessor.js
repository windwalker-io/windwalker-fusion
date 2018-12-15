/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');
const webpack = require('webpack-stream');
const merge = require('lodash.merge');
const BebelHelper = require("../helpers/BebelHelper");

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge(super.prepareOptions(options), {
      webpack: {
        mode: process.env.NODE_ENV || 'development',
        output: {
          filename: '[name].js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: BebelHelper.basicOptions()
              }
            }
          ]
        }
      }
    }, options);
  }

  compile(dest, options) {
    this.pipe(webpack(options.webpack));
  }
}

module.exports = BabelProcessor;
