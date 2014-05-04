var supergenpass = require('../supergenpass-lib');

exports.testFailures = function(test){
    var data = [
        ['test', 'example.com', { method: 'default' }],
        ['test', 'example.com', { length: -1 }],
        ['test', 'example.com', { length: 0 }],
        ['test', 'example.com', { length: '12'}],
        ['test', 'example.com', { length: 3 }],
        ['test', 'example.com', { length: 28 }],
        ['test', 'example.com', { secret: false }],
        ['test', 'example.com', { secret: [] }],
        ['test', ''],
        ['test', '/foo/'],
        ['test', false],
        [false, 'example.com'],
        [null, 'example.com'],
        [undefined, 'example.com'],
        ['', 'example.com', { secret: '' }],
    ];

    data.forEach(function(c){
        test.throws(function(){
            supergenpass(c[0], c[1], c[2]);
        }, 'Dataset: ' + c[0] + ', ' + c[1] + ', ' + JSON.stringify(c[2]));
    });

    test.done();
};
