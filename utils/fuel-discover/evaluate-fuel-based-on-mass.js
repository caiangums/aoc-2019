import { isValidMassValue, findFuel } from '_utils';

const evaluateFuelBasedOnMass = massList =>
  massList.reduce((acc, mass) => {
    const massValue = parseInt(mass);

    if (isValidMassValue(massValue)) {
      return acc + findFuel(massValue);
    }

    return acc;
  }, 0);

export default evaluateFuelBasedOnMass;
