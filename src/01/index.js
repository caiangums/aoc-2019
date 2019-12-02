import { convertStringToNumberList, readFile } from '_utils';

import evaluateFuelBasedOnMass from './evaluate-fuel-based-on-mass';
import evaluateFuelUntilNegativeValue from './evaluate-fuel-until-negative-value';

const solve = massList => {
  const totalFuelFirstPart = evaluateFuelBasedOnMass(massList);
  console.log('> result 1:', totalFuelFirstPart);

  const totalFuelSecondPart = evaluateFuelUntilNegativeValue(massList);
  console.log('> result 2:', totalFuelSecondPart);
};

export default () => {
  console.log('--- Day 1: The Tyranny of the Rocket Equation ---');

  return readFile('01/input.in')
    .then(data => {
      const massList = convertStringToNumberList({
        string: data,
        separator: '\n'
      });

      solve(massList);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
