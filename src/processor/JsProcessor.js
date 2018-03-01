/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const Processor = require('./Processor');
const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const merge = require('lodash.merge');

class JsProcessor extends Processor {
  prepareOptions(options) {
    return merge({}, {
      sourcemap: true,
      minify: true,
      rename: false,
      suffix: null
    }, options);
  }

  createStream(source, options) {
    if (options.minify) {
      source.push('!./**/*.min.js');
    }

    if (options.suffix) {
      source.push(`!./**/*${options.suffix}.js`);
      source.push(`!./**/*${options.suffix}.min.js`);

      options.rename = {suffix: options.suffix};
    }

    return gulp.src(source);
  }

  compile(dest, options) {
    //
  }

  doProcess(dest, options) {
    if (options.sourcemap) {
      this.pipe(sourcemaps.init());
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    this.compile(dest, options);

    if (options.rename) {
      this.pipe(rename(options.rename));
    }

    if (dest.merge) {
      if (options.sourcemap) {
        this.pipe(sourcemaps.write('.'));
      }

      this.pipe(gulp.dest(dest.path));
    } else if (!dest.samePosition || options.rename) {
      if (options.sourcemap) {
        this.pipe(sourcemaps.write('.'));
      }

      this.pipe(gulp.dest(dest.path));
    }

    // Minify file so we remove source maps
    this.pipe(filter('**/*.js'));

    if (options.minify) {
      this
        .pipe(uglify().on('error', function(e) {
          console.error(e.toString());
          this.emit('end');
        }))
        .pipe(rename({suffix: '.min'}));
    }

    this.pipe(gulp.dest(dest.path));
  }
}

module.exports = JsProcessor;
