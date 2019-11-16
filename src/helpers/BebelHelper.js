/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

class BabelHelper {
  static basicOptions() {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'last 3 version, safari 5, ie 10, not dead'
          }
        ]
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ]
    }
  }
}

module.exports = BabelHelper;
