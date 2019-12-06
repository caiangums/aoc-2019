import { convertStringToNumberList, readFile } from '_utils';

const DIRECTIONS = {
  LEFT: 'L',
  RIGHT: 'R',
  UP: 'U',
  DOWN: 'D'
};

const splitDirectionStringAt = (value, index) => ({
  direction: value.substring(0, index),
  units: parseInt(value.substring(index))
});

const constructPoint = ({ direction, units, previous }) => {
  let [x, y] = previous;

  if ([DIRECTIONS.LEFT, DIRECTIONS.RIGHT].includes(direction)) {
    return [DIRECTIONS.RIGHT === direction ? x + units : x - units, y];
  }
  return [x, DIRECTIONS.UP === direction ? y + units : y - units];
};

const constructWirePoints = wirePathInstructions => {
  const start = [0, 0]; // (x, y) point
  let previous = start;

  return wirePathInstructions.reduce((acc, instruction) => {
    const { direction, units } = splitDirectionStringAt(instruction, 1);

    const actualPoint = constructPoint({ direction, units, previous });

    previous = actualPoint;

    return [...acc, actualPoint];
  }, []);
};

const LINES_ORIENTATION = {
  COLLINEAR: 0,
  CLOCKWISE: 1,
  ANTI_CLOCKWISE: 2
};

const discoverLinesOrientation = (point1, point2, point3) => {
  const [xPoint1, yPoint1] = point1;
  const [xPoint2, yPoint2] = point2;
  const [xPoint3, yPoint3] = point3;

  // (b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y)
  const compareValue =
    (yPoint2 - yPoint1) * (xPoint3 - xPoint2) -
    (xPoint2 - xPoint1) * (yPoint3 - yPoint2);

  if (compareValue === 0) {
    return LINES_ORIENTATION.COLLINEAR;
  }
  if (compareValue < 0) {
    return LINES_ORIENTATION.ANTI_CLOCKWISE;
  }
  return LINES_ORIENTATION.CLOCKWISE;
};

const isPointPresentInLine = (point, line) => {
  const [pointX, pointY] = point;

  const [linePointA, linePointB] = line;
  const [linePointAX, linePointAY] = linePointA;
  const [linePointBX, linePointBY] = linePointA;

  if (
    pointX <= Math.max(linePointAX, linePointBX) &&
    pointX <= Math.min(linePointAX, linePointBX) &&
    pointY <= Math.max(linePointAY, linePointBY) &&
    pointY <= Math.min(linePointAY, linePointBY)
  ) {
    return true;
  }
  return false;
};

const hasIntersection = (lineA, lineB) => {
  const [pointA1, pointA2] = lineA;
  const [pointB1, pointB2] = lineB;

  const lineOrientation1 = discoverLinesOrientation(pointA1, pointA2, pointB1);
  const lineOrientation2 = discoverLinesOrientation(pointA1, pointA2, pointB2);
  const lineOrientation3 = discoverLinesOrientation(pointB1, pointB2, pointA1);
  const lineOrientation4 = discoverLinesOrientation(pointB1, pointB2, pointA1);
  // console.log(
  //   'line orientation',
  //   lineOrientation1,
  //   lineOrientation2,
  //   lineOrientation3,
  //   lineOrientation4
  // );

  // console.log(
  //   lineOrientation1 !== lineOrientation2,
  //     lineOrientation3 !== lineOrientation4
  // );

  if (
    lineOrientation1 !== lineOrientation2 &&
    lineOrientation3 !== lineOrientation4
  ) {
    return true;
  }

  if (
    lineOrientation1 === LINES_ORIENTATION.COLLINEAR &&
    isPointPresentInLine(pointB1, lineA)
  ) {
    return true;
  }

  if (
    lineOrientation2 === LINES_ORIENTATION.COLLINEAR &&
    isPointPresentInLine(pointB2, lineA)
  ) {
    return true;
  }

  if (
    lineOrientation3 === LINES_ORIENTATION.COLLINEAR &&
    isPointPresentInLine(pointA1, lineB)
  ) {
    return true;
  }

  if (
    lineOrientation4 === LINES_ORIENTATION.COLLINEAR &&
    isPointPresentInLine(pointA2, lineB)
  ) {
    return true;
  }

  return false;
};

const findIntersections = (firstWirePoints, secondWirePoints) => {
  let i, j, lineA, lineB;

  for (i = 0; i < firstWirePoints.length - 1; i += 1) {
    lineA = [firstWirePoints[i], firstWirePoints[i + 1]];

    for (j = 0; j < secondWirePoints.length - 1; j += 1) {
      lineB = [secondWirePoints[j], secondWirePoints[j + 1]];

      // console.log('intersect!', lineA, lineB);
      if (hasIntersection(lineA, lineB)) {
        console.log('intersect!', lineA, lineB);
      }
    }
  }
};

const solve = () => {
  console.log('solve');
};

export default () => {
  console.log('--- Day 3: Crossed Wires ---');

  return readFile('03/test.in')
    .then(data => {
      const wiresList = data.split('\n');
      const firstWirePathInstructions = wiresList[0].split(',');
      const secondWirePathInstructions = wiresList[1].split(',');

      const firstWirePoints = constructWirePoints(firstWirePathInstructions);
      const secondWirePoints = constructWirePoints(secondWirePathInstructions);

      console.log(firstWirePoints);
      console.log(secondWirePoints);

      const intersections = findIntersections(
        firstWirePoints,
        secondWirePoints
      );

      // console.log(firstWirePoints);
      // console.log(secondWirePoints);

      //const intersections = findIntersections(firstWirePath, secondWirePath);

      //const nearOriginPoint = findNearOriginPoint(intersections);

      // const distance = manhattanDistanceFromOrigin(nearOriginPoint);

      // convertStringToNumberList({
      //   string: data,
      //   separator: ','
      // });

      solve();
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
