/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const CssPreProcessor = require('./CssPreProcessor');
const less = require('gulp-less');

class LessProcessor extends CssPreProcessor {
  compile() {
    this.pipe(less());
  }
}

module.exports = LessProcessor;
