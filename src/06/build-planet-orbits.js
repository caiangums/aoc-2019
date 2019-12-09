import { isValidString } from '_utils';

const buildPlanetOrbits = (orbitList, reversed = false) =>
  orbitList.reduce((acc, orbitTuple) => {
    let [planetA, planetB] = orbitTuple.split(')');

    if (reversed) {
      [planetA, planetB] = [planetB, planetA];
    }

    if (!isValidString(planetB)) {
      return acc;
    }

    if (acc[planetB] !== undefined) {
      return {
        ...acc,
        [planetB]: [...acc[planetB], planetA]
      };
    }

    return {
      ...acc,
      [planetB]: [planetA]
    };
  }, {});

export default buildPlanetOrbits;
