var supergenpass = require('../supergenpass-lib');

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
].map(function (row) {
  return {
    input: row[1],
    sgp: row[0]
  };
});

exports.testUnicode = {};

data.forEach(function (row, i) {
  exports.testUnicode[i] = function (test) {
    test.expect(1);
    supergenpass(row.input, 'example.com', {}, function (password) {
      test.equal(password, row.sgp);
      test.done();
    });
  };
});
