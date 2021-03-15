
const fusion = require('./src');

fusion.setPublicPath('test');

fusion.task('main', () => {
  // fusion.watch('test/scss/**/*.scss');
  // fusion.watch('test/less/**/*.less');
  fusion.watch('test/es6/**/*.js');
  // fusion.watch('test/ts/**/*.ts');
  fusion.watch('test/src/**/*.cssProcessor');
  //
  fusion.sass('test/scss/*.scss', 'test/css/');
  //fusion.less('test/less/*.less', 'test/cssProcessor/');
  ////
  //fusion.cssProcessor('test/src/*.cssProcessor', 'test/cssProcessor/merge.cssProcessor');
  //fusion.cssProcessor('test/src/deep/*.cssProcessor', 'test/cssProcessor/deep.cssProcessor');
  // fusion.sassProcessor('test/src/deep/*.scss', 'test/cssProcessor/deep-scss.cssProcessor');
  // fusion.js('test/es6/*.js', 'test/js/yoo.js');
  // fusion.copy('test/es6/**', 'test/new/');

  //fusion.babel('test/es6/**/*.js', 'test/js/app.js');
  fusion.babel('test/es6/**/*.js', 'test/new/', {suffix: '-es5'});
  // fusion.ts('test/ts/*.ts', 'test/js/aoo.js', {ts: {target: 'es5'}});

  //fusion.less('test/less/flower.less');
});

fusion.task('webpack', () => {
  fusion.watch('test/webpack/src/**/*.js');
  fusion.webpack('test/webpack/src/main.js', 'test/webpack/dest/');
});

fusion.task('vue', () => {
  fusion.watch('test/vue/src/**/*.js');
  fusion.vue(
    'test/vue/src/**/*.js',
    'test/vue/dest/',
    { excludeVue: true }
    );
});

fusion.default(['main']);
