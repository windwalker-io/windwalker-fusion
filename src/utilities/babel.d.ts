// Type definitions for Gulp 4.0
// Project: http://gulpjs.com
// Definitions by: Drew Noakes <https://drewnoakes.com>
//                 Juan Arroyave <http://jarroyave.co>
//                 Giedrius Grabauskas <https://github.com/GiedriusGrabauskas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { TransformOptions } from '@babel/core';
import { WatchMethod } from 'gulp';

declare namespace FusionUtilitiesBabel {
  // export interface BabelOptionsBuilder {
  //   options: TransformOptions;
  //
  //   new(options?: TransformOptions);
  //
  //   get(): TransformOptions;
  //
  //   addPreset(plugin: string | Array<any> | object, options?: object): this;
  //
  //   addPlugin(plugin: string | Array<any> | object, options?: object): this;
  // }

  export class BabelOptions {
    options: TransformOptions;

    constructor(options?: TransformOptions);

    get(): TransformOptions;

    addPreset(plugin: string | Array<any> | object, options?: object): this;

    addPlugin(plugin: string | Array<any> | object, options?: object): this;
  }

  export function babelEmptyOptions(): BabelOptions;
  export function babelBasicOptions(): BabelOptions;
}

export = FusionUtilitiesBabel;

// declare const Fusion: Fusion;
// export = Fusion;
