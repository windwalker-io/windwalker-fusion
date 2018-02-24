/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const config = require('./config');
const debounce = require('lodash.debounce');
const EventEmitter = require('events');
const gulp = require('gulp');
const input = require('minimist')(process.argv.slice(2));
const livereload = require('gulp-livereload');
const notifier = require('node-notifier');

const SassProcessor = require('./processor/SassProcessor');
const LessProcessor = require('./processor/LessProcessor');
const JsProcessor = require('./processor/JsProcessor');
const BabelProcessor = require('./processor/BabelProcessor');
const CssProcessor = require("./processor/CssProcessor");
const TsProcessor = require("./processor/TsProcessor");

const watches = [];
let startWatching = false;
let promises = [];
let notify;

class Fusion {
  static get watches() { return watches }
  static get promises() { return promises }
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

  static typeScript(source, dest = null, options = {}) {
    return this.ts(source, dest, options);
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
    return Utilities.postStream(
      Utilities.prepareStream(gulp.src(source))
        .pipe(gulp.dest(dest))
    );
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

      if (!startWatching && input['watch']) {
        this.watches.push({
          task: gulp.currentTask.name,
          glob: glob
        });
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

  static default(defaultTasks = ['main']) {
    gulp.task('default', defaultTasks);
  }

  static postTask() {
    if (!notify) {
      notify = debounce(() => {
        if (config.notifySuccess) {
          notifier.notify({
            title: 'Windwalker Fusion',
            message: 'Build success',
            icon: __dirname + '/../resources/img/windwalker.png',
          });
        }

        config.notifySuccess = true;

        if (startWatching === false) {
          startWatching = true;

          if (input['livereload']) {
            livereload.listen();
          }

          for (let watch of this.watches) {
            gulp.watch(watch.glob, [watch.task]);
          }
        }
      }, 300);
    }

    return notify;
  }
}

module.exports = Fusion;
