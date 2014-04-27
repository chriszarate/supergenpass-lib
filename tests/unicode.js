var supergenpass = require('../supergenpass');

var data = [
    ['ft8iv4t5sX', '81484f5b1be9f32cab18db8062fc1eb4', 'Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο'],
    ['o1AWdbILuJ', 'f12c637940b0cf480d7f9fd6290699db', 'Benjamín pidió una bebida de kiwi y fresa'],
    ['uqWgZf34mr', '4f4f752923b897075f59da1ed246a506', 'Ça me fait peur de fêter noël là, sur cette île bizarroïde où'],
    ['iUL7ndPlsD', '2163dd1ae6bf1d130e8cb8dd370077b4', 'Árvíztűrő tükörfúrógép'],
    ['fDOVXY6AhC', '7f5c3de71ae6ed14b914a6265e838b5a', 'わかよたれそつねならむ'],
    ['i4LtmfRGl8', 'b0850bcf60776d2c715653a1989ee5e3', 'ウヰノオクヤマ ケフコエテ'],
    ['wD8T8KozGO', '7f1d9033d1bb015d47bcc0ef7818ff47', 'מצא לו חברה איך הקליטה'],
    ['jtUcAzTL4l', '15cdb91508cd166e8c6b892e24adec42', 'В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!'],
    ['rnXePhv0JG', '41a4c24acb77ac1beadec1da28f60623', 'จงฝ่าฟันพัฒนาวิชาการ']
].map(function(row){
    return {
        input: row[2],
        sgp: row[0],
        hash: row[1]
    };
});

exports.testSimple = function(test){
    data.forEach(function(row){
        test.equal(supergenpass(row.input, 'example.com'), row.sgp);
    });
    test.done();
};

exports.testHash = function(test){
    data.forEach(function(row){
        test.equal(supergenpass._hash(row.input), row.hash);
    });

    test.done();
};
