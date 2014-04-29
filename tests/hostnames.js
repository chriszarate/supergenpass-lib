var supergenpass = require('../supergenpass');

exports.testHostnames = function (test) {

  var hostnames = [
    [
      'http://www.google.com/search',  // input URI
      'google.com',                    // default
      'www.google.com'                 // disableTLD = true
    ],
    [
      'https://mail.google.com/mail/u/0/',
      'google.com',
      'mail.google.com'
    ],
    [
      'ftp://pandis.ucs.cam.ac.uk/media/',
      'cam.ac.uk',
      'pandis.ucs.cam.ac.uk'
    ],
    [
      'imap://mail.outlook.com:443',
      'outlook.com',
      'mail.outlook.com'
    ],
    [
      'sapporo.hokkaido.jp',
      'sapporo.hokkaido.jp',
      'sapporo.hokkaido.jp'
    ],
    [
      'api.example.com:80',
      'example.com',
      'api.example.com'
    ],
    [
      '192.168.0.1',
      '192.168.0.1',
      '192.168.0.1'
    ],
    [
      'http://8.8.8.8/',
      '8.8.8.8',
      '8.8.8.8'
    ],
    [
      'https://localhost:8000',
      'localhost',
      'localhost'
    ]
  ];

  hostnames.forEach(function(c) {
    test.equal(supergenpass.isolateHostname(c[0], false), c[1]);
    test.equal(supergenpass.isolateHostname(c[0], true), c[2]);
  });

  test.done();

};
