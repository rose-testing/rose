import { suite, findSuite } from '../rose.mjs';

suite('Rose Assertions', test => {
  test('equality', async t => {
    await import('./fixtures/assertion_eq.mjs');

    let suite = findSuite('Equality Assertions');

    await suite.run();

    t.eq(suite.passingTests, 2);
    t.eq(suite.failingTests, 1);

    t.eq(suite.failures[0].hint, 'Expected "red" to equal "blue"');
  });

  test('greater than', async t => {
    await import('./fixtures/assertion_gt.mjs');

    let suite = findSuite('Greater Than Assertions');

    await suite.run();

    t.eq(suite.passingTests, 2);
    t.eq(suite.failingTests, 1);

    t.eq(suite.failures[0].hint, 'Expected 3 to be greater than 9');
  });
});
