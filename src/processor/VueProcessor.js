/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const WebpackProcessor = require('./WebpackProcessor');

try {
  var { VueLoaderPlugin } = require('vue-loader');
} catch (e) {
  console.error(e);
  console.error('Please run "yarn add vue vue-loader vue-style-loader vue-template-compiler css-loader sass-loader " first.');
  process.exit(255);
}

const merge = require('lodash.merge');

class VueProcessor extends WebpackProcessor {
  getWebpackConfig() {
    return merge(super.getWebpackConfig(), {
      devtool: 'eval-source-map',
      // ensure we are using the version of Vue that supports templates
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
      },
      // vue: {
      //   buble: {
      //     objectAssign: 'Object.assign'
      //   }
      // },
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
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
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
