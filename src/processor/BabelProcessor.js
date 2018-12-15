/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');
const babel = require('gulp-babel');
const merge = require('lodash.merge');
const Utilities = require("../Utilities");
const BebelHelper = require("../helpers/BebelHelper");

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge(super.prepareOptions(options), {
      babel: BabelHelper.basicOptions()
    }, options);
  }

  compile(dest, options) {
    this.pipe(
      babel({
        presets: options.presets,
        plugins: options.plugins,
      }).on('error', Utilities.logError(e => console.log(e.codeFrame)))
    );
  }
}

module.exports = BabelProcessor;
