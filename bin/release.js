/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

import { cliInput } from '../src/utilities/cli.js';
import { execSync as exec } from 'child_process';
import fs from 'fs';

const help = `
Usage: release.js <version>
  -b    Branch name to push. 
`;

if (cliInput['help'] || cliInput['h']) {
  console.log(help);
  process.exit(0);
}

const version = cliInput._[0];
const branch = cliInput['b'] || 'master';

if (!version) {
  console.log('Please provide a version.', "\n", help);
  process.exit(1);
}

console.log(`>> Replace version to ${version}`);

const pjson = require('../package.json');

pjson.version = version;

fs.writeFileSync(__dirname + '/../package.json', JSON.stringify(pjson, null, 2));

console.log('>> Push to git');

exec(`git checkout ${branch}`);
exec(`git commit -am "Prepare ${version} release."`, () => {});
exec(`git tag ${version} -f`);
exec(`git push origin ${branch}`);
exec(`git push origin --tags -f`);
exec(`git checkout master`);

console.log('>> Publish to npm');

exec(`npm publish`);
