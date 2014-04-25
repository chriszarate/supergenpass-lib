var supergenpass = require('../supergenpass');

exports.testHash = function(test){
    var data = [
        ['739c5b1cd5681e668f689aa66bcc254c', 'test'],
        [
            '5ec5029c812bc9f95aaf1c232b976627c583b4e604e80652990078a7fbf840c250179dd7700d1d6608c321f3998891076ad788729de65770080d939452c7d41c',
            'test',
            { method: 'sha512' }
        ],
    ];

    data.forEach(function(c){
        test.equal(supergenpass._hash(c[1], c[2]), c[0]);
    });

    test.done();
};
