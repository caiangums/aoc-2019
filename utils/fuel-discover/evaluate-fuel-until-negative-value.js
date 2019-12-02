import isValidMassValue from './is-valid-mass-value';
import findFuelUntilNegativeValue from './find-fuel-until-negative-value';

const evaluateFuelUntilNegativeFuel = massList =>
  massList.reduce((acc, mass) => {
    const massValue = parseInt(mass);

    if (isValidMassValue(massValue)) {
      return acc + findFuelUntilNegativeValue(massValue);
    }

    return acc;
  }, 0);

export default evaluateFuelUntilNegativeFuel;
