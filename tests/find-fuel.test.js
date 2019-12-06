import findFuel from '_src/01/find-fuel';

describe('Day 01 - findFuel', () => {
  test('for mass 12, get 2', () => {
    expect(findFuel(12)).toEqual(2);
  });

  test('for mass 14, get 2', () => {
    expect(findFuel(14)).toEqual(2);
  });

  test('for mass 1969, get 654', () => {
    expect(findFuel(1969)).toEqual(654);
  });

  test('for mass 100756, get 33583', () => {
    expect(findFuel(100756)).toEqual(33583);
  });
});
