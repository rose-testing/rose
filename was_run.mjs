import { test, runSuite } from './rose.mjs';

let was_run = false;

console.log(was_run);

test('running a test', () => {
  was_run = true;
});

console.log(was_run);

runSuite();

console.log(was_run);
