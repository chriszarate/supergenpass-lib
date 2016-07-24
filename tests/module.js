import * as sgp from '../src';
import test from 'ava';

test('module exports', (t) => {
  t.is(typeof sgp.generate, 'function');
  t.is(typeof sgp.hostname, 'function');
});
