import { red, green, reset } from './colors.mjs';

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

async function runTest(thisSuite, example, output) {
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
    output.write(`${green}.${reset}`);
  } catch (error) {
    // In case the error is generic
    error.test = example;

    thisSuite.failures.push(error);
    thisSuite.failingTests += 1;
    output.write(`${red}F${reset}`);
  }
}

const mockOutput = {
  write(_content) {
    return;
  }
};

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
    async run(output = mockOutput) {
      for (const example of tests) {
        await runTest(thisSuite, example, output);
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
