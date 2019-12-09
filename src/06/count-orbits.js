import { isValidString } from '_utils';

const countSinglePlanetOrbit = ({ planetOrbits, planet }) => {
  if (!isValidString(planet) || planetOrbits[planet] === undefined) {
    return 0;
  }

  return planetOrbits[planet].reduce(
    (acc, childPlanet) =>
      acc + countSinglePlanetOrbit({ planetOrbits, planet: childPlanet }),
    1
  );
};

const countOrbits = planetOrbits => {
  const planets = Object.keys(planetOrbits);

  return planets.reduce(
    (acc, planet) => acc + countSinglePlanetOrbit({ planetOrbits, planet }),
    0
  );
};

export default countOrbits;
