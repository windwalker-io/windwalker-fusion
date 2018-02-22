/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const CssProcessor = require('./CssProcessor');
const sass = require('gulp-sass');

class SassProcessor extends CssProcessor {
  compile() {
    this.pipe(sass({ style: 'expanded' }));
  }
}

module.exports = SassProcessor;
