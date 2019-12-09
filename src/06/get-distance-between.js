const generatePlanetOrbitList = ({ acc, planetOrbitList, planet }) =>
  planetOrbitList[planet] !== undefined
    ? [...acc, ...planetOrbitList[planet]]
    : acc;

const getDistanceBetween = ({
  start,
  stop,
  planetOrbits,
  planetOrbitsReverse
}) => {
  let counter = 0;

  let generalPlanetList = Array.isArray(planetOrbits[start])
    ? [...planetOrbits[start]]
    : [];

  const size = Object.keys(planetOrbits).length;
  let i,
    found = false;
  for (i = 0; i < size && !found; i += 1) {
    const planetOrbitList = generalPlanetList.reduce(
      (acc, planet) =>
        generatePlanetOrbitList({ acc, planetOrbitList: planetOrbits, planet }),
      []
    );

    const reversedPlanetOrbitList = generalPlanetList.reduce(
      (acc, planet) =>
        generatePlanetOrbitList({
          acc,
          planetOrbitList: planetOrbitsReverse,
          planet
        }),
      []
    );

    generalPlanetList = [
      ...new Set([
        ...generalPlanetList,
        ...planetOrbitList,
        ...reversedPlanetOrbitList
      ])
    ];

    if (generalPlanetList.includes(stop)) {
      return counter;
    } else {
      counter++;
    }
  }

  // not found!
  return -1;
};

export default getDistanceBetween;
