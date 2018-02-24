/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const gulp = require('gulp');
const EventEmitter = require('events');
const input = require('minimist')(process.argv.slice(2));
const livereload = require('gulp-livereload');
const gulpif = require('gulp-if');
const config = require('./config');

const SassProcessor = require('./processor/SassProcessor');
const LessProcessor = require('./processor/LessProcessor');
const JsProcessor = require('./processor/JsProcessor');
const BabelProcessor = require('./processor/BabelProcessor');
const CssProcessor = require("./processor/CssProcessor");
const TsProcessor = require("./processor/TsProcessor");

const watches = [];

class Fusion {
  static get watches() { return watches }
  static get public() { return config.public }

  static setPublicPath(val) {
    config.public = val;
  }

  static js(source, dest = null, options = {}) {
    return new JsProcessor(source, options).process(dest);
  }

  static babel(source, dest = null, options = {}) {
    return new BabelProcessor(source, options).process(dest);
  }

  static ts(source, dest = null, options = {}) {
    return new TsProcessor(source, options).process(dest);
  }

  static css(source, dest = null, options = {}) {
    return new CssProcessor(source, options).process(dest);
  }

  static less(source, dest = null, options = {}) {
    return new LessProcessor(source, options).process(dest);
  }

  static sass(source, dest = null, options = {}) {
    return new SassProcessor(source, options).process(dest);
  }

  static copy(source, dest, options = {}) {
    return gulp.src(source)
      .pipe(gulp.dest(dest))
      .pipe(livereload());
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
    if (arguments.length === 1) {
      if (!this.watches[gulp.currentTask.name] && input['watch']) {
        if (input['livereload']) {
          livereload.listen();
        }

        this.watches[gulp.currentTask.name] = glob;
        return gulp.watch(glob, [gulp.currentTask.name]);
      }

      return new EventEmitter();
    }

    return gulp.watch(glob, opt, fn);
  }

  static disableNotification() {
    config.notify = false;
  }

  static enableNotification() {
    config.notify = true;
  }

  static run(defaultTasks = ['main']) {
    gulp.task('default', defaultTasks);
  }
}

module.exports = Fusion;
