/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

export function babelBasicOptions() {
  const options = new BabelOptions();

  options.addPreset(
    '@babel/preset-env',
    {
      targets: options.target || 'last 3 version, safari 5, ie 10, not dead'
    }
  );
  options.addPlugin('@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true });
  options.addPlugin('@babel/plugin-proposal-class-properties', { loose: true });
  options.addPlugin('@babel/plugin-proposal-optional-chaining');

  return options;
}

export function babelEmptyOptions() {
  return new BabelOptions();
}

class BabelOptions {
  presets = [];

  plugins = [];

  reset() {
    this.presets = [];
    this.plugins = [];
  }

  addPlugin(plugin, options = null) {
    if (typeof plugin === 'string' && options != null) {
      plugin = [plugin, options];
    }

    this.plugins.push(plugin);
    return this;
  }

  addPreset(preset, options = null) {
    if (typeof preset === 'string' && options != null) {
      preset = [preset, options];
    }

    this.presets.push(preset);
    return this;
  }

  get() {
    return {
      presets: this.presets,
      plugins: this.plugins
    };
  }
}
