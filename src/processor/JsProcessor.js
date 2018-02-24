/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const merge = require('lodash.merge');

class JsProcessor extends Processor {
  prepareOptions(options) {
    return merge({}, {
      sourcemap: true,
      minify: true
    }, options);
  }

  createStream(source, options) {
    if (options.minify) {
      source.push('!./**/*.min.js');
    }

    return gulp.src(source);
  }

  compile(dest, options) {
    //
  }

  doProcess(dest, options) {
    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    this.compile(dest, options);

    if (dest.merge) {
      if (options.sourcemap) {
        this.pipe(sourcemaps.write('.'));
      }

      this.pipe(gulp.dest(dest.path));
    }

    this
      .pipe(filter('**/*.js'));

    if (options.minify) {
      this.pipe(rename({suffix: '.min'}))
        .pipe(uglify().on('error', e => console.error(e)));
    }

    this.pipe(gulp.dest(dest.path));
  }
}

module.exports = JsProcessor;
