/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import { webpackVueConfig } from '../utilities/webpack.js';
import WebpackProcessor from './webpack-processor.js';

export default class VueProcessor extends WebpackProcessor {
  async prepareOptions(options) {
    options = await super.prepareOptions(options);

    if (options.excludeVue) {
      options.webpack.externals = { vue: 'Vue' };
    }

    return options;
  }

  async getWebpackConfig() {
    return await webpackVueConfig();
  }
}
