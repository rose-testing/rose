import { findSuite, listSuites } from './rose.mjs';
import { promises as fs } from 'fs';

await fs.readdir('./test')
  .then(files => {
    return Promise.all(
      files.map(file => {
        if (file.endsWith('_test.mjs')) {
          return import(`./test/${file}`);
        }
      })
    );
  });

async function runner(suiteName) {
  let mainSuite = findSuite(suiteName);

  await mainSuite.run();

  return mainSuite;
}

const allSuites =
  await Promise.all(
    listSuites().map(async suiteName => {
      return await runner(suiteName);
    })
  );

let totalPassing = 0;
let totalFailing = 0;

for (const suite of allSuites) {
  for (const failure of suite.failures) {
    console.log(`Failure: ${failure.test.description}`);
    console.log(`\t${failure.hint}`);
  }

  totalPassing += suite.passingTests;
  totalFailing += suite.failingTests;
}

console.log(`Passing: ${totalPassing}`);
console.log(`Failing: ${totalFailing}`);
