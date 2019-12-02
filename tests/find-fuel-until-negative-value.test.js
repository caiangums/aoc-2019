import { findFuelUntilNegativeValue } from '_utils';

describe('Day 01 - findFuelUntilNegative', () => {
  test('for mass 12, get 2', () => {
    expect(findFuelUntilNegativeValue(12)).toEqual(2);
  });

  test('for mass 14, get 2', () => {
    expect(findFuelUntilNegativeValue(14)).toEqual(2);
  });

  test('for mass 1969, get 654', () => {
    expect(findFuelUntilNegativeValue(1969)).toEqual(966);
  });

  test('for mass 100756, get 33583', () => {
    expect(findFuelUntilNegativeValue(100756)).toEqual(50346);
  });
});
