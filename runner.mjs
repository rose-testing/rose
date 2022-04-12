import { findSuite, listSuites } from './rose.mjs';
import { promises as fs } from 'fs';
import { red, green, reset } from './colors.mjs';

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

  await mainSuite.run(process.stdout);

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

console.log('\n');

for (const suite of allSuites) {
  for (const failure of suite.failures) {
    console.log(`Failure: ${failure.test.description}`);
    if (failure.hint) {
      console.log(`\t${failure.hint}`);
    } else {
      console.log(failure);
    }

    console.log('');
  }

  totalPassing += suite.passingTests;
  totalFailing += suite.failingTests;
}

const failingColor = totalFailing > 0 ? red : green;

console.log(`${green}Passing: ${totalPassing}${reset}`);
console.log(`${failingColor}Failing: ${totalFailing}${reset}`);
