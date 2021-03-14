/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */
import gulp from 'gulp';
import { cliInput } from '../utilities/cli.js';
import EventEmitter from 'events';

const watches = [];
let startWatching = false;

export function watch(glob, opt, fn) {
  if (arguments.length === 1) {

    if (!startWatching && cliInput['watch']) {
      watches.push({
        task: gulp.currentTask.name,
        glob: glob
      });
    }

    return new EventEmitter();
  }

  return gulp.watch(glob, opt, fn);
}
