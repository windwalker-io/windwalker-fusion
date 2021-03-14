/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import gulp from 'gulp';
const { parallel, series } = gulp;

export function foo(cb) {
  // place code for your default task here
  cb();
}

export function hello(cb) {

  cb();
}

function minify(cb) {
  // body omitted
  cb();
}


function transpile(cb) {
  // body omitted
  cb();
}

function livereload(cb) {
  // body omitted
  cb();
}

let build;

if (process.env.NODE_ENV === 'production') {
  build = series(transpile, minify);
} else {
  build = series(transpile, livereload);
}

export default build;
