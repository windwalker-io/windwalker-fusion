
const fusion = require('./src/index');

fusion.setPublicPath('test');

fusion.task('main', () => {
  fusion.watch('test/scss/**/*.scss');

  fusion.sass('test/scss/*.scss', 'test/css/');

  fusion.css('test/src/*.css', 'test/css/merge.css');
  fusion.css('test/src/deep/*.css', 'test/css/deep.css');
  fusion.sass('test/src/deep/*.scss', 'test/css/deep-scss.css');

  fusion.babel('test/es6/**/*.js', 'test/js/app.js');

  //fusion.less('test/less/flower.less');
});

fusion.run(['main']);
