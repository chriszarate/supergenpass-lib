/*
 * SuperGenPass wrapper functions. SuperGenPass uses MD5 by default but offers
 * SHA-512 as an alternative. Unnecessary or unused functions are deleted.
 */

var md5 = require('crypto-js/md5');
var sha512 = require('crypto-js/sha512');
var encBase64 = require('crypto-js/enc-Base64');

var custom_base64 = function(str) {
  return str.replace(/\+/g, '9').replace(/\//g, '8').replace(/\=/g, 'A');
}

var api = {
  hex_hash: function(s, Method) {
    var hash = ( Method == 'sha512' ) ? sha512(s) : md5(s);
    return hash.toString();
  },
  b64_hash: function (s, Method) {
    var hash = ( Method == 'sha512' ) ? sha512(s) : md5(s);
    return custom_base64(hash.toString(encBase64));
  }
};

module.exports = api;
