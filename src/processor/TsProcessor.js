/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const merge = require('lodash.merge');
const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');

const JsProcessor = require('./JsProcessor');

class TsProcessor extends JsProcessor {
  prepareOptions(options) {
    options = merge(super.prepareOptions(options), {
      ts: {
        declaration: false,
        target: 'es6'
      }
    }, options);

    if (options.ts.target.toLocaleLowerCase() === 'es5') {
      options.ts.lib = options.ts.lib || ['es6', 'es7', 'dom', 'DOM.Iterable'];
    }

    return options;
  }

  compile(dest, options) {
    const config = merge({}, options.ts);

    this.pipe(ts(config));
  }

  doProcess(dest, options) {
    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (dest.merge) {
      // this.pipe(concat(dest.file));

      options.ts.outFile = dest.file;
      options.ts.module = options.ts.module || 'amd';
    }

    this.compile(dest, options);

    if (options.sourcemap) {
      this.pipe(sourcemaps.write('.'));
    }

    this.pipe(gulp.dest(dest.path));

    this
      .pipe(filter('**/*.js'));

    if (options.minify) {
      this.pipe(rename({suffix: '.min'}))
        .pipe(uglify().on('error', e => console.error(e)));
    }

    this.pipe(gulp.dest(dest.path));
  }
}

module.exports = TsProcessor;
