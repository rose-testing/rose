import { suite } from './../../rose.mjs';

suite('a failing suite', test => {
  test('a failing test', t => {
    t.eq(true, false);
  });
});
