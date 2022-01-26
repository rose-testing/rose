const tests = [];

export function test(description, body) {
  tests.push({ description, body });
}

export function runSuite() {
  tests
    .forEach(example => {
      example.body();
    });
}
