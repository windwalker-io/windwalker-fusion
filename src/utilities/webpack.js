/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import { merge } from 'lodash-es';
import { babelBasicOptions } from './babel.js';

export function webpackBasicConfig() {
  return {
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
            options: babelBasicOptions().get()
          }, 'webpack-comment-remover-loader']
        }
      ]
    },
    plugins: []
  };
}

export async function webpackVueConfig() {
  const VueLoaderPlugin = await getVueLoader();

  return merge(webpackBasicConfig(), {
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
          test: /\.cssProcessor$/,
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
            options: babelBasicOptions()
          }]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  });
}

export async function getVueLoader() {
  try {
    const { VueLoaderPlugin } = (await import('vue-loader'));

    return VueLoaderPlugin;
  } catch (e) {
    const chalk = (await import('chalk')).default;
    console.error(chalk.red(e.message));
    console.error(`\nPlease run "${chalk.yellow('yarn add vue vue-loader vue-style-loader vue-template-compiler css-loader sass-loader')}" first.\n`);
    process.exit(255);
  }
}
