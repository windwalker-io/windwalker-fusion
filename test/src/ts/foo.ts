/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import Bar from './bar';

@decorator
export class Foo {
  flower = 'Sakura';
  static car = 'Tesla';

  constructor() {
    //
  }
}

function decorator(value) {
  return () => value;
}
