/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const fusion = require('windwalker-fusion');

// The task `main`
fusion.task('main', () => {
  // Watch start
  fusion.watch('www/asset/**/*.scss');
  // Watch end

  // Compile Start
  fusion.sass('www/asset/admin/css/admin.scss');
  // Compile end
});

fusion.default(['main']);

/*
 * More APIs
 *
 * Compile entry:
 * fusion.js(source, dest, options = {})
 * fusion.babel(source, dest, options = {})
 * fusion.ts(source, dest, options = {})
 * fusion.css(source, dest, options = {})
 * fusion.less(source, dest, options = {})
 * fusion.sass(source, dest, options = {})
 * fusion.copy(source, dest, options = {})
 *
 * Gulp proxy:
 * fusion.src(source, options)
 * fusion.dest(path, options)
 * fusion.task(name, deps, fn)
 * fusion.watch(glob, opt, fn)
 *
 * Config:
 * fusion.disableNotification()
 * fusion.enableNotification()
 */
