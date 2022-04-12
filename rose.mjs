const suites = {};

class EqualsAssertionFailure extends Error {
  constructor(test, left, right) {
    super('Assertion Failure');

    this.test = test;
    this.left = left;
    this.right = right;
  }

  get hint() {
    return `Expected ${JSON.stringify(this.left)} to equal ${JSON.stringify(this.right)}`;
  }
}

class GreaterThanAssertionFailure extends Error {
  constructor(test, left, right) {
    super('Assertion Failure');

    this.test = test;
    this.left = left;
    this.right = right;
  }

  get hint() {
    return `Expected ${JSON.stringify(this.left)} to be greater than ${JSON.stringify(this.right)}`;
  }
}

async function runTest(thisSuite, example) {
  try {
    await example.body({
      eq(left, right) {
        if (left !== right) {
          throw new EqualsAssertionFailure(example, left, right);
        }
      },

      gt(left, right) {
        if (left <= right) {
          throw new GreaterThanAssertionFailure(example, left, right);
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

export function listSuites() {
  return Object.keys(suites);
}

export function findSuite(name) {
  return suites[name];
}
