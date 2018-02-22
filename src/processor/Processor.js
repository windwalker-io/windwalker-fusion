/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const gulp = require('gulp');

class Processor {
  constructor(source, options = {}) {
    this.source = source;
    this.options = this.prepareOptions(options);

    if (typeof source === 'string') {
      source = [source];
    }

    this.stream = gulp.src(source);
  }

  process(dest = null) {
    throw new Error('Please extends this method.');
  }

  pipe(handler) {
    this.stream = this.stream.pipe(handler);

    return this;
  }

  prepareOptions(options) {
    return options;
  }
}

module.exports = Processor;
