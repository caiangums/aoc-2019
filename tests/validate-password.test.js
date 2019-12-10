import validatePassword from '_src/04/validate-password';

describe('Day 04 - validatePassword part 1', () => {
  test('6 digit length should pass', () => {
    expect(validatePassword(111111)).toBeTruthy();
  });

  test('non 6 digit length should not pass', () => {
    expect(validatePassword(1111111)).toBeFalsy();
  });

  test('111111 should pass', () => {
    expect(validatePassword(111111)).toBeTruthy();
  });

  test('223450 should not pass', () => {
    expect(validatePassword(223450)).toBeFalsy();
  });

  test('123789 shuold not pass', () => {
    expect(validatePassword(123789)).toBeFalsy();
  });
});

describe('Day 04 - validatePassword part 2', () => {
  test('112233 should pass, due to just 2 groups of matching values', () => {
    const validateRepeatedCounter = true;
    expect(validatePassword(112233, validateRepeatedCounter)).toBeTruthy();
  });

  test('123444 should not pass, due `444` has `44` and it`s part of a larger group', () => {
    const validateRepeatedCounter = true;
    expect(validatePassword(123444, validateRepeatedCounter)).toBeFalsy();
  });

  test('111122 should pass, due `22` is the higher double digit and `1111` does`t matter in this case', () => {
    const validateRepeatedCounter = true;
    expect(validatePassword(111122, validateRepeatedCounter)).toBeTruthy();
  });
});
