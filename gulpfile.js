
const fusion = require('./src/index');

fusion.setPublicPath('test');

fusion.task('main', () => {
  // fusion.watch('test/scss/**/*.scss');
  // fusion.watch('test/less/**/*.less');
  fusion.watch('test/es6/**/*.js');
  // fusion.watch('test/ts/**/*.ts');
  fusion.watch('test/src/**/*.css');
  //
  // fusion.sass('test/scss/*.scss', 'test/css/');
  //fusion.less('test/less/*.less', 'test/css/');
  ////
  //fusion.css('test/src/*.css', 'test/css/merge.css');
  //fusion.css('test/src/deep/*.css', 'test/css/deep.css');
  // fusion.sass('test/src/deep/*.scss', 'test/css/deep-scss.css');
  // fusion.js('test/es6/*.js', 'test/js/yoo.js');
  // fusion.copy('test/es6/**', 'test/new/');

  //fusion.babel('test/es6/**/*.js', 'test/js/app.js');
  fusion.babel('test/es6/**/*.js', 'test/new', {suffix: '-es5'});
  // fusion.ts('test/ts/*.ts', 'test/js/aoo.js', {ts: {target: 'es5'}});

  //fusion.less('test/less/flower.less');
});

fusion.default(['main']);
