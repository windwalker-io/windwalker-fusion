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
const filter = require('gulp-filter');

class BabelProcessor extends JsProcessor {
  prepareOptions(options) {
    return merge(super.prepareOptions(options), {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'last 3 version, safari 5, ie 10, not dead'
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
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
