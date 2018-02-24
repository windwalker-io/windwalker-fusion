/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const JsProcessor = require('./JsProcessor');
const babel = require('gulp-babel');
const merge = require('lodash.merge');

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge({}, {
      sourcemap: true,
      minify: true,
      presets: ['es2015', 'stage-2']
    }, options);
  }

  compile() {
    this.pipe(babel({
      presets: this.options.presets
    }));
  }
}

module.exports = BabelProcessor;
