# Windwalker Fusion

[![npm](https://img.shields.io/npm/l/windwalker-fusion.svg)](https://www.npmjs.com/package/windwalker-fusion)
[![npm](https://img.shields.io/npm/v/windwalker-fusion.svg)](https://www.npmjs.com/package/windwalker-fusion)
[![npm](https://img.shields.io/npm/dt/windwalker-fusion.svg)](https://www.npmjs.com/package/windwalker-fusion)

Windwalker Fusion provides a clean, fluent API for calling Gulp stream ans tasks to compile your code. 
Fusion supports several common CSS and JavaScript pre-processors.

This project is inspired by [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) but based on [Gulp.js](https://gulpjs.com/).

## TOC

<!-- TOC -->

- [Getting Started](#getting-started)
    - [NPM Script](#npm-script)
- [How Fusion Works](#how-fusion-works)
    - [Tasks](#tasks)
    - [Watch](#watch)
    - [LiveReload](#livereload)
- [Fusion API](#fusion-api)
- [Available APIs](#available-apis)
    - [`js(source, dest, options)`](#jssource-dest-options)
    - [`babel(source, dest, options)`](#babelsource-dest-options)
    - [`ts(source, dest, options)` or `typeScript()`](#tssource-dest-options-or-typescript)
    - [`less(source, dest, options)`](#lesssource-dest-options)
    - [`sassProcessor(source, dest, options)`](#sasssource-dest-options)
    - [`copy(source, dest, options)`](#copysource-dest-options)
    - [`livereload(source, options = {})`](#livereloadsource-options--)
    - [`reload(source, options = {})`](#reloadsource-options--)
    - [`through(func)`](#throughfunc)
    - [`default([...tasks])`](#defaulttasks)
    - [`enableNotification()` and `disableNotification()`](#enablenotification-and-disablenotification)

<!-- /TOC -->

## Getting Started

```bash
mkdir myapp && cd myapp
npm install windwalker-fusion --save-dev
cp -r node_modules/windwalker-fusion/config/fusionfile.js ./
```

The `fusionfile.js` is your configuration on top of Gulp. The example code is:

```js
const fusion = require('windwalker-fusion');

// The task `main`
fusion.task('main', function () {
  fusion.watch('src/scss/**/*.scss');

  fusion.sassProcessor('src/scss/**/*.scss', 'dist/app.cssProcessor');
});

fusion.default(['main']);
```

It is very similar to Gulp does.

Then run:

```bash
node node_modules\gulp\bin\gulp.js --gulpfile fusionfile.js
```

Gulp will help you compile all `.scss` files to `dist/app.cssProcessor` and generate below files:

- `dist/app.cssProcessor`
- `dist/app.min.cssProcessor`
- `dist/app.cssProcessor.map`

You can add `--watch` to watch `src/scss/**/*.scss` and re-compile, or add `--livereload` to refresh browser after
built.

> Livereload must works with [browser extension](http://livereload.com/extensions/) or [desktop app](http://livereload.com/). 

### NPM Script

You can also add some pre-defined script to `package.json` to speed up your workflow.

```json
  "scripts": {
    "build": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile=fusionfile.js",
    "watch": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile=fusionfile.js --watch=1",
    "watch:reload": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile=fusionfile.js --watch=1 --livereload=1",
    "prod": "cross-env NODE_ENV=production node_modules/gulp/bin/gulp.js --gulpfile=fusionfile.js"
  }
```

If you want to add more options to npm scripts, use ` -- [--options]`:

```bash
npm run watch:reload -- --port=xxxxx
```

Or execute particular tasks

```bash
npm run watch -- task1 task2
```

## How Fusion Works

Fusion is a Gulp wrap with some pre-defined flow, for example, you can use this simple code to compile SCSS files:

```js
fusion.sassProcessor('src/**/*.scss', 'dist/');
```

Which is same as:

```js
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-cssProcessor');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const rewriteCSS = require('gulp-rewrite-cssProcessor');

gulp.src('src/**/*.scss')
    .pipe({ style: 'expanded' })
    .pipe(rewriteCSS({destination: 'dist/'}))
    .pipe(autoprefixer("last 3 version", "safari 5", "ie 9-11"))
    .pipe(gulp.dest('dist/'))
    .pipe(filter('**/*.cssProcessor'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/'));
```

### Tasks

Fusion must use task to wrap every compile flow:

```js
fusion.task('cssProcessor', () => {
  // ...
});

fusion.task('js', () => {
  // ...
});

fusion.default(['cssProcessor', 'js']);
```

Then the last `fusion.default([tasks])` defines the default tasks. So if you call `gulp` without and arguments, 
Fusion will execute `cssProcessor` and `js` two tasks automatically. You can also use `gulp cssProcessor` to execute particular task.

> More about Gulp tasks please see: [Gulp doc](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)  

### Watch

You can define the watch files to auto compile when file changes. You can use default Gulp syntax to define watchers.

```js
fusion.task('cssProcessor', () => {
  // ...
});

fusion.task('js', () => {
  // ...
});

fusion.task('watch', () => {
  fusion.watch('src/**/*.scss', ['cssProcessor']);
  fusion.watch(['src/**/*.js', '!./**/*.min.js'], ['js']);
});

fusion.default(['cssProcessor', 'js']);
```

Use `gulp watch` to run watch task, then gulp will listen files to update `cssProcessor` and `js` tasks.

But Fusion provides a more convenience way to set watch files in every task:

```js
fusion.task('cssProcessor', () => {
  fusion.watch('src/**/*.scss');
  
  // ...
});

fusion.task('js', () => {
  fusion.watch(['src/**/*.js', '!./**/*.min.js']);
  
  // ...
});

fusion.default(['cssProcessor', 'js', 'watch']);
``` 

Only send first `glob` argument to watch, then watcher will only watch this task. Then use `gulp --watch` to enable
watchers, otherwise it will be ignored.

### LiveReload

All fusion method provides livereload. Just use `gulp --watch --livereload` to enable it.

You can just watch a file to reload after changes without compile:

```js
fusion.livereload('src/**/*.php');
```

Or manually raise reload:

```js
fusion.reload('index.html');
```

See [Gulp livereload.reload()](https://www.npmjs.com/package/gulp-livereload#livereloadreloadfile)

## Fusion API

### Fusion methods

Fusion provides simple interface to build Gulp stream flow, there are some tips about how to use it:

### One source file and no dest file.

Compile one file, and save compiled file to same folder:

```js
// Generate app.cssProcessor / app.min.cssProcessor / app.cssProcessor.map to same folder.
fusion.sassProcessor('asset/cssProcessor/app.scss');
```

### One source file and dest file or dir.

Compile one file, and save compiled file as new file and position:

```js
// Generate app.cssProcessor / app.min.cssProcessor / app.cssProcessor.map to /dist folder.
fusion.sassProcessor('src/cssProcessor/app.scss', 'dist/app.cssProcessor');

fusion.sassProcessor('src/cssProcessor/app.scss', 'dist/');
```

### Multiple source file and no dest file.

Compile multiple files, and save compiled files to same folder:

```js
// Generate *.cssProcessor / *.min.cssProcessor / *.cssProcessor.map to same folder.
fusion.sassProcessor('src/cssProcessor/**/*.scss');

fusion.sassProcessor(['src/cssProcessor/a.scss', 'src/cssProcessor/b.scss']);
```

### Multiple source file and dest folder.

Compile multiple files, and save compiled files to new position with same structure:

```js
// Generate *.cssProcessor / *.min.cssProcessor / *.cssProcessor.map to /dist/**
fusion.sassProcessor('src/cssProcessor/**/*.scss', 'dist/');

fusion.sassProcessor(['src/cssProcessor/a.scss', 'src/cssProcessor/b.scss'], 'dist/');
```

### Multiple source file and one dest file.

Use `gulp-concat` to merge all files to one file and compile to one file.

```js
// Merge all *.scss files and generate app.cssProcessor / app.min.cssProcessor / app.cssProcessor.map to /dist.
fusion.sassProcessor('src/cssProcessor/**/*.scss', 'dist/app.cssProcessor');

fusion.sassProcessor(['src/cssProcessor/a.scss', 'src/cssProcessor/b.scss'], 'dist/app.cssProcessor');
```

### Add Options

```js
fusion.sassProcessor('src/cssProcessor/**/*.scss', 'dist/', {minify: false});
```

### Pipe

All Fusion proxy methods will return gulp stream:

```js
fusion.less('src/**/*.less')
  .pipe(gulpPlugin1())
  .pipe(gulpPlugin2())
  .on('end', () => {
    // ...
  });
```

## Available APIs

### `js(source, dest, options)`

Minify JS file and create sourcemap:

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `suffix`: false

> **NOTE** If `js()` dest position is `NULL` without suffix, if will not override self.

### `babel(source, dest, options)`

Use Babel to transpile ES6, ES7 to ES5 and create minify files.

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `suffix`: false (You can add `-es5` to suffix that will create `{name}-es5.js` and `{name}-es5.min.js`)
- `presets`: `['ex2015', 'stage-2']`

> **NOTE** If `babel()` dest position is `NULL` without suffix, if will not override self.

See [Babel Presets](https://babeljs.io/docs/plugins/#presets)

### `ts(source, dest, options)` or `typeScript()`

Compile TypeScript to JS and create minify files. you can also transpile to ES5 code. 

By default, the `ts: target` is `es6` so fusion will compile to ES6 code, if you need ES5, just set `ts: target` as `es5`.

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `ts`: `{ declaration: false, target: 'es6' }` (Same as `tsconfig.json`)

See: [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

> **NOTE** If you merge multiple `.ts` file to one file, Fusion will auto set `ts: module` to `amd`. 

### `less(source, dest, options)`

Compile LESS to CSS file and create sourcemap and minified file.

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `autoprefixer`: true
- `rebase`: true (rewrite `url()` to dest folder)

### `sassProcessor(source, dest, options)`

Compile SASS/SCSS to CSS file and create sourcemap and minified file.

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `autoprefixer`: true
- `rebase`: true (rewrite `url()` to dest folder)

### `copy(source, dest, options)`

Simple copy files command.

### `livereload(source, options = {})`

Create a stream with liverelaod listener.

See: [gulp-livereload](https://www.npmjs.com/package/gulp-livereload)

### `reload(source, options = {})`

Immediate reload. Must provide a file path:

```js
fusion.reload('public/index.php');
```

### `through(func)`

Use `through2.obj(func)` to add custom callback to pipe.

```js
fusion.less('src/**/*.less')
    .pipe(fusion.through(function (chunk, encoding, callback) {
      
        // ...
        
        // Must execute callback to tell gulp pipe end
        callback();
    }));
```

See: [through2](https://www.npmjs.com/package/through2)

### `default([...tasks])`

Same as `gulp.task('default', [...tasks])`

### `enableNotification()` and `disableNotification()`

Enable and disable desktop notification.
