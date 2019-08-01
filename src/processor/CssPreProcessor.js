/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const merge = require('lodash.merge');
const rewriteCSS = require('gulp-rewrite-css');
const eol = require('gulp-eol');

const Processor = require('./Processor');
const Utilities = require("../Utilities");

class CssPreProcessor extends Processor {
  prepareOptions(options) {
    return Utilities.merge({}, {
      sourcemap: true,
      autoprefixer: true,
      minify: true,
      rebase: false
    }, super.prepareOptions(options));
  }

  compile() {
    //
  }

  doProcess(dest, options) {
    this.pipe(eol("\n", true));

    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    this.compile();

    if (options.rebase && !dest.samePosition) {
      this.pipe(rewriteCSS({destination: dest.path}));
    }

    if (options.autoprefixer) {
      this.pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9").on('error', Utilities.logError()));
    }

    if (options.sourcemap) {
      this.pipe(sourcemaps.write('.'));
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

module.exports = CssPreProcessor;
