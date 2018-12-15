/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

import test from './test';

(($) => {
  "use strict";

  let sakura = 'flower';

  function test() {
    //
  }

  sakura += 123;

  if (sakura) {
    console.log('Test');
  }

  console.log(sakura, $('rose'));

  class Hello {
    foo = 'hello';
    #bar = 'bar';

    show() {
      console.log(this.foo, this.#bar);
    }
  }
})(jQuery);
