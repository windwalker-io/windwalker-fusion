# Windwalker Fusion

Windwalker Fusion provides a clean, fluent API for calling Gulp stream ans tasks to compile your code. 
Fusion supports several common CSS and JavaScript pre-processors.

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

  fusion.sass('src/scss/**/*.scss', 'dist/app.css');
});

fusion.default(['main']);
```

It is very similar to Gulp does.

Then run:

```bash
node node_modules\gulp\bin\gulp.js --gulpfile fusionfile.js
```

Gulp will help you compile all `.scss` files to `dist/app.css` and generate below files:

- `dist/app.css`
- `dist/app.min.css`
- `dist/app.css.map`

You can add `--watch` to watch `src/scss/**/*.scss` and re-compile, or add `--livereload` to refresh browser after
built.

> Livereload must works with [browser extension](http://livereload.com/extensions/) or [desktop app](http://livereload.com/). 

### NPM Script

You can also add some pre-defined script to `package.json` to speed up your workflow.

```json
  "scripts": {
    "build": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile fusionfile.js",
    "watch": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile fusionfile.js --watch",
    "watch:reload": "cross-env NODE_ENV=development node_modules/gulp/bin/gulp.js --gulpfile fusionfile.js --watch --livereload",
    "prod": "cross-env NODE_ENV=production node_modules/gulp/bin/gulp.js --gulpfile fusionfile.js",
  }
```

If you want to add more options to npm scripts, use ` -- [--options]`:

```bash
npm run watch -- --livereload --port xxxxx
``` 

## How Fusion Works

Fusion is a Gulp wrap with some pre-defined flow, for example, you can use this simple code to compile SCSS files:

```js
fusion.sass('src/**/*.scss', 'dist/');
```

Which is same as:

```js
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const rewriteCSS = require('gulp-rewrite-css');

gulp.src('src/**/*.scss')
    .pipe({ style: 'expanded' })
    .pipe(rewriteCSS({destination: 'dist/'}))
    .pipe(autoprefixer("last 3 version", "safari 5", "ie 9-11"))
    .pipe(gulp.dest('dist/'))
    .pipe(filter('**/*.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/'));
```

### Tasks

Fusion must use task to wrap every compile flow:

```js
fusion.task('css', () => {
  // ...
});

fusion.task('js', () => {
  // ...
});

fusion.default(['css', 'js']);
```

Then the last `fusion.default([tasks])` defines the default tasks. So if you call `gulp` without and arguments, 
Fusion will execute `css` and `js` two tasks automatically. You can also use `gulp css` to execute particular task.

> More about Gulp tasks please see: [Gulp doc](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md)  

### Watch

You can define the watch files to auto compile when file changes. You can use default Gulp syntax to define watchers.

```js
fusion.task('css', () => {
  // ...
});

fusion.task('js', () => {
  // ...
});

fusion.task('watch', () => {
  fusion.watch('src/**/*.scss', ['css']);
  fusion.watch(['src/**/*.js', '!./**/*.min.js'], ['js']);
});

fusion.default(['css', 'js']);
```

Use `gulp watch` to run watch task, then gulp will listen files to update `css` and `js` tasks.

But Fusion provides a more convenience way to set watch files in every task:

```js
fusion.task('css', () => {
  fusion.watch('src/**/*.scss');
  
  // ...
});

fusion.task('js', () => {
  fusion.watch(['src/**/*.js', '!./**/*.min.js']);
  
  // ...
});

fusion.default(['css', 'js', 'watch']);
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
// Generate app.css / app.min.css / app.css.map to same folder.
fusion.sass('asset/css/app.scss');
```

### One source file and dest file or dir.

Compile one file, and save compiled file as new file and position:

```js
// Generate app.css / app.min.css / app.css.map to /dist folder.
fusion.sass('src/css/app.scss', 'dist/app.css');

fusion.sass('src/css/app.scss', 'dist/');
```

### Multiple source file and no dest file.

Compile multiple files, and save compiled files to same folder:

```js
// Generate *.css / *.min.css / *.css.map to same folder.
fusion.sass('src/css/**/*.scss');

fusion.sass(['src/css/a.scss', 'src/css/b.scss']);
```

### Multiple source file and dest folder.

Compile multiple files, and save compiled files to new position with same structure:

```js
// Generate *.css / *.min.css / *.css.map to /dist/**
fusion.sass('src/css/**/*.scss', 'dist/');

fusion.sass(['src/css/a.scss', 'src/css/b.scss'], 'dist/');
```

### Multiple source file and one dest file.

Use `gulp-concat` to merge all files to one file and compile to one file.

```js
// Merge all *.scss files and generate app.css / app.min.css / app.css.map to /dist.
fusion.sass('src/css/**/*.scss', 'dist/app.css');

fusion.sass(['src/css/a.scss', 'src/css/b.scss'], 'dist/app.css');
```

### Add Options

```js
fusion.sass('src/css/**/*.scss', 'dist/', {minify: false});
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

### `babel(source, dest, options)`

Use Babel to transpile ES6, ES7 to ES5 and create minify files.

Available (default) options:

- `sourcemap`: true
- `minify`: true
- `presets`: `['ex2015', 'stage-2']`

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

### `sass(source, dest, options)`

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
