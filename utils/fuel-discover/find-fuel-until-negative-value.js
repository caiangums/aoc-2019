import { findFuel } from '_utils';

const findFuelUntilNegativeValue = mass => {
  let fuel = findFuel(mass);
  let actualFoundFuel = fuel;

  while (true) {
    actualFoundFuel = findFuel(actualFoundFuel);

    if (actualFoundFuel <= 0) {
      break;
    }

    fuel = fuel + actualFoundFuel;
  }

  return fuel;
};

export default findFuelUntilNegativeValue;
