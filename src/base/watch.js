/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */
import gulp from 'gulp';
import { cliInput } from '../utilities/cli.js';
import EventEmitter from 'events';

const FUNC_REGEX = /at\s{1}(?<func>\w+)\s{1}\([\W\w]+?\)/g;

const watches = [];
let startWatching = false;

export function watch(glob, opt, fn) {
  if (arguments.length === 1) {
    const currentTask = findCurrentTask(new Error());
    
    if (!startWatching && cliInput['watch']) {
      watches.push({
        task: currentTask,
        glob: glob
      });
    }

    console.log(watches);

    return new EventEmitter();
  }

  return gulp.watch(glob, opt, fn);
}

/**
 * @param {Error} e
 * @returns {string}
 */
function findCurrentTask(e) {
  // Drop first
  FUNC_REGEX.exec(e.stack);

  // Get second
  const match = FUNC_REGEX.exec(e.stack)
  return match[1];
}
