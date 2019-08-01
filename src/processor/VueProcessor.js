/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const WebpackProcessor = require('./WebpackProcessor');
const BebelHelper = require('../helpers/BebelHelper');

try {
  var { VueLoaderPlugin } = require('vue-loader');
} catch (e) {
  const chalk = require('chalk');
  console.error(e);
  console.error(`\nPlease run "${chalk.yellow('yarn add vue vue-loader vue-style-loader vue-template-compiler css-loader sass-loader')}" first.\n`);
  process.exit(255);
}

const Utilities = require('../Utilities');

class VueProcessor extends WebpackProcessor {
  prepareOptions(options) {
    options = super.prepareOptions(options);

    if (options.excludeVue) {
      options.webpack.externals = { vue: 'Vue' };
    }

    return options;
  }

  getWebpackConfig() {
    return Utilities.merge(super.getWebpackConfig(), {
      // devtool: 'eval-source-map',
      // ensure we are using the version of Vue that supports templates
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loaders: {
              }
              // other vue-loader options go here
            }
          },
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]'
            }
          }
        ]
      },
      plugins: [
        new VueLoaderPlugin()
      ]
    });
  }
}

module.exports = VueProcessor;
