/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const config = require('./config');
const gulp = require('gulp');
const input = require('minimist')(process.argv.slice(2));

const watches = [];
let startWatching = false;
let promises = [];
let notify;

class Fusion {
  static get watches() {
    return watches
  }

  static get promises() {
    return promises
  }

  static get public() {
    return config.public
  }

  static setPublicPath(val) {
    config.public = val;
  }

  static js(source, dest = null, options = {}) {
    const JsProcessor = require('./processor/JsProcessor');

    return new JsProcessor(source, options).process(dest);
  }

  static babel(source, dest = null, options = {}) {
    const BabelProcessor = require('./processor/BabelProcessor');

    return new BabelProcessor(source, options).process(dest);
  }

  static webpack(source, dest = null, options = {}) {
    const WebpackProcessor = require('./processor/WebpackProcessor');

    return new WebpackProcessor(source, options).process(dest);
  }

  static vue(source, dest = null, options = {}) {
    const VueProcessor = require('./processor/VueProcessor');

    return new VueProcessor(source, options).process(dest);
  }

  static ts(source, dest = null, options = {}) {
    const TsProcessor = require("./processor/TsProcessor");

    return new TsProcessor(source, options).process(dest);
  }

  static typeScript(source, dest = null, options = {}) {
    return this.ts(source, dest, options);
  }

  static css(source, dest = null, options = {}) {
    const CssProcessor = require("./processor/CssProcessor");

    return new CssProcessor(source, options).process(dest);
  }

  static less(source, dest = null, options = {}) {
    const LessProcessor = require('./processor/LessProcessor');

    return new LessProcessor(source, options).process(dest);
  }

  static sass(source, dest = null, options = {}) {
    const SassProcessor = require('./processor/SassProcessor');

    return new SassProcessor(source, options).process(dest);
  }

  static copy(source, dest, options = {}) {
    const Utilities = require("./Utilities");
    let stream = Utilities.prepareStream(gulp.src(source));

    dest = Utilities.extractDest(dest);

    if (dest.merge) {
      const rename = require('gulp-rename');
      const path = require('path');

      stream = stream.pipe(rename(path.basename(dest.file)));
    }

    stream = stream.pipe(gulp.dest(dest.path).on('error', e => console.error(e)));

    return Utilities.postStream(stream);
  }

  static livereload(source, options = {}) {
    const livereload = require('gulp-livereload');

    return gulp.src(source).pipe(livereload(options));
  }

  static reload(file = null) {
    const livereload = require('gulp-livereload');

    livereload.reload(file);
    return this;
  }

  static src(source, options) {
    return gulp.src(source, options);
  }

  static dest(path, options) {
    return gulp.dest(path, options);
  }

  static through(callback) {
    const through2 = require('through2');

    return through2.obj(callback);
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

      const EventEmitter = require('events');

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
    const debounce = require('lodash.debounce');
    const notifier = require('node-notifier');

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
            const livereload = require('gulp-livereload');

            livereload.listen(config.livereload);
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
