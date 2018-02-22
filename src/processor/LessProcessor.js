/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const CssProcessor = require('./CssProcessor');
const less = require('gulp-less');

class LessProcessor extends CssProcessor {
  compile() {
    this.pipe(less());
  }
}

module.exports = LessProcessor;
