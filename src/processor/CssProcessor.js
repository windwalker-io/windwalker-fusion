/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const rebase = require('gulp-css-url-rebase');
const rewriteCSS = require('gulp-rewrite-css');
const merge = require('lodash.merge');
const config = require('../config');
const Utilities = require("../Utilities");

class CssProcessor extends Processor {
  prepareOptions(options) {
    return merge({}, {
      autoprefixer: true,
      minify: true,
      rebase: true
    }, options);
  }

  doProcess(dest, options) {
    if (options.rebase) {
      this.pipe(rewriteCSS({destination: dest.path}));
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    if (options.autoprefixer) {
      this.pipe(autoprefixer("last 3 version", "safari 5", "ie 9-11").on('error', Utilities.logError()));
    }

    this.pipe(gulp.dest(dest.path))
      .pipe(filter('**/*.css'))
      .pipe(rename({suffix: '.min'}));

    if (options.minify) {
      this.pipe(minifycss());
    }

    this.pipe(gulp.dest(dest.path));
  }
}

module.exports = CssProcessor;
