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
const merge = require('lodash.merge');

class VueProcessor extends WebpackProcessor {
  prepareOptions(options) {
    options = Utilities.merge(
      {},
      this.constructor.defaultOptions,
      options
    );

    if (!options.override) {
      options.webpack = Utilities.merge(
        this.getWebpackConfig(),
        options.webpack
      );
    }

    if (options.excludeVue) {
      options.webpack.externals = { vue: 'Vue' };
    }

    // Remove webpack-comment-remover-loader
    // options.webpack.module.rules.forEach((rule) => {
    //   if (rule.use && rule.use[1] === 'webpack-comment-remover-loader') {
    //     rule.use.splice(1, 1);
    //   }
    // });

    return options;
  }

  getWebpackConfig() {
    return merge(super.getWebpackConfig(), {
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
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
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
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
              loader: 'babel-loader',
              options: BebelHelper.basicOptions()
            }]
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
