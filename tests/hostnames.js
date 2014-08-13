var supergenpass = require('../supergenpass-lib');

exports.testHostnames = function (test) {

  var hostnames = [
    [
      'http://www.google.com/search',  // input URI
      'google.com',                    // default
      'www.google.com'                 // removeSubdomains = false
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
      'ssh://server.example.com:~/public',
      'example.com',
      'server.example.com'
    ],
    [
      'git://git@github.com:user/repo.git',
      'github.com',
      'github.com'
    ],
    [
      'gopher://user:password@gopher.example.com',
      'example.com',
      'gopher.example.com'
    ],
    [
      'ftp://user:password@ftp.example.com:21/files/',
      'example.com',
      'ftp.example.com'
    ],
    [
      'www.example.com/path/to/page?param=value',
      'example.com',
      'www.example.com'
    ],
    [
      'sapporo.hokkaido.jp',
      'sapporo.hokkaido.jp',
      'sapporo.hokkaido.jp'
    ],
    [
      'https://www.test.ltd.co.im',
      'test.ltd.co.im',
      'www.test.ltd.co.im'
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
    test.equal(supergenpass.hostname(c[0], { removeSubdomains: true }), c[1]);
    test.equal(supergenpass.hostname(c[0], { removeSubdomains: false }), c[2]);
  });

  test.done();

};
