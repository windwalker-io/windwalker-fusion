/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import gulp from 'gulp';
import del from 'del';
import { watch } from '../src/index.js';
const { parallel, series, src, dest, watch: gulpWatch } = gulp;

css.description = 'Build CSS';
css.flags = {
  '--prod': 'Build prod'
};
function css(cb) {
  watch(['./src/css/**/*.css']);

  src('./src/css/**/*.css')
    .pipe(dest('./dest/css/'));

  cb();
}

export function clean() {
  return del(
    [
      './dest/**/*',
      '!.gitkeep'
    ]
  );
}


export default css;


