
const fusion = require('./src/index');

fusion.setPublicPath('test');

fusion.task('main', () => {
  fusion.watch('test/scss/**/*.scss');
  fusion.watch('test/es6/**/*.js');
  //
  fusion.sass('test/scss/*.scss', 'test/css/');
  //
  // fusion.css('test/src/*.css', 'test/css/merge.css');
  fusion.css('test/src/deep/*.css', 'test/css/deep.css');
  // fusion.sass('test/src/deep/*.scss', 'test/css/deep-scss.css');
  fusion.js('test/es6/*.js', 'test/js/yoo.js');
  // fusion.copy('test/es6/**', 'test/new/');

  // fusion.babel('test/es6/**/*.js', 'test/js/app.js');
  // fusion.ts('test/ts/*.ts', 'test/js/aoo.js', {ts: {target: 'es5'}});

  //fusion.less('test/less/flower.less');
});

fusion.run(['main']);
