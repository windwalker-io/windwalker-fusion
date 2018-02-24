/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const gulp = require('gulp');
const Utilities = require("../Utilities");

class Processor {
  constructor(source, options = {}) {
    this.source = source;
    this.options = this.prepareOptions(options);

    if (typeof source === 'string') {
      source = [source];
    }

    this.stream = this.createStream(source, this.options);
  }

  createStream(source, options) {
    return gulp.src(source);
  }

  process(dest = null) {
    const options = this.options;
    dest = Utilities.extractDest(dest);

    this.doProcess(dest, options);

    return Utilities.postStream(this.stream);
  }

  /**
   * Do process.
   *
   * @param dest    {{merge: string, file: string, path: string, samePosition: boolean}}
   * @param options {object}
   */
  doProcess(dest, options) {
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
