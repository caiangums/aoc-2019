import validatePassword from '_src/04/validate-password';

describe('Day 04 - validatePassword', () => {
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
