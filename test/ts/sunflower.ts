/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Greeter from './greeter';

class jQuery {
  static get(url): Promise<any> {
    return new Promise((resolve) => {
      return resolve('Hello');
    });
  }
}

const el = document.getElementById('content');
const greeter = new Greeter(el);
greeter.start();

(async ($) => {
  const a = 'b';

  const result = await $.get('./');

  console.log(a, 'foo');
})(jQuery);
