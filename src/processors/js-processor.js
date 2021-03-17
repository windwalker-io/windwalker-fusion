/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */
import concat from 'gulp-concat';
import eol from 'gulp-eol';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import stripComment from 'gulp-strip-comments';
import { dest as toDest, src } from '../base/base.js';
import { merge } from '../utilities/utilities.js';
import Processor from './processor.js';

// const uglify = gu.default;

export default function js(source, dest, options = {}) {
  return new JsProcessor(source, options).process(dest);
}

export class JsProcessor extends Processor {
  prepareOptions(options = {}) {
    return merge(
      {},
      {
        sourcemap: true,
        minify: true,
        rename: false,
        suffix: null
      },
      options
    );
  }

  // createStream(source, options = {}) {
  //   // if (options.minify) {
  //   //   source.push('!./**/*.min.js');
  //   // }
  //   //
  //   // if (options.suffix) {
  //   //   source.push(`!./**/*${options.suffix}.js`);
  //   //   source.push(`!./**/*${options.suffix}.min.js`);
  //   //
  //   //   options.rename = {suffix: options.suffix};
  //   // }
  //
  //   return src(source);
  // }

  compile(dest, options) {
    //
    return this;
  }

  doProcess(dest, options) {
    this.pipe(eol('\n'))
      .pipeIf(options.sourcemap, () => sourcemaps.init())
      .pipeIf(dest.merge, () => concat(dest.file))
      .compile(dest, options)
      .pipeIf(options.rename, () => rename(options.rename));

    if (dest.merge) {
      this.pipeIf(options.sourcemap, () => sourcemaps.write('.'))
        .pipe(toDest(dest.path));
    } else if (!dest.samePosition || options.rename) {
      this.pipeIf(options.sourcemap, () => sourcemaps.write('.'))
        .pipe(toDest(dest.path));
    }

    // Minify file so we remove source maps
    this.pipe(filter('**/*.js'))
      .pipeIf(options.minify, () => [
        stripComment(),
        terser().on('error', function (e) {
          console.error(e.toString());
          this.emit('end');
        }),
        rename({ suffix: '.min' })
      ])
      .pipe(toDest(dest.path));
  }
}
