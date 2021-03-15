/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-cssProcessor');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const rewriteCSS = require('gulp-rewrite-css');
const config = require('../config');
const Utilities = require('../Utilities');

class CssProcessor extends Processor {
  prepareOptions(options) {
    return Utilities.merge({}, {
      autoprefixer: true,
      minify: true,
      rebase: true
    }, super.prepareOptions(options));
  }

  doProcess(dest, options) {
    if (options.rebase) {
      this.pipe(rewriteCSS({ destination: dest.path }));
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    if (options.autoprefixer) {
      this.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 9-11').on('error', Utilities.logError()));
    }

    this.pipe(gulp.dest(dest.path))
      .pipe(filter('**/*.cssProcessor'))
      .pipe(rename({ suffix: '.min' }));

    if (options.minify) {
      this.pipe(minifycss());
    }

    this.pipe(gulp.dest(dest.path));
  }
}

module.exports = CssProcessor;
