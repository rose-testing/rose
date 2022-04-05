import { suite, findSuite } from '../../rose.mjs';

suite('Equality Assertions', test => {
  test('seven equals seven', t => {
    t.eq(7, 7);
  });

  test('false equals false', t => {
    t.eq(false, false);
  });

  // We expect this test to fail
  test('red equals blue', t => {
    t.eq('red', 'blue');
  });
});
