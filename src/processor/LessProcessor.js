/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const CssPreProcessor = require('./CssPreProcessor');
const less = require('gulp-less');

class LessProcessor extends CssPreProcessor {
  compile() {
    this.pipe(less());
  }
}

module.exports = LessProcessor;
