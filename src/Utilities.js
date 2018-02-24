/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const path = require('path');
const config = require('./config');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const gutil = require('gulp-util');
const chalk = require('chalk');
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

  static prepareStream(stream) {
    // function swallowError (error) {
    //   console.log('ERROR', error.toString());
    //
    //   this.emit('end');
    // }
    //
    // stream = stream.on('error', e => console.error(e.toString()));

    // stream = stream.pipe(plumber());

    return stream;
  }

  static postStream(stream) {
    stream = stream.pipe(livereload());

    return stream;
  }

  static logError(handler = null) {
    return function(error) {
      console.error(error.toString());

      if (handler) {
        handler(error);
      }

      this.emit('end');
    }
  }

  static showError(name, message) {
    process.stderr.write(new gutil.PluginError(name, message).toString() + '\n');
  }

  static showSourceCode(file, line, column, color = true) {
    let source = fs.readFileSync(file, 'utf-8');

    let lines = source.split(/\r?\n/);
    let start = Math.max(line - 3, 0);
    let end = Math.min(line + 2, lines.length);

    let maxWidth = String(end).length;

    function mark(text) {
      if (color && chalk.red) {
        return chalk.red.bold(text);
      } else {
        return text;
      }
    }
    function aside(text) {
      if (color && chalk.gray) {
        return chalk.gray(text);
      } else {
        return text;
      }
    }

    return lines.slice(start, end).map(function (lineText, index) {
      let number = start + 1 + index;

      let gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
      if (number === line) {
        let spacing = aside(gutter.replace(/\d/g, ' ')) + lineText.slice(0, column - 1).replace(/[^\t]/g, ' ');
        return mark('>') + aside(gutter) + lineText + '\n ' + spacing + mark('^');
      } else {
        return ' ' + aside(gutter) + lineText;
      }
    }).join('\n');
  };
}

module.exports = Utilities;
