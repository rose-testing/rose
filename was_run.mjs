import { suite, runSuite } from './rose.mjs';

suite('a canary suite', test => {
  before(context => {
    context.was_run = false;
  });

  test('running a test', context => {
    context.was_run = true;
  });
});
