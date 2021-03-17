import concat from 'gulp-concat';
import eol from 'gulp-eol';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import stripComment from 'gulp-strip-comments';
import terser from 'gulp-terser';
import { dest as toDest } from '../base/base.js';
import { MinifyOption } from '../config.js';
import { merge } from '../utilities/utilities.js';
import Processor from './processor.js';

/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

export default function webpack(source, dest, options = {}) {
  return new WebpackProcessor(source, options).process(dest);
}

export class WebpackProcessor extends Processor {
  prepareOptions(options) {
    if (!options.override) {
      options.webpack = Utilities.merge(
        this.getWebpackConfig(),
        options.webpack
      );
    }

    return super.prepareOptions(options);
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
