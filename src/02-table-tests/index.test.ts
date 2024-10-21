// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  // continue cases for other actions    
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)('', ({a, b, action, expected}) => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: 'some' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2', b: '2', action: Action.Subtract })).toBe(null);
  });
});
