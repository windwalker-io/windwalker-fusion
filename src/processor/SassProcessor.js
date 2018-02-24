/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const CssPreProcessor = require('./CssPreProcessor');
const sass = require('gulp-sass');

class SassProcessor extends CssPreProcessor {
  compile() {
    this.pipe(sass({ style: 'expanded' }));
  }
}

module.exports = SassProcessor;
