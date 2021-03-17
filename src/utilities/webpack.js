/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

const config = {
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
    version: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: BebelHelper.basicOptions()
        }, 'webpack-comment-remover-loader']
      }
    ]
  },
  plugins: []
};

export class WebpackOptions {
  options = {
    mode: process.env.NODE_ENV || 'development',
    output: {
      filename: '[name].js',
      sourceMapFilename: '[name].js.map'
    },
    stats: {
      all: false,
      errors: true,
      warnings: true,
      version: false,
    },
  };

  get() {
    return this.options;
  }

  addModuleRule(test, use, options = {}) {

  }
}
