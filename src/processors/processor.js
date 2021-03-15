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
  options;

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

  process(dest, options = {}) {
    dest = extractDest(dest);

    const stream = this.doProcess(dest, options);

    return postStream(stream);
  }

  doProcess(dest, options = {}) {
    throw new Error('Please extends this method.');
  }

  pipe(handler) {
    this.stream = this.stream.pipe(handler);

    return this;
  }

  static setDefaultOptions(options) {
    this.defaultOptions = options;
  }
}
