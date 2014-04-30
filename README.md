# supergenpass-lib

[![Build Status](https://secure.travis-ci.org/chriszarate/supergenpass-lib.svg?branch=master)](http://travis-ci.org/chriszarate/supergenpass-lib)
[![Dependency Status](https://gemnasium.com/chriszarate/supergenpass-lib.svg)](https://gemnasium.com/chriszarate/supergenpass-lib)

SuperGenPass password generation engine.

## Usage

```javascript
var supergenpass = require('supergenpass');

// Generate a password from a master password and a URL or a domain.
supergenpass('master-password', 'http://domain.example.com/', {

    // Disable subdomain removal
    disableTLD: false,

    // Length of the generated password
    length: 10,

    // md5 or sha512
    method: 'md5',

    // Optional secret in addition to master password
    secret: ''

});

// Isolate a hostname from a URL using SGP's rules.
supergenpass.hostname('http://domain.example.com/', {
    // Disable subdomain removal
    disableTLD: false
});
```

To use supergenpass library in browser environments, run `gulp browserify`.
Take the created `dist/supergenpass.browser.js`, include it on your page and use the global `supergenpass`.
