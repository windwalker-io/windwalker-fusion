/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import gulp from 'gulp';
import del from 'del';
import { dest, src, watch, series, parallel } from '../src/index.js';

css.description = 'Build CSS';
css.flags = {
  '--prod': 'Build prod'
};

async function css(cb) {
  watch(['./src/css/**/*.css']);

  console.log('Hello');

  src('./src/css/**/*.css')
    .pipe(dest('./dest/css/'));

  cb();
}

export const wa = async () => [
    watch('./src/css/**/*.css'),
    src('./src/css/**/*.css').pipe(dest('./dest/css/'))
];

// export function css3() {
//   return watch(
//     [
//       '',
//       '',
//       ''
//     ],
//     [
//       vue(),
//       vue(),
//       vue()
//     ]
//   )
// }
//
// export const g = function () {
//
// } |> watch;
//
// export const css = async cb => {
//   cb();
//   cb = await watch(['./src/css/**/*.css']);
//
//   console.log('Hello');
//
//   src('./src/css/**/*.css')
//     .pipe(dest('./dest/css/'));
//
//   cb();
// };
//
// export const css2 = {
//   func() {
//
//   }
// }.func;

export function clean() {
  return del(
    [
      './dest/**/*',
      '!.gitkeep'
    ]
  );
}

export const all = series(clean, css);

export default css;


