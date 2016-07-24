/*!
 * SuperGenPass library
 * https://github.com/chriszarate/supergenpass-lib
 * https://chriszarate.github.com/supergenpass/
 * License: GPLv2
 */

function validateCallback(callback) {
  if (typeof callback !== 'function') {
    throw new Error('Must provide callback function.');
  }
}

function validateLength(num) {
  if (num !== parseInt(num, 10) || num < 4 || num > 24) {
    throw new Error(`Length must be an integer between 4 and 24: ${num}.`);
  }
}

function validatePassword(str, length) {
  // Cut password to requested length.
  const password = str.substring(0, length);

  // 1. Password must start with a lowercase letter [a-z].
  // 2. Password must contain at least one uppercase letter [A-Z].
  // 3. Password must contain at least one numeral [0-9].
  const startsWithLowercaseLetter = /^[a-z]/;
  const containsUppercaseLetter = /[A-Z]/;
  const containsNumeral = /[0-9]/;

  // Return true if all tests are satisfied.
  return startsWithLowercaseLetter.test(password) &&
   containsUppercaseLetter.test(password) &&
   containsNumeral.test(password);
}

function validatePasswordInput(str) {
  if (typeof str !== 'string') {
    throw new Error(`Password must be a string, received ${typeof str}.`);
  }
}

function validatePasswordLength(str) {
  if (!str.length) {
    throw new Error('Combined password input must not be empty.');
  }
}

export {
  validateCallback,
  validateLength,
  validatePassword,
  validatePasswordInput,
  validatePasswordLength,
};
