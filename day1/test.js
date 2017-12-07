const { sum } = require('./sum');

test('it should solve part 1 test cases', () => {
  expect(sum('1122')).toBe(3);
  expect(sum('1111')).toBe(4);
  expect(sum('1234')).toBe(0);
  expect(sum('91212129')).toBe(9);
});


test('it should solve part 2 test cases', () => {
  expect(sum('1212', true)).toBe(6);
  expect(sum('1221', true)).toBe(0);
  expect(sum('123425', true)).toBe(4);
  expect(sum('123123', true)).toBe(12);
  expect(sum('12131415', true)).toBe(4);
});
