/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const Fusion = require('./Fusion');
const config = require('./config');
const input = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const gulpHelp = require('gulp-help')(gulp);

gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
  this.currentTask = task;
  this.__runTask(task);
};

// Livereload
config.livereload.port = input['port'] || null;

module.exports = Fusion;
