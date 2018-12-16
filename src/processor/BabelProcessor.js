/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const JsProcessor = require('./JsProcessor');

try {
  var babel = require('gulp-babel');
} catch (e) {
  console.error(e);
  console.error('Please run "yarn add @babel/core @babel/plugin-proposal-class-properties @babel/preset-env" first.');
  process.exit(255);
}

const merge = require('lodash.merge');
const Utilities = require("../Utilities");
const BabelHelper = require('../helpers/BebelHelper');

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge(super.prepareOptions(options), {
      babel: BabelHelper.basicOptions()
    }, options);
  }

  compile(dest, options) {
    this.pipe(
      babel(options.babel).on('error', Utilities.logError(e => console.log(e.codeFrame)))
    );
  }
}

module.exports = BabelProcessor;
