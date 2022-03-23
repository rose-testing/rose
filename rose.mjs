const suites = {};

class EqualsAssertionFailure extends Error {
  constructor(test, left, right) {
    super('Assertion Failure');
    
    this.test = test;
    this.left = left;
    this.right = right;
  }
}

async function runTest(thisSuite, example) {
  try {
    await example.body({
      eq(left, right) {
        if (left !== right) {
          throw new EqualsAssertionFailure(example, left, right);
        }
      }
    });

    thisSuite.passingTests += 1;
  } catch (error) {
    thisSuite.failures.push(error);
    thisSuite.failingTests += 1;
  }
}

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
    failures: [],
    async run() {
      for (const example of tests) {
        await runTest(thisSuite, example);
      }
    }
  };

  suites[name] = thisSuite;
}

export function findSuite(name) {
  return suites[name];
}
