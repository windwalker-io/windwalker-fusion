/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import del from 'del';
import {
  babel as babelTask,
  css as cssTask,
  dest,
  js as jsTask,
  MinifyOption,
  series,
  src,
  watch
} from '../src/index.js';
import { babelEmptyOptions, BabelOptions } from '../src/utilities/babel.js';

css.description = 'Build CSS';
export default async function css() {
  watch(['./src/css/**/*.css']);

  cssTask('./src/css/**/*.css', './dest/css/moved/');
  // sass('./src/scss/**/*.scss', './dest/css/scss/');
}

export async function js() {
  watch(['./src/css/**/*.css']);

  jsTask('./src/js/**/*.js', './dest/js/simple/');
  jsTask('./src/js/**/*.js', './dest/js/simple/merged.js');
  jsTask(
    ['./src/js/foo.js', './src/js/bar.js'],
    './dest/js/simple/merged2.js'
  );
  // sass('./src/scss/**/*.scss', './dest/css/scss/');
}

export async function babel() {
  watch(['./src/css/**/*.css']);

  babelTask('./src/js/**/*.js', './dest/js/babel/', { babel: new BabelOptions() });
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


