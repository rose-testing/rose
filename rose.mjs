const suites = {};

export function suite(name, suiteBody) {
  const tests = [];

  function test(description, body) {
    tests.push({ description, body });
  }

  suiteBody(test);

  const thisSuite = {
    tests,
    failingTests: 0,
    passingTests: 0,
    run() {
      tests
        .forEach(example => {
          example.body({
            eq(left, right) {
              if (left === right) {
                thisSuite.passingTests += 1;
              } else {
                console.log(`Failing test: ${example.description}`);
                console.log(`Expected ${left} to equal ${right}\n`);
                thisSuite.failingTests += 1;
              }
            }
          });
        });
    }
  };

  suites[name] = thisSuite;
}

export function findSuite(name) {
  return suites[name];
}

export function runSuite(name) {
  const tests = suites[name];

}
