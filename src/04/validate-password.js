const isNumber = value => typeof value === 'number';

const validatePassword = password => {
  if (!isNumber(password) || password.toString().length !== 6) {
    return false;
  }

  let [previous, ...passwordNumList] = Array.from(
    password.toString()
  ).map(num => parseInt(num));

  let hasDoubleDigit = false;
  let isIncrease = true;

  passwordNumList.forEach(number => {
    if (previous > number) {
      isIncrease = false;
    }

    if (previous === number) {
      hasDoubleDigit = true;
    }

    previous = number;
  });

  return hasDoubleDigit && isIncrease;
};

export default validatePassword;
