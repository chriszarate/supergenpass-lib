var supergenpass = require('../supergenpass');

exports.testSimple = function(test){
    var data = [
        ['w9UbG0NEk7', 'test', 'example.com'],
        ['sJfoZg3nU8', 'test', 'example.com', { method: 'sha512' }],
        ['aC81', 'test', 'example.com', { length: 4, method: 'sha512' }],
        ['vBKDNdjhhL6dBfgDSRxZxAAA', 'test', 'example.com', { length: 100, method: 'md5' }],
        ['sJfoZg3nU8y32EyHFRlSY08u', 'test', 'example.com', { length: 100, method: 'sha512' }],
        ['zPQSNhTzs9fS', 'test', 'https://www.google.com/', { length: 12, secret: 'test' }],
        ['q8ZWYccWDt', 'test', 'https://www.google.com/', { removeSubdomains: false, method: 'sha512' }],
        ['aRFG84Gim9', 'test', 'example.co.uk'],
        ['hSF8nTst4A', 'test', 'example.gov.ac']
    ];

    data.forEach(function(c){
        test.equal(supergenpass(c[1], c[2], c[3]), c[0]);
    });

    test.done();
};

exports.testLengthLimit = function(test){
    test.equal(
        supergenpass('test', 'example.com', { length: 1 }),
        supergenpass('test', 'example.com', { length: 4 })
    );
    test.equal(
        supergenpass('test', 'example.com', { length: 24 }),
        supergenpass('test', 'example.com', { length: 28 })
    );
    test.done();
};
