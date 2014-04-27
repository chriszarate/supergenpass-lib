# supergenpass-lib

SuperGenPass password generation engine.

## Usage

There is a single piece of API available, just calling the module.
The only required piece of information is master password and the domain.

```javascript
var supergenpass = require('supergenpass');

supergenpass('master-password', 'domain.example.com', {
    // Disable sudomain removal
    disableTld: false,
    
    // Length of the generated password
    length: 10,
    
    // md5 or sha512
    method: 'md5',
    
    // Optional secret in addition to master password
    salt: ''
});
```

In browser environments you can include `src/hash.js` and `supergenpass.js` and
the API will be available using a global `supergenpass`.
