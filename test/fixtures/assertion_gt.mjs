import { suite, findSuite } from '../../rose.mjs';

suite('Greater Than Assertions', test => {
  test('twelve greater than seven', t => {
    t.gt(12, 7);
  });

  test('raspberry greater than apple', t => {
    t.gt('raspberry', 'apple');
  });

  // We expect this test to fail
  test('3 greater than 9', t => {
    t.gt(3, 9);
  });
});
