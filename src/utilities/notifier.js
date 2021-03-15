/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2021 .
 * @license    __LICENSE__
 */

import { spawn } from 'child_process';
import * as path from 'path';

export function notify(options = {}) {
  // Detach notify from Windows wait blocking,
  // see https://github.com/mikaelbr/node-notifier/issues/311
  const child = spawn(
    'node',
    [
      path.resolve('../bin/notify.js'),
      `"${Buffer.from(JSON.stringify(options)).toString('base64')}"`
    ],
    {
      detached: true,
      windowsHide: true,
      // Force detach from stdio, see https://stackoverflow.com/a/12871847/8134785
      stdio: ['ignore', 'ignore', 'inherit']
    }
  );

  child.unref();
}
