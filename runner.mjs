import { findSuite } from './rose.mjs';

import './test/test_execution.mjs';
import './test/assertions_test.mjs';

async function runner(suiteName) {
  let mainSuite = findSuite(suiteName);

  await mainSuite.run();

  for (const failure of mainSuite.failures) {
    console.log(`Failure: ${failure.test.description}`);
    console.log(`\t${failure.hint}`);
  }

  console.log(`Passing: ${mainSuite.passingTests}`);
  console.log(`Failing: ${mainSuite.failingTests}`);
}

await runner('Running some tests');
await runner('Rose Assertions');
