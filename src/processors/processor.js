/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import { src } from '../base/base.js';
import { postStream, prepareStream } from '../lifecycles.js';
import { extractDest, merge } from '../utilities/utilities.js';

export default class Processor {
  static defaultOptions = {};

  stream;
  source;
  options = {};

  constructor(source, options = {}) {
    this.source = source;
    this.options = this.preprocessOptions(options);

    if (typeof source === 'string') {
      source = [source];
    }

    this.stream = this.preprocessSourceToStream(source, this.options);
  }

  preprocessOptions(options = {}) {
    return merge(
      {},
      this.constructor.defaultOptions || {},
      options
    );
  }

  preprocessSourceToStream(source, options = {}) {
    if (typeof source === 'string') {
      source = [source];
    }

    return prepareStream(this.createStream(source, options));
  }

  createStream(source, options = {}) {
    return src(source, { follow: true });
  }

  process(dest) {
    dest = extractDest(dest);

    this.doProcess(dest, this.options);

    return postStream(this.stream);
  }

  /**
   * Do process.
   * @param dest    {{merge: string, file: string, path: string, samePosition: boolean}}
   * @param options {object}
   */
  doProcess(dest, options = {}) {
    throw new Error('Please extends this method.');
  }

  /**
   *
   * @param handler
   * @returns {this}
   */
  pipe(handler) {
    this.stream = this.stream.pipe(handler);

    return this;
  }

  pipeIf(bool, callback) {
    if (typeof callback !== 'function') {
      throw new Error('pipeIf() needs 2nd argument is function.');
    }

    if (bool) {
      this.pipe(callback());
    }

    return this;
  }

  static setDefaultOptions(options) {
    this.defaultOptions = options;
  }
}
