import { isValidString, readFile } from '_utils';

import buildPlanetOrbits from './build-planet-orbits';
import countOrbits from './count-orbits';
import getDistanceBetween from './get-distance-between';

const solve = orbitList => {
  const planetOrbits = buildPlanetOrbits(orbitList);

  const orbits = countOrbits(planetOrbits);

  console.log('> result 1:', orbits);

  const reversed = true;
  const planetOrbitsReverse = buildPlanetOrbits(orbitList, reversed);

  const youPlanet = 'YOU';
  const sanPlanet = 'SAN';

  const orbitDistance = getDistanceBetween({
    start: youPlanet,
    stop: sanPlanet,
    planetOrbits,
    planetOrbitsReverse
  });

  console.log('> result 2:', orbitDistance);
};

export default () => {
  console.log('--- Day 6: Universal Orbit Map ---');

  return readFile('06/input.in')
    .then(data => {
      const orbitList = data.split('\n');

      solve(orbitList);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
