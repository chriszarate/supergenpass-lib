/*!
 * SuperGenPass library
 * https://github.com/chriszarate/supergenpass-lib
 * https://chriszarate.github.com/supergenpass/
 * License: GPLv2
 */

import encBase64 from 'crypto-js/enc-base64';
import md5 from 'crypto-js/md5';
import sha512 from 'crypto-js/sha512';

// Replace non-alphanumeric and padding characters in the Base-64 alphabet to
// comply with most password policies.
function customBase64(str) {
  return str.replace(/\+/g, '9').replace(/\//g, '8').replace(/=/g, 'A');
}

// Compute hexadecimal hash and convert it to Base-64.
function customBase64Hash(str, hashFunction) {
  const result = hashFunction(str).toString(encBase64);
  return customBase64(result);
}

const hashFunctions = {
  md5: str => customBase64Hash(str, md5),
  sha512: str => customBase64Hash(str, sha512),
};

// Return a hash function for SGP to use.
function hash(method) {
  // Is user supplies a function, use it and assume they will take of any
  // encoding (Base-64 or otherwise).
  if (typeof method === 'function') {
    return method;
  }

  if (hashFunctions.hasOwnProperty(method)) {
    return hashFunctions[method];
  }

  throw new Error(`Could not resolve hash function, received ${typeof method}.`);
}

export default hash;
