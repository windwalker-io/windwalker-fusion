/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

// "use strict";

(async ($) => {
  const a = 'b';

  const result = await $.get('./');

  console.log(a, 'foo');
})(jQuery);
