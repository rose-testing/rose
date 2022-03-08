import { suite, runSuite } from './rose.mjs';

suite('Running some tests', test => {
  test('Running the suite gives us one passing test', t => {
    let was_run = false;

    console.log(was_run);

    import('./was_run.mjs').then(() => {
      console.log(was_run);

      runSuite('a canary suite');
      // Next time
      // const s = findSuite('a canary suite');
      // console.log(s.context.was_run);
      // s.run()

      console.log(was_run);
    });
  });
});

runSuite('Running some tests');
