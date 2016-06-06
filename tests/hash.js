import generate from '../src/lib/generate';
import test from 'ava';

function hashFake() {
  return 'testhash0A__!@#$%^&*()-+';
}

test.cb('provide our own hash function', (t) => {
  t.plan(1);
  generate('test', 'test', { method: hashFake }, (password) => {
    t.is('testhash0A', password);
    t.end();
  });
});
