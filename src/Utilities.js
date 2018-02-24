/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const path = require('path');
const config = require('./config');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const debounce = require('lodash.debounce');
const fs = require('fs');

class Utilities {
  static extractDest(dest) {
    let merge = dest !== null && (dest.slice(-1) !== '/' || !fs.lstatSync(dest).isDirectory());
    let destFile;
    let destPath;
    let samePosition = false;

    if (merge) {
      destFile = path.basename(dest);
      destPath = path.dirname(dest);
    } else if (dest === null) {
      destPath = file => file.base;
      samePosition = true;
    } else {
      destPath = dest;
    }

    return {
      merge,
      samePosition,
      file: destFile,
      path: destPath
    }
  }

  static postStream(stream) {
    stream = stream.pipe(livereload());
    return stream;
  }
}

module.exports = Utilities;
