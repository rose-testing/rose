import { suite } from '../../rose.mjs';
import { set_was_run } from './run_flag.mjs';

suite('a suite that stops early', test => {
  test('A failing test', t => {
    t.eq(true, false);

    set_was_run(true);
  });
});
