import { WatchMethod } from 'gulp';
import { Settings } from 'gulp-typescript';
import { WebpackOptionsNormalized } from 'webpack';

declare namespace Fusion {
  export interface DestOptions {
    merge: boolean;
    samePosition: boolean;
    file: string,
    path: string
  }

  export type MiniOptions = string | 'none' | 'same_file' | 'separate_file';

  export type taskProcessor<T> = (source: string | Array<string>,
                                  dest?: string | Array<string>,
                                  options?: T) => NodeJS.ReadWriteStream;

  export interface Processor<O> {
    options: O;

    new(source: string | Array<string>, options?: O);

    process(dest: string | Array<string>);
  }

  export interface CssOptions {
    autoprefixer?: boolean;
    minify?: MiniOptions;
    rebase?: true;
  }

  export interface CssPreProcessorOptions extends CssOptions {
    sourcemap?: boolean;
  }

  export interface JsOptions {
    sourcemap?: boolean;
    minify?: MiniOptions;
  }

  export interface BabelOptions extends JsOptions {
    targets?: string;
    babel?: BabelOptions;
    module?: string | 'systemjs' | 'umd' | 'amd';
  }

  export interface TsOptions extends JsOptions {
    ts: Settings
  }

  export interface WebpackOptions extends JsOptions {
    webpack?: WebpackOptionsNormalized;
    override?: WebpackOptionsNormalized;
    merge?: WebpackOptionsNormalized;
  }

  export const watch: WatchMethod;
  export const css: taskProcessor<CssOptions>;
  export const CssProcessor: Processor<CssOptions>;
  export const sass: taskProcessor<CssPreProcessorOptions>;
  export const SassProcessor: Processor<CssPreProcessorOptions>;
  export const js: taskProcessor<JsOptions>;
  export const JsProcessor: Processor<JsOptions>;
  export const babel: taskProcessor<BabelOptions>;
  export const BabelProcessor: Processor<BabelOptions>;
  export const ts: taskProcessor<TsOptions>;
  export const TsProcessor: Processor<TsOptions>;
  export const webpack: taskProcessor<WebpackOptions>;
  export const WebpackProcessor: Processor<WebpackOptions>;
}

export = Fusion;

// declare const Fusion: Fusion;
// export = Fusion;
