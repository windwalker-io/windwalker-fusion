/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import rewriteCSS from 'gulp-rewrite-css';
import { dest as toDest } from '../base/base.js';
import { logError } from '../utilities/error.js';
import Processor from './processor.js';

export class CssProcessor extends Processor {
  doProcess(dest, options = {}) {
    if (options.rebase) {
      this.pipe(rewriteCSS({ destination: dest.path }));
    }

    if (dest.merge) {
      this.pipe(concat(dest.file));
    }

    if (options.autoprefixer) {
      this.pipe(
        autoprefixer('last 3 version', 'safari 5', 'ie 9-11').on('error', logError())
      );
    }

    this.pipe(toDest(dest.path))
      .pipe(filter('**/*.css'))
      .pipe(rename({ suffix: '.min' }));

    if (options.minify) {
      this.pipe(cleanCSS({ compatibility: 'ie11' }));
    }

    return this.pipe(toDest(dest.path));
  }
}

export default new CssProcessor();
