/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

export async function cssTask(source, dest, options = {}) {
  const CssProcessor = (await import('./processors/css-processor.js')).default;

  return new CssProcessor(source, options).process(dest);
}

export async function sassTask(source, dest, options = {}) {
  const SassProcessor = (await import('./processors/sass-processor.js')).default;

  return new SassProcessor(source, options).process(dest);
}

export async function jsTask(source, dest, options = {}) {
  const JsProcessor = (await import('./processors/js-processor.js')).default;

  return new JsProcessor(source, options).process(dest);
}

export async function babelTask(source, dest, options = {}) {
  const BabelProcessor = (await import('./processors/babel-processor.js')).default;

  return new BabelProcessor(source, options).process(dest);
}

export async function tsTask(source, dest, options = {}) {
  const TsProcessor = (await import('./processors/ts-processor.js')).default;

  return new TsProcessor(source, options).process(dest);
}

export async function webpackTask(source, dest, options = {}) {
  const WebpackProcessor = (await import('./processors/webpack-processor.js')).default;

  return new WebpackProcessor(source, options).process(dest);
}

export async function vueTask(source, dest, options = {}) {
  const VueProcessor = (await import('./processors/vue-processor.js')).default;

  return new VueProcessor(source, options).process(dest);
}
