/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const path = require('path');
const concat = require('gulp-concat');
const fs = require('fs');

class CssProcessor extends Processor {
  compile() {
    //
  }

  process(dest = null) {
    const options = this.options;
    let merge = dest !== null && (dest.slice(-1) !== '/' || !fs.lstatSync(dest).isDirectory());
    let destFile;
    let destPath;

    if (merge) {
      destFile = path.basename(dest);
      destPath = path.dirname(dest);
    } else if (dest === null) {
      destPath = file => {
        console.log(file, file.base);
        return file.base;
      }
    } else {
      destPath = dest;
    }

    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (merge) {
      this.pipe(concat(destFile));
    }

    this.compile();

    if (options.autoprefixer) {
      this.pipe(autoprefixer("last 3 version", "safari 5", "ie 8", "ie 9"));
    }

    if (options.sourcemap) {
      this.pipe(sourcemaps.write('.'));
    }

    this.pipe(gulp.dest(destPath))
      .pipe(filter('**/*.css'))
      .pipe(rename({suffix: '.min'}));

    if (options.autoprefixer) {
      this.pipe(minifycss());
    }

    this.pipe(gulp.dest(destPath));

    return this.stream;
  }

  prepareOptions(options) {
    return Object.assign({}, {
      sourcemap: true,
      autoprefixer: true,
      minify: true
    }, options);
  }
}

module.exports = CssProcessor;
