/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');
const babel = require('gulp-babel');
const merge = require('lodash.merge');

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge(super.prepareOptions(options), {
      presets: ['es2015', 'stage-2']
    }, options);
  }

  compile(dest, options) {
    this.pipe(babel({
      presets: options.presets
    }));
  }
}

module.exports = BabelProcessor;
