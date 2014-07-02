# supergenpass-lib

[![Build Status][build-status]][travis-ci]
[![Code Climate][code-climate-status]][code-climate]
[![NPM version][npm-badge]][fury-io]
[![Dependencies Status][dependencies-status]][gemnasium]

This is the official JavaScript implementation of [SuperGenPass][sgp]. It
provides the code used by the bookmarklet and mobile version of SuperGenPass to
generate passwords. If you are building or have built your own JavaScript-based
application for SuperGenPass, please consider using this library.


## NPM module

```shell
npm install supergenpass-lib
```


## Usage

```javascript
var supergenpass = require('supergenpass-lib');

// A string containing the user's master password.
var masterPassword = 'master-password';

// A URI or hostname of the site being visited.
var URI = 'http://www.example.com/page.html';

// Generate the password.
var generatedPassword = supergenpass(masterPassword, URI, {/* options */});
```


## Options

As shown above, `supergenpass-lib` optionally accepts a hash map of options.

### secret

* Default `''`
* Expects `String`

A secret password to be appended to the master password before generating the
password. This option is provided for convenience, as the same output can be
produced by manually concatenating the master and secret passwords.

### length

* Default `10`
* Expects `Number`

Length of the generated password. Valid lengths are integers between 4 and 24
inclusive. Note that 23- and 24-character MD5-based passwords provide no
additional entropy. (The value for those characters will always be `A`.)

### method

* Default `'md5'`
* Expects `String`

A string specifying the requested hash function. The only supported values are
`'md5'` or `'sha512'`.

### removeSubdomains

* Default `true`
* Expects `Boolean`

A boolean value directing whether or not to remove subdomains from the hostname
before generating the password.


## Domain name isolation

By default, `supergenpass-lib` isolates the domain name (e.g., `example.com`)
from the hostname by removing all subdomains. This ensures that the same
password is generated at `example.com`, `www.example.com`, and
`login.example.com`. It additionally uses a hardcoded list of country-code and
special-purpose TLDs to produce different passwords across sites registered
there. While this list is no doubt incomplete and out-of-date, it remains
static to maintain backwards compatibility. You can disable subdomain removal
in the options.

To help provide user feedback about the exact hostname used to generate the
password, `supergenpass-lib` provides a `hostname` method that can be used
separately.

```javascript
// Isolate a domain name from a URL using SuperGenPass's rules.
var hostname = supergenpass.hostname('http://login.example.com/doLogin.htm', {
  removeSubdomains: true  // default = true
});
```


## Browser environments

To use `supergenpass-lib` in browser environments, run `gulp browserify`. Take
the created `dist/supergenpass-lib.browser.js` and include it on your page. Use
the global `supergenpass` as documented above.


## Explanation of the algorithm

SuperGenPass is a very simple password hashing scheme. At its essence, it takes
a master password and a hostname and concatenates them together:

```
masterpassword:example.com
```

It uses this as the input for the user's preferred hash function. It guarantees
hashing at least ten times to protect against rainbow tables. The hash is then
cut to the user's preferred password length.

For more detail, please see the (well-commented and concise) source code.


## Dependencies and license

Hash functions are provided by [crypto-js][crypto-js]. All original code is
released under the [GPLv2][gplv2].


## Thanks

Development of this library was helped tremendously by [Denis Sokolov][denis],
author of the [SuperGenPass Chrome extension][chrome-ext].


[sgp]: http://supergenpass.com
[build-status]: https://secure.travis-ci.org/chriszarate/supergenpass-lib.svg?branch=master
[dependencies-status]: https://gemnasium.com/chriszarate/supergenpass-lib.svg
[code-climate-status]: http://img.shields.io/codeclimate/github/chriszarate/supergenpass-lib.svg
[npm-badge]: https://badge.fury.io/js/supergenpass-lib.svg
[travis-ci]: http://travis-ci.org/chriszarate/supergenpass-lib
[fury-io]: http://badge.fury.io/js/supergenpass-lib
[gemnasium]: https://gemnasium.com/chriszarate/supergenpass-lib
[code-climate]: https://codeclimate.com/chriszarate/supergenpass-lib
[crypto-js]: https://www.npmjs.org/package/crypto-js
[denis]: http://sokolov.cc
[chrome-ext]: https://chrome.google.com/extensions/detail/bmmmhbgdbpnbfefmacdlbpfgegcibkjo/
[gplv2]: http://www.gnu.org/licenses/gpl-2.0.html
