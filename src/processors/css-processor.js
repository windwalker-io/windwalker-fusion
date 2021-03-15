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

export default function cssProcessor(source, dest, options = {}) {
  return new CssProcessor(source).process(dest, options);
}

export class CssProcessor extends Processor {
  static defaultOptions = {
    autoprefixer: true,
    minify: true,
    rebase: true
  };

  doProcess(dest, options = {}) {
    this.pipeIf(options.rebase, () => rewriteCSS({ destination: dest.path }))
      .pipeIf(dest.merge, () => concat(dest.file))
      .pipeIf(
        options.autoprefixer,
        () => autoprefixer(
          'last 3 version',
          'safari 5',
          'ie 9-11'
        ).on('error', logError())
      )
      .pipe(toDest(dest.path))
      .pipe(filter('**/*.cssProcessor'))
      .pipe(rename({ suffix: '.min' }))
      .pipeIf(options.minify, () => cleanCSS({ compatibility: 'ie11' }))
      .pipe(toDest(dest.path));
  }
}
