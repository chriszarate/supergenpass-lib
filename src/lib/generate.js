/*!
 * SuperGenPass library
 * https://github.com/chriszarate/supergenpass-lib
 * https://chriszarate.github.com/supergenpass/
 * License: GPLv2
 */

import hash from './hash';
import hostname from './hostname';
import {
  validateCallback,
  validateLength,
  validatePassword,
  validatePasswordInput,
  validatePasswordLength,
} from './validate';

// Hash the input for the requested number of rounds, then continue hashing
// until the password policy is satisfied. Finally, pass result to callback.
function hashRound(input, length, hashFunction, rounds, callback) {
  if (rounds > 0 || !validatePassword(input, length)) {
    process.nextTick(() => {
      hashRound(hashFunction(input), length, hashFunction, rounds - 1, callback);
    });
    return;
  }
  process.nextTick(() => {
    callback(input.substring(0, length));
  });
}

function generate(
    masterPassword,
    url,
    userOptions = {},
    callback = console.log // eslint-disable-line no-console
  ) {
  const defaults = {
    hashRounds: 10,
    length: 10,
    method: 'md5',
    removeSubdomains: true,
    secret: '',
  };
  const options = Object.assign({}, defaults, userOptions);

  validateCallback(callback);
  validatePasswordInput(masterPassword);
  validatePasswordInput(options.secret);
  validatePasswordLength(masterPassword + options.secret);
  validateLength(options.length);

  const domain = hostname(url, options);
  const input = `${masterPassword}${options.secret}:${domain}`;

  hashRound(input, options.length, hash(options.method), options.hashRounds, callback);
}

export default generate;
