import test from 'ava';
import generate from '../src/lib/generate';

function testFailure(t, masterPassword, url, options, callback) {
  t.throws(() => {
    generate(masterPassword, url, options, callback);
  });
}

const testData = [
  [
    'test',          // master password
    'example.com',   // url
    {
      method: 'foo', // options (default = {})
    },
                     // callback (default = function() {})
  ],
  [
    'test',
    'example.com',
    {
      length: -1,
    },
  ],
  [
    'test',
    'example.com',
    {
      length: 0,
    },
  ],
  [
    'test',
    'example.com',
    {
      length: '12',
    },
  ],
  [
    'test',
    'example.com',
    {
      length: 3,
    },
  ],
  [
    'test',
    'example.com',
    {
      length: 28,
    },
  ],
  [
    'test',
    'example.com', {
      secret: false,
    },
  ],
  [
    'test',
    'example.com', {
      secret: [],
    },
  ],
  [
    'test',
    '',
  ],
  [
    'test',
    '/foo/',
  ],
  [
    'test',
    false,
  ],
  [
    '',
    'example.com', {
      secret: '',
    },
  ],
  [
    false,
    'example.com',
  ],
  [
    null,
    'example.com',
  ],
  [
    undefined,
    'example.com',
  ],
  [
    'test',
    'example.com',
    {},
    {},
  ],
];

testData.forEach((args) => {
  test('validation', testFailure, ...args);
});
