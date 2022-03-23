import { suite, findSuite } from '../rose.mjs';
import { check_was_run, set_was_run } from './fixtures/run_flag.mjs';

suite('Running some tests', test => {
  test('Running the suite gives us one passing test', async t => {
    set_was_run(false);

    t.eq(check_was_run(), false);

    await import('./fixtures/was_run.mjs');

    t.eq(check_was_run(), false);

    let suite = findSuite('a canary suite');

    await suite.run();

    t.eq(check_was_run(), true);
    t.eq(suite.passingTests, 1);
  });

  test('Running a failing test reports one failure', async t => {
    await import('./fixtures/failing.mjs');

    let suite = findSuite('a failing suite');

    await suite.run();

    t.eq(suite.failingTests, 1);
    t.eq(suite.failures.length, 1);
    t.eq(suite.failures[0].left, true);
    t.eq(suite.failures[0].right, false);
  });

  test('Stops a test early given a failing assertion', async t => {
    set_was_run(false);

    await import('./fixtures/stop_early.mjs');

    let suite = findSuite('a suite that stops early');

    await suite.run();

    t.eq(suite.failingTests, 1);

    t.eq(check_was_run(), false);
  });
});

async function runner() {
  let mainSuite = findSuite('Running some tests');

  await mainSuite.run();

  for (const failure of mainSuite.failures) {
    console.log(`Failure: ${failure.test.description}`);
    console.log(`\tExpected ${failure.left} to equal ${failure.right}\n`);
  }

  console.log(`Passing: ${mainSuite.passingTests}`);
  console.log(`Failing: ${mainSuite.failingTests}`);
}

runner();
