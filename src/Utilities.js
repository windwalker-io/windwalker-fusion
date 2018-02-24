/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const path = require('path');
const config = require('./config');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const fs = require('fs');

class Utilities {
  static extractDest(dest) {
    let merge = dest !== null && (dest.slice(-1) !== '/' || !fs.lstatSync(dest).isDirectory());
    let destFile;
    let destPath;

    if (merge) {
      destFile = path.basename(dest);
      destPath = path.dirname(dest);
    } else if (dest === null) {
      destPath = file => file.base;
    } else {
      destPath = dest;
    }

    return {
      merge: merge,
      file: destFile,
      path: destPath
    }
  }

  static postStream(stream) {
    stream = stream.pipe(livereload());

    if (config.notify) {
      stream.pipe(notify({
        title: 'Build success.',
        message: 'File: <%= file.relative %>',
        icon: __dirname + '/../resources/img/windwalker.png'
      }));
    }

    return stream;
  }
}

module.exports = Utilities;
