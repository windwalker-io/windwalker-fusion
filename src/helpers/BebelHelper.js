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
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }
}

module.exports = BabelHelper;