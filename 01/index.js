import {
  evaluateFuelBasedOnMass,
  evaluateFuelUntilNegativeValue,
  readFile
} from '_utils';

const solve = massList => {
  const totalFuelFirstPart = evaluateFuelBasedOnMass(massList);
  console.log('> result 1:', totalFuelFirstPart);

  const totalFuelSecondPart = evaluateFuelUntilNegativeValue(massList);
  console.log('> result 2:', totalFuelSecondPart);
};

export default () => {
  console.log('Day 1: The Tyranny of the Rocket Equation');

  return readFile('01/input.in')
    .then(data => {
      const massList = data.split('\n').filter(mass => mass.length > 0);

      solve(massList);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
