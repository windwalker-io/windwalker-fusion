/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const path = require('path');
const concat = require('gulp-concat');
const fs = require('fs');
const Utilities = require('../Utilities');

class JsProcessor extends Processor {
  constructor(source, options = {}) {
    if (typeof source === 'string') {
      source = [source];
    }

    super(source, options);
  }

  compile() {
    //
  }

  process(dest = null) {
    const options = this.options;
    dest = Utilities.extractDest(dest);

    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    this.compile();

    if (dest.merge) {
      if (options.sourcemap) {
        this.pipe(sourcemaps.write('.'));
      }

      this.pipe(gulp.dest(dest.path));
    }

    this
      .pipe(filter('**/*.js'))
      .pipe(rename({suffix: '.min'}));

    if (options.minify) {
      this.pipe(uglify().on('error', e => console.error(e)));
    }

    this.pipe(gulp.dest(dest.path));

    return this.stream;
  }

  prepareOptions(options) {
    return Object.assign({}, {
      sourcemap: true,
      minify: true
    }, options);
  }
}

module.exports = JsProcessor;
