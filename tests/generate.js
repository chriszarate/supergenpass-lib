import test from 'ava';
import generate from '../src/lib/generate';

function testOutput(t, expected, masterPassword, url = 'example.com', options = {}) {
  t.plan(1);
  generate(masterPassword, url, options, (password) => {
    t.is(password, expected);
    t.end();
  });
}

const testData = [
  [
    'w9UbG0NEk7', // expected output
    'test',       // master password
                  // url (default = 'example.com')
                  // optional options hash (default = {})
  ],
  [
    'sJfoZg3nU8',
    'test',
    'example.com',
    {
      method: 'sha512',
    },
  ],
  [
    'aC81',
    'test',
    'example.com',
    {
      length: 4,
      method: 'sha512',
    },
  ],
  [
    'vBKDNdjhhL6dBfgDSRxZxAAA',
    'test',
    'example.com',
    {
      length: 24,
      method: 'md5',
    },
  ],
  [
    'sJfoZg3nU8y32EyHFRlSY08u',
    'test',
    'example.com',
    {
      length: 24,
      method: 'sha512',
    },
  ],
  [
    'rT8y7pRDHa',
    'test',
    'example.com',
    {
      hashRounds: 1000,
    },
  ],
  [
    'zPQSNhTzs9fS',
    'test',
    'https://www.google.com/',
    {
      length: 12,
      secret: 'test',
    },
  ],
  [
    'q8ZWYccWDt',
    'test',
    'https://www.google.com/',
    {
      removeSubdomains: false,
      method: 'sha512',
    },
  ],
  [
    'aRFG84Gim9',
    'test',
    'example.co.uk',
  ],
  [
    'hSF8nTst4A',
    'test',
    'example.gov.ac',
  ],
  [
    'ft8iv4t5sX',
    'Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο',
  ],
  [
    'o1AWdbILuJ',
    'Benjamín pidió una bebida de kiwi y fresa',
  ],
  [
    'uqWgZf34mr',
    'Ça me fait peur de fêter noël là, sur cette île bizarroïde où',
  ],
  [
    'iUL7ndPlsD',
    'Árvíztűrő tükörfúrógép',
  ],
  [
    'fDOVXY6AhC',
    'わかよたれそつねならむ',
  ],
  [
    'i4LtmfRGl8',
    'ウヰノオクヤマ ケフコエテ',
  ],
  [
    'wD8T8KozGO',
    'מצא לו חברה איך הקליטה',
  ],
  [
    'jtUcAzTL4l',
    'В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!',
  ],
  [
    'rnXePhv0JG',
    'จงฝ่าฟันพัฒนาวิชาการ',
  ],
];

testData.forEach((args) => {
  test.cb('password generation', testOutput, ...args);
});
