/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const CssPreProcessor = require('./CssPreProcessor');
const less = require('gulp-less');
const Utilities = require("../Utilities");

class LessProcessor extends CssPreProcessor {
  compile() {
    this.pipe(
      less().on('error', this.logError)
    );
  }

  logError(error) {
    console.error(error.toString());
    console.log(Utilities.showSourceCode(error.filename, error.line, error.column));

    this.emit('end');
  }
}

module.exports = LessProcessor;
