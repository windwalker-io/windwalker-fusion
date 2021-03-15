/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import del from 'del';
import { dest, series, src, watch, css as cssTask, sass } from '../src/index.js';

css.description = 'Build CSS';
export default async function css() {
  watch(['./src/cssProcessor/**/*.cssProcessor']);

  cssTask('./src/cssProcessor/**/*.cssProcessor', './dest/css/moved/');
  sass('./src/scss/**/*.scss', './dest/css/scss/')
}

export const wa = async () => [
  watch('./src/cssProcessor/**/*.cssProcessor'),
  src('./src/cssProcessor/**/*.cssProcessor').pipe(dest('./dest/css/'))
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
// export const cssProcessor = async cb => {
//   cb();
//   cb = await watch(['./src/cssProcessor/**/*.cssProcessor']);
//
//   console.log('Hello');
//
//   src('./src/cssProcessor/**/*.cssProcessor')
//     .pipe(dest('./dest/cssProcessor/'));
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


