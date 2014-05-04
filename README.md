# supergenpass-lib

[![Build Status][build-status]][travis-ci]
[![Dependencies Status][dependencies-status]][gemnasium]

SuperGenPass password generation engine.

## Usage

```javascript
var supergenpass = require('supergenpass');

// Generate a password from a master password and a URL or a domain.
supergenpass('master-password', 'http://domain.example.com/', {

    // Length of the generated password
    // Valid length is between 4 to 24 inclusive.
    // 
    // (Lengths 23 and 24 using md5 method provide no security
    // over length of 22, allowed only for backwards compatibility)
    length: 10,

    // md5 or sha512
    method: 'md5',

    // Use subdomain removal
    removeSubdomains: true,

    // Optional secret in addition to master password
    secret: ''

});

// Isolate a hostname from a URL using SGP's rules.
supergenpass.hostname('http://domain.example.com/', {
    // Use subdomain removal
    removeSubdomains: true
});
```

To use supergenpass library in browser environments, run `gulp browserify`.
Take the created `dist/supergenpass.browser.js`, include it on your page and use the global `supergenpass`.

[build-status]: https://secure.travis-ci.org/chriszarate/supergenpass-lib.svg?branch=master
[dependencies-status]: https://gemnasium.com/chriszarate/supergenpass-lib.svg
[travis-ci]: http://travis-ci.org/chriszarate/supergenpass-lib
[gemnasium]: https://gemnasium.com/chriszarate/supergenpass-lib
