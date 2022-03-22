import { suite } from './../../rose.mjs';
import { set_was_run } from './run_flag.mjs';

suite('a canary suite', test => {
  test('running a test', t => {
    set_was_run(true);
    t.eq(true, true);
  });
});
