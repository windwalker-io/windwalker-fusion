// Type definitions for Gulp 4.0
// Project: http://gulpjs.com
// Definitions by: Drew Noakes <https://drewnoakes.com>
//                 Juan Arroyave <http://jarroyave.co>
//                 Giedrius Grabauskas <https://github.com/GiedriusGrabauskas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { TransformOptions } from '@babel/core';
import { WatchMethod } from 'gulp';
import { BabelOptions } from './utilities/babel';

declare namespace Fusion {
  export type taskProcessor<T> = (source: string | Array<string>,
                                  dest?: string | Array<string>,
                                  options?: T) => NodeJS.ReadWriteStream;

  export interface Processor<O> {
    new(source: string | Array<string>, options?: O);

    process(dest?: string | Array<string>);
  }

  export interface CssOptions {
    autoprefixer?: boolean;
    minify?: symbol;
    rebase?: true;
  }

  export interface CssPreProcessorOptions extends CssOptions {
    sourcemap?: boolean;
  }

  export interface JsOptions {
    sourcemap?: boolean;
    minify?: symbol;
  }

  export interface BabelOptions extends JsOptions {
    babel?: BabelOptions;
  }

  export const watch: WatchMethod;
  export const css: taskProcessor<CssOptions>;
  export const cssProcessor: Processor<CssOptions>;
  export const sass: taskProcessor<CssPreProcessorOptions>;
  export const sassProcessor: Processor<CssPreProcessorOptions>;
  export const js: taskProcessor<JsOptions>;
  export const jsProcessor: Processor<JsOptions>;
  export const babel: taskProcessor<BabelOptions>;
  export const babelProcessor: Processor<BabelOptions>;

}

export = Fusion;

// declare const Fusion: Fusion;
// export = Fusion;
