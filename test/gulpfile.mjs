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
  ts as tsTask,
  MinifyOption,
  series,
  src,
  watch,
  webpack as webpackTask,
  vue as vueTask,
  sass
} from '../src/index.js';
import { babelEmptyOptions, BabelOptions } from '../src/utilities/babel.js';

css.description = 'Build CSS';
export default async function css() {
  watch(['./src/css/**/*.css']);

  cssTask('./src/css/**/*.css', './dest/css/moved/');
  cssTask('./src/css/**/*.css', './dest/css/renamed.css');
  sass('./src/scss/**/*.scss', './dest/css/scss/');
}

export async function js() {
  watch(['./src/js/**/*.css']);

  jsTask('./src/js/**/*.js', './dest/js/simple/');
  jsTask('./src/js/**/*.js', './dest/js/simple/merged.js', { minify: 'same_file' });
  jsTask(
    ['./src/js/foo.js', './src/js/bar.js'],
    './dest/js/simple/merged2.js'
  );
  // sass('./src/scss/**/*.scss', './dest/css/scss/');
}

export async function babel() {
  watch(['./src/js/**/*.css']);

  babelTask('./src/js/**/*.js', './dest/js/babel/', { module: 'systemjs'});
}

export async function webpack() {
  watch(['./src/webpack/**/*.js']);

  webpackTask('./src/webpack/index.js', './dest/webpack/webpack-dest.js');
}

export async function vue() {
  watch(['./src/vue/**/*.js']);

  vueTask('./src/vue/index.js', './dest/vue/vue-dest.js');
}

export async function ts() {
  watch(['./src/ts/**/*.css']);

  tsTask('./src/ts/**/*.ts', './dest/ts/', { ts: { target: 'es6' }});
}

export const wa = async () => [
  watch('./src/css/**/*.css'),
  src('./src/css/**/*.css').pipe(dest('./dest/css/'))
];

export function clean() {
  return del(
    [
      './dest/**/*',
      '!.gitkeep'
    ]
  );
}

export const all = series(clean, css);


