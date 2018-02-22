/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

const path = require('path');
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
}

module.exports = Utilities;
