var supergenpass = require('../supergenpass');

var data = [
    ['ft8iv4t5sX', 'Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο'],
    ['o1AWdbILuJ', 'Benjamín pidió una bebida de kiwi y fresa'],
    ['uqWgZf34mr', 'Ça me fait peur de fêter noël là, sur cette île bizarroïde où'],
    ['iUL7ndPlsD', 'Árvíztűrő tükörfúrógép'],
    ['fDOVXY6AhC', 'わかよたれそつねならむ'],
    ['i4LtmfRGl8', 'ウヰノオクヤマ ケフコエテ'],
    ['wD8T8KozGO', 'מצא לו חברה איך הקליטה'],
    ['jtUcAzTL4l', 'В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!'],
    ['rnXePhv0JG', 'จงฝ่าฟันพัฒนาวิชาการ']
].map(function(row){
    return {
        input: row[1],
        sgp: row[0]
    };
});

exports.testUnicode = function(test){
    data.forEach(function(row){
        test.equal(supergenpass(row.input, 'example.com'), row.sgp);
    });
    test.done();
};
