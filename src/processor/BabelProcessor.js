/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const JsProcessor = require('./JsProcessor');
const babel = require('gulp-babel');

class BabelProcessor extends JsProcessor {

  compile() {
    this.pipe(babel({
      presets: this.options.presets
    }));
  }

  prepareOptions(options) {
    return Object.assign({}, {
      sourcemap: true,
      minify: true,
      presets: ['es2015', 'stage-2']
    }, options);
  }
}

module.exports = BabelProcessor;
