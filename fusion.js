
const fusion = require('./src/index');

fusion.task('main', () => {
  fusion.sass('test/scss/*.scss');
  fusion.less('test/less/flower.less');
});

fusion.run(['main']);
