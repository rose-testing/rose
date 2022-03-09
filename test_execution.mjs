import { suite, findSuite } from './rose.mjs';
import { check_was_run, set_was_run } from './run_flag.mjs';

suite('Running some tests', test => {
  test('Running the suite gives us one passing test', t => {
    set_was_run(false);

    t.eq(check_was_run(), false);

    import('./was_run.mjs').then(() => {
      t.eq(check_was_run(), false);

      let suite = findSuite('a canary suite');

      suite.run();

      t.eq(check_was_run(), true);
      t.eq(suite.passingTests, 1);
    });
  });

  test('Running a failing test reports one failure', t => {
    import('./failing.mjs').then(() => {
      let suite = findSuite('a failing suite');

      suite.run();

      t.eq(suite.failingTests, 1);
    });
  });
});

let mainSuite = findSuite('Running some tests');

mainSuite.run();

console.log(`Passing: ${mainSuite.passingTests}`);
console.log(`Failing: ${mainSuite.failingTests}`);
