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
  console.error('Please run "yarn add @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/preset-env" first.');
  process.exit(255);
}

const merge = require('lodash.merge');
const Utilities = require("../Utilities");
const BabelHelper = require('../helpers/BebelHelper');

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    options = Utilities.merge({
      babel: BabelHelper.basicOptions()
    }, super.prepareOptions(options));

    switch (options.module) {
      case 'umd':
        options.babel.plugins.push('@babel/plugin-transform-modules-umd');
        break;

      case 'amd':
        options.babel.plugins.push('@babel/plugin-transform-modules-amd');
        break;

      case 'systemjs':
      case true:
        options.babel.plugins.push('@babel/plugin-transform-modules-systemjs');
        break;
    }

    return options;
  }

  compile(dest, options) {
    this.pipe(
      babel(options.babel).on('error', Utilities.logError(e => console.log(e.codeFrame)))
    );
  }
}

module.exports = BabelProcessor;
