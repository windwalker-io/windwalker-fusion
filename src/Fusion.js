/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const gulp = require('gulp');
const util = require("gulp-util");
const less = require("gulp-less");
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const log = util.log;
const filter = require('gulp-filter');
const path = require('path');
const concat = require('gulp-concat');

const SassProcessor = require('./processor/SassProcessor');
const LessProcessor = require('./processor/LessProcessor');

class Fusion {
  constructor() {
  }

  static less(source, dest = null, options = {}) {
    return new LessProcessor(source, options).process(dest);
  }

  static sass(source, dest = null, options = {}) {
    return new SassProcessor(source, options).process(dest);
  }

  static src(source, options) {
    return gulp.src(source, options);
  }

  static dest(path, options) {
    return gulp.dest(path, options);
  }

  static task(name, deps, fn) {
    return gulp.task(name, deps, fn);
  }

  static watch(glob, opt, fn) {
    return gulp.watch(glob, opt, fn);
  }

  static run(defaultTasks = ['main']) {
    console.log('Hello');
    gulp.task('default', defaultTasks);
  }
}

module.exports = Fusion;
