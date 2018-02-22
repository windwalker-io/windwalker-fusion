
const fusion = require('./src/index');

fusion.task('main', () => {
  fusion.watch('test/scss/**/*.scss');

  fusion.sass('test/scss/*.scss', 'test/css/');
  //fusion.less('test/less/flower.less');
});

fusion.run(['main']);
