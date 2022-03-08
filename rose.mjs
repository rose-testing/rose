const suites = {};

export function suite(name, body) {
  const tests = [];

  function test(description, body) {
    tests.push({ description, body });
  }

  body(test);

  suites[name] = tests;
}

export function runSuite(name) {
  const tests = suites[name];

  tests
    .forEach(example => {
      example.body();
    });
}
