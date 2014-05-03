var supergenpass = require('../supergenpass');

exports.testFailure = function(test){
    var data = [
        { method: 'unknown' },
        { length: -1 },
        { length: '123foo' },
        { length: 3 },
        { length: 28 },
    ];

    data.forEach(function(c){
        test.throws(function(){
            supergenpass('foo', 'example.com', c);
        }, 'Dataset: ' + JSON.stringify(c));
    });

    test.done();
};
