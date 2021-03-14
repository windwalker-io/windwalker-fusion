/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const CssPreProcessor = require('./CssPreProcessor');
const sass = require('gulp-sass');

class SassProcessor extends CssPreProcessor {
  compile() {
    this.pipe(
      sass({style: 'expanded'})
        .on('error', sass.logError)
    );
  }
}

module.exports = SassProcessor;
