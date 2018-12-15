/**
 * Part of earth project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

import Foo from './foo';

(async () => {
  const foo = 'Hello';

  await console.log(foo);
})();

class Hello {
  hello = 'hello';

  foo() {
    console.log(this.hello);
  }
}

new Hello().foo();
new Foo().show();
