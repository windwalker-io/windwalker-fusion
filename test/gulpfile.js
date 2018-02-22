
const fusion = require('../src/index');

fusion.task('main', () => {
  fusion.watch('scss/**/*.scss');

  fusion.sass('scss/*.scss', 'test/css/');

  fusion.babel('es6/**/*.js', 'test/js/app.js');

  //fusion.less('test/less/flower.less');
});

fusion.run(['main']);
