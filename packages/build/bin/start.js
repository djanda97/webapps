#!/usr/bin/env node
process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('cross-spawn');
const path = require('path');
const args = process.argv.slice(2);

const devServerPath = path.join(__dirname, '../devServer.js');
const nodeArgs = [devServerPath].concat(args);

const result = spawn.sync('node', nodeArgs, { stdio: 'inherit' });
if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. ' +
        'This probably means the system ran out of memory or someone called ' +
        '`kill -9` on the process.'
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. ' +
        'Someone might have called `kill` or `killall`, or the system could ' +
        'be shutting down.'
    );
  }
  process.exit(1);
}
process.exit(result.status);
