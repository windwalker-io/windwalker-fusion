/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Vue from 'vue';
import foo from './foo';

new Vue({
  el: '#app',
  components: {
    'foo': foo
  },
  template: '<foo/>',
  data: {

  }
});
