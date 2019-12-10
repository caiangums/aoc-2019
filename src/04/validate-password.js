const isNumber = value => typeof value === 'number';

const checkDigitCounter = ({ digitCounter, number }) => {
  if (Object.keys(digitCounter).find(digit => digit === number.toString())) {
    return {
      ...digitCounter,
      [number]: digitCounter[number] + 1
    };
  }

  return {
    ...digitCounter,
    [number]: 2
  };
};

const validatePassword = (password, validateRepeatedCounter = false) => {
  if (!isNumber(password) || password.toString().length !== 6) {
    return false;
  }

  let [previous, ...passwordNumList] = Array.from(
    password.toString()
  ).map(num => parseInt(num));

  let hasDoubleDigit = false;
  let isIncrease = true;
  let digitCounter = {};

  passwordNumList.forEach(number => {
    if (previous > number) {
      isIncrease = false;
    }

    if (previous === number) {
      hasDoubleDigit = true;

      digitCounter = checkDigitCounter({
        digitCounter,
        number
      });
    }

    previous = number;
  });

  const repeatedTwoDigit = Object.keys(digitCounter).some(
    digit => digitCounter[digit] === 2
  );

  if (validateRepeatedCounter) {
    return hasDoubleDigit && isIncrease && repeatedTwoDigit;
  }

  return hasDoubleDigit && isIncrease;
};

export default validatePassword;
